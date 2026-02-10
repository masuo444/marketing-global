"use client";

import { useState } from "react";
import { IconCopy, IconCheck, IconRefresh, IconAlertTriangle } from "./icons";
import { useToastContext } from "./Toast";

interface StreamingResultProps {
  text: string;
  isStreaming: boolean;
  error: string | null;
  onRegenerate?: () => void;
}

export default function StreamingResult({
  text,
  isStreaming,
  error,
  onRegenerate,
}: StreamingResultProps) {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToastContext();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      addToast("コンテンツをクリップボードにコピーしました", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      addToast("コンテンツをコピーしました", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (error) {
    return (
      <div className="animate-fade-in bg-red/10 border border-red/30 rounded-xl p-6 text-center">
        <div className="mb-3 flex justify-center">
          <IconAlertTriangle size={32} className="text-red" />
        </div>
        <p className="text-red font-medium mb-2">エラーが発生しました</p>
        <p className="text-text-sub text-sm mb-4">{error}</p>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 bg-red text-white rounded-lg text-sm hover:bg-red-hover transition-colors inline-flex items-center gap-1.5"
          >
            <IconRefresh size={14} />
            再試行
          </button>
        )}
      </div>
    );
  }

  if (!text && !isStreaming) return null;

  return (
    <div className="animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isStreaming && (
            <div className="flex items-center gap-2 text-gold text-sm">
              <span className="animate-pulse-dot">●</span>
              <span>生成中...</span>
            </div>
          )}
          {!isStreaming && text && (
            <span className="flex items-center gap-1.5 text-success text-xs">
              <IconCheck size={14} />
              生成完了
            </span>
          )}
        </div>

        {text && (
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-text-sub hover:text-text hover:border-border-active transition-colors"
            >
              {copied ? (
                <>
                  <IconCheck size={14} className="text-success" />
                  <span className="text-success">コピーしました</span>
                </>
              ) : (
                <>
                  <IconCopy size={14} />
                  <span>コピー</span>
                </>
              )}
            </button>
            {!isStreaming && onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-text-sub hover:text-text hover:border-border-active transition-colors"
              >
                <IconRefresh size={14} />
                <span>再生成</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`bg-card-bg border border-border rounded-xl p-6 prose prose-invert max-w-none ${
          isStreaming ? "streaming-cursor" : ""
        }`}
      >
        <div className="text-text text-sm leading-relaxed whitespace-pre-wrap">
          {text.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-gold text-lg font-bold mt-6 mb-3 first:mt-0"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-text font-bold mt-4 mb-2">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("# ")) {
              return (
                <h1
                  key={i}
                  className="text-gold text-xl font-bold mt-6 mb-3 first:mt-0"
                >
                  {line.replace("# ", "")}
                </h1>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <li key={i} className="ml-4 text-text-sub list-disc">
                  {line.replace(/^[-*] /, "")}
                </li>
              );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <p key={i} className="font-bold text-text my-1">
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (line.trim() === "") {
              return <div key={i} className="h-2" />;
            }
            if (line.startsWith("---")) {
              return (
                <hr key={i} className="border-border my-4" />
              );
            }
            return (
              <p key={i} className="my-1">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
