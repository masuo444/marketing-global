"use client";

import { useState, useCallback, useRef } from "react";

interface UseStreamingOptions {
  onComplete?: (fullText: string) => void;
  onError?: (error: string) => void;
}

interface UseStreamingReturn {
  text: string;
  isStreaming: boolean;
  error: string | null;
  startStreaming: (url: string, body: Record<string, unknown>) => Promise<void>;
  reset: () => void;
}

export function useStreaming(
  options?: UseStreamingOptions
): UseStreamingReturn {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setText("");
    setIsStreaming(false);
    setError(null);
  }, []);

  const startStreaming = useCallback(
    async (url: string, body: Record<string, unknown>) => {
      reset();
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `API エラー: ${response.status}`
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("ストリームを取得できませんでした");

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);

            if (data === "[DONE]") {
              setIsStreaming(false);
              options?.onComplete?.(fullText);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                fullText += parsed.text;
                setText(fullText);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }

        setIsStreaming(false);
        options?.onComplete?.(fullText);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const errorMessage =
          err instanceof Error
            ? err.message
            : "予期しないエラーが発生しました";
        setError(errorMessage);
        setIsStreaming(false);
        options?.onError?.(errorMessage);
      }
    },
    [options, reset]
  );

  return { text, isStreaming, error, startStreaming, reset };
}
