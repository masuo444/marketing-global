"use client";

import { HistoryEntry } from "@/types";
import { CATEGORY_LABEL_MAP, CONTENT_TYPE_LABEL_MAP, LANGUAGE_LABEL_MAP } from "@/lib/constants";
import { IconHistory, IconClose, IconGlobe, IconMessageCircle } from "./icons";

interface HistoryPanelProps {
  entries: HistoryEntry[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "たった今";
  if (diffMins < 60) return `${diffMins}分前`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}時間前`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}日前`;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export default function HistoryPanel({
  entries,
  isOpen,
  onClose,
  onSelect,
  onClear,
}: HistoryPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border animate-slide-in overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconHistory size={18} className="text-gold" />
            <h2 className="font-bold text-text">生成履歴</h2>
            <span className="text-xs text-text-sub">({entries.length}件)</span>
          </div>
          <div className="flex items-center gap-2">
            {entries.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-text-sub hover:text-red transition-colors"
              >
                すべて削除
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-card-bg transition-colors text-text-sub hover:text-text"
            >
              <IconClose size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-text-sub text-sm">
              まだ履歴がありません
            </div>
          ) : (
            entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelect(entry)}
                className="w-full p-3 rounded-xl border border-border bg-card-bg hover:border-border-active hover:bg-card-bg-hover transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-text-sub">
                    {entry.type === "generate" ? (
                      <IconGlobe size={16} />
                    ) : (
                      <IconMessageCircle size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text truncate">
                        {entry.type === "generate"
                          ? `${CATEGORY_LABEL_MAP[entry.category] || entry.category} / ${CONTENT_TYPE_LABEL_MAP[entry.contentType || ""] || ""}`
                          : `問い合わせ: ${CATEGORY_LABEL_MAP[entry.category] || entry.category}`}
                      </span>
                      <span className="text-xs text-text-sub whitespace-nowrap">
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </div>
                    {entry.brandName && (
                      <div className="text-xs text-text-sub mt-0.5">{entry.brandName}</div>
                    )}
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      {entry.languages.slice(0, 4).map((langId) => (
                        <span
                          key={langId}
                          className="text-xs px-1.5 py-0.5 bg-border rounded text-text-sub"
                        >
                          {LANGUAGE_LABEL_MAP[langId] || langId}
                        </span>
                      ))}
                      {entry.languages.length > 4 && (
                        <span className="text-xs text-text-sub">
                          +{entry.languages.length - 4}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-sub mt-1.5 line-clamp-2">
                      {entry.resultPreview}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
