"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import InquiryForm from "@/components/InquiryForm";
import InquiryTemplates from "@/components/InquiryTemplates";
import LanguageSelector from "@/components/LanguageSelector";
import ToneSelector from "@/components/ToneSelector";
import SkeletonLoader from "@/components/SkeletonLoader";
import TabbedResult from "@/components/TabbedResult";
import StreamingResult from "@/components/StreamingResult";
import { useStreaming } from "@/hooks/useStreaming";
import { useHistory } from "@/hooks/useHistory";
import { useToastContext } from "@/components/Toast";
import { IconMessageCircle, IconArrowRight, IconRefresh } from "@/components/icons";
import { ToneType, InquiryTemplate } from "@/types";

export default function InquiryPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
  const [tone, setTone] = useState<ToneType>("professional");
  const [isGenerated, setIsGenerated] = useState(false);

  const { addToast } = useToastContext();
  const { addEntry } = useHistory();

  const handleStreamComplete = useCallback(
    (fullText: string) => {
      addToast("回答テンプレートの生成が完了しました", "success");
      addEntry({
        type: "inquiry",
        category: selectedCategory || "custom",
        languages: targetLanguages,
        tone,
        resultPreview: fullText.slice(0, 120),
        fullResult: fullText,
      });
    },
    [selectedCategory, targetLanguages, tone, addToast, addEntry]
  );

  const { text, isStreaming, error, startStreaming, reset } = useStreaming({
    onComplete: handleStreamComplete,
  });

  const handleLanguageToggle = (id: string) => {
    setTargetLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const canGenerate =
    targetLanguages.length > 0 && (selectedCategory || customMessage.trim());

  const handleTemplateSelect = useCallback(
    async (template: InquiryTemplate) => {
      setSelectedCategory(template.category);
      setCustomMessage(template.customMessage);
      setTargetLanguages(template.targetLanguages);
      setTone(template.tone);
      setIsGenerated(true);
      reset();
      await startStreaming("/api/inquiry", {
        category: template.category,
        customMessage: template.customMessage,
        targetLanguages: template.targetLanguages,
        tone: template.tone,
      });
    },
    [startStreaming, reset]
  );

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;
    setIsGenerated(true);
    await startStreaming("/api/inquiry", {
      category: selectedCategory,
      customMessage,
      targetLanguages,
      tone,
    });
  }, [canGenerate, selectedCategory, customMessage, targetLanguages, tone, startStreaming]);

  const handleRegenerate = useCallback(async () => {
    reset();
    await startStreaming("/api/inquiry", {
      category: selectedCategory,
      customMessage,
      targetLanguages,
      tone,
    });
  }, [selectedCategory, customMessage, targetLanguages, tone, startStreaming, reset]);

  const handleReset = () => {
    setSelectedCategory("");
    setCustomMessage("");
    setTargetLanguages([]);
    setTone("professional");
    setIsGenerated(false);
    reset();
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-4 pb-12">
        <Breadcrumb items={[{ label: "問い合わせ対応" }]} />

        {!isGenerated ? (
          <div className="space-y-8">
            {/* Scenario Templates */}
            <InquiryTemplates onSelect={handleTemplateSelect} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-text-sub">
                  またはカスタム入力
                </span>
              </div>
            </div>

            <InquiryForm
              selectedCategory={selectedCategory}
              customMessage={customMessage}
              onCategorySelect={setSelectedCategory}
              onCustomMessageChange={setCustomMessage}
            />

            <div className="border-t border-border pt-6">
              <LanguageSelector
                selectedIds={targetLanguages}
                onToggle={handleLanguageToggle}
              />
            </div>

            <ToneSelector selected={tone} onChange={setTone} />

            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all ${
                  canGenerate
                    ? "bg-gold hover:bg-gold-hover shadow-lg shadow-gold/20"
                    : "bg-border text-text-sub cursor-not-allowed"
                }`}
              >
                <IconMessageCircle size={18} />
                回答テンプレートを生成
                <IconArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text">回答テンプレート</h2>
                <p className="text-text-sub text-sm mt-1">
                  {isStreaming
                    ? "AIが多言語の回答テンプレートを生成しています"
                    : "回答テンプレートが生成されました"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isStreaming && text && (
                  <button
                    onClick={handleRegenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-text-sub hover:text-text hover:border-border-active transition-colors"
                  >
                    <IconRefresh size={14} />
                    <span>再生成</span>
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-border rounded-lg text-text-sub text-sm hover:text-text hover:border-border-active transition-colors"
                >
                  新しい問い合わせ
                </button>
              </div>
            </div>

            {/* Show skeleton before content starts streaming */}
            {!text && isStreaming && <SkeletonLoader />}

            {/* Show tabbed result if multiple languages */}
            {text && targetLanguages.length > 1 ? (
              <TabbedResult
                text={text}
                languages={targetLanguages}
                isStreaming={isStreaming}
              />
            ) : (
              text && (
                <StreamingResult
                  text={text}
                  isStreaming={isStreaming}
                  error={error}
                  onRegenerate={handleRegenerate}
                />
              )
            )}

            {/* Error state */}
            {error && !text && (
              <StreamingResult
                text=""
                isStreaming={false}
                error={error}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
