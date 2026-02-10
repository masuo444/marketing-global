"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconGlobe, IconMessageCircle, IconHistory } from "./icons";
import HistoryPanel from "./HistoryPanel";
import { useHistory } from "@/hooks/useHistory";
import { HistoryEntry } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const [historyOpen, setHistoryOpen] = useState(false);
  const { entries, clearHistory } = useHistory();

  const handleHistorySelect = (entry: HistoryEntry) => {
    setHistoryOpen(false);
    // Navigate to appropriate page - user can view past result
    if (entry.type === "generate") {
      window.location.href = "/generate";
    } else {
      window.location.href = "/inquiry";
    }
  };

  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-red rounded-lg flex items-center justify-center text-white font-bold text-lg font-serif group-hover:bg-red-hover transition-colors">
              F
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-text">
                FOMs
              </h1>
              <p className="text-[10px] text-text-sub tracking-widest">
                つくる人を、世界につなぐ。
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <nav className="flex gap-1">
              <Link
                href="/generate"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === "/generate"
                    ? "bg-red text-white"
                    : "text-text-sub hover:text-text hover:bg-card-bg"
                }`}
              >
                <IconGlobe size={16} />
                <span className="hidden sm:inline">コンテンツ生成</span>
              </Link>
              <Link
                href="/inquiry"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === "/inquiry"
                    ? "bg-red text-white"
                    : "text-text-sub hover:text-text hover:bg-card-bg"
                }`}
              >
                <IconMessageCircle size={16} />
                <span className="hidden sm:inline">問い合わせ対応</span>
              </Link>
            </nav>

            <div className="w-px h-6 bg-border mx-1" />

            <button
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-sub hover:text-text hover:bg-card-bg transition-colors relative"
            >
              <IconHistory size={16} />
              <span className="hidden sm:inline">履歴</span>
              {entries.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold rounded-full text-[10px] text-background font-bold flex items-center justify-center">
                  {entries.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <HistoryPanel
        entries={entries}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelect={handleHistorySelect}
        onClear={clearHistory}
      />
    </>
  );
}
