"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/constants";
import { IconCopy, IconCheck } from "./icons";
import { useToastContext } from "./Toast";

interface TabbedResultProps {
  text: string;
  languages: string[];
  isStreaming: boolean;
}

function parseLanguageSections(text: string, languages: string[]): Record<string, string> {
  const sections: Record<string, string> = {};
  const langMap = Object.fromEntries(LANGUAGES.map((l) => [l.id, l]));

  // Split by ## headings that contain language flags or names
  const lines = text.split("\n");
  let currentLangId = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)/);
    if (headingMatch) {
      // Save previous section
      if (currentLangId) {
        sections[currentLangId] = currentContent.join("\n").trim();
      }

      // Detect language from heading
      const heading = headingMatch[1];
      let foundLang = "";
      for (const lang of languages) {
        const langInfo = langMap[lang];
        if (!langInfo) continue;
        if (
          heading.includes(langInfo.flag) ||
          heading.toLowerCase().includes(langInfo.label.toLowerCase()) ||
          heading.toLowerCase().includes(lang.toLowerCase()) ||
          (lang === "en" && heading.toLowerCase().includes("english")) ||
          (lang === "zh-cn" && (heading.includes("簡体") || heading.includes("中文"))) ||
          (lang === "zh-tw" && (heading.includes("繁體") || heading.includes("繁体"))) ||
          (lang === "ko" && (heading.includes("한국어") || heading.toLowerCase().includes("korean"))) ||
          (lang === "fr" && (heading.toLowerCase().includes("français") || heading.toLowerCase().includes("french"))) ||
          (lang === "de" && (heading.toLowerCase().includes("deutsch") || heading.toLowerCase().includes("german"))) ||
          (lang === "es" && (heading.toLowerCase().includes("español") || heading.toLowerCase().includes("spanish"))) ||
          (lang === "th" && (heading.includes("ภาษาไทย") || heading.toLowerCase().includes("thai")))
        ) {
          foundLang = lang;
          break;
        }
      }

      currentLangId = foundLang;
      currentContent = [];
    } else if (currentLangId) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentLangId) {
    sections[currentLangId] = currentContent.join("\n").trim();
  }

  return sections;
}

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-text font-bold mt-4 mb-2">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h1 key={i} className="text-gold text-xl font-bold mt-6 mb-3 first:mt-0">
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
      return <hr key={i} className="border-border my-4" />;
    }
    return (
      <p key={i} className="my-1">
        {line}
      </p>
    );
  });
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function TabbedResult({ text, languages, isStreaming }: TabbedResultProps) {
  const [activeTab, setActiveTab] = useState(languages[0] || "en");
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const { addToast } = useToastContext();

  const sections = parseLanguageSections(text, languages);
  const langMap = Object.fromEntries(LANGUAGES.map((l) => [l.id, l]));

  const handleCopySection = async (langId: string) => {
    const content = sections[langId];
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopiedLang(langId);
      addToast(`${langMap[langId]?.label || langId}のコンテンツをコピーしました`, "success");
      setTimeout(() => setCopiedLang(null), 2000);
    } catch {
      addToast("コピーに失敗しました", "error");
    }
  };

  // If no sections parsed yet (still streaming initial content), show raw text
  const hasSections = Object.keys(sections).length > 0;

  if (!hasSections) {
    return (
      <div className="bg-card-bg border border-border rounded-xl p-6">
        <div className="text-text text-sm leading-relaxed whitespace-pre-wrap">
          {renderMarkdown(text)}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-0 overflow-x-auto pb-px">
        {languages.map((langId) => {
          const lang = langMap[langId];
          if (!lang) return null;
          const isActive = activeTab === langId;
          const hasContent = !!sections[langId];
          return (
            <button
              key={langId}
              onClick={() => setActiveTab(langId)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                isActive
                  ? "border-gold text-gold"
                  : hasContent
                    ? "border-transparent text-text-sub hover:text-text hover:border-border-active"
                    : "border-transparent text-text-sub/50 cursor-default"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-card-bg border border-border border-t-0 rounded-b-xl p-6">
        {sections[activeTab] ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-sub">
                {wordCount(sections[activeTab])} words
              </span>
              <button
                onClick={() => handleCopySection(activeTab)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-text-sub hover:text-text hover:border-border-active transition-colors"
              >
                {copiedLang === activeTab ? (
                  <>
                    <IconCheck size={14} className="text-success" />
                    <span className="text-success">コピーしました</span>
                  </>
                ) : (
                  <>
                    <IconCopy size={14} />
                    <span>この言語をコピー</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-text text-sm leading-relaxed whitespace-pre-wrap">
              {renderMarkdown(sections[activeTab])}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-text-sub text-sm">
            {isStreaming ? "生成中..." : "このセクションのコンテンツはまだありません"}
          </div>
        )}
      </div>
    </div>
  );
}
