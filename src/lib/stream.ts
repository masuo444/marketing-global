const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function createStreamingResponse(
  systemPrompt: string,
  userMessages: { role: "user" | "assistant"; content: string }[]
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...userMessages,
  ];

  // Use native fetch instead of OpenAI SDK for Vercel serverless compatibility
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 4096,
      stream: true,
      messages,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg =
      errorData?.error?.message || `OpenAI API error: ${response.status}`;
    throw new Error(msg);
  }

  const reader = response.body!.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      try {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);

            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ text: delta })}\n\n`
                  )
                );
              }
            } catch {
              // Skip invalid JSON chunks
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: errorMessage })}\n\n`
          )
        );
        controller.close();
      }
    },
  });
}
