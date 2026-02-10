"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import StepIndicator from "@/components/StepIndicator";
import CategoryGrid from "@/components/CategoryGrid";
import ContentTypeGrid from "@/components/ContentTypeGrid";
import LanguageSelector from "@/components/LanguageSelector";
import BrandInput from "@/components/BrandInput";
import ToneSelector from "@/components/ToneSelector";
import TemplateQuickStart from "@/components/TemplateQuickStart";
import SkeletonLoader from "@/components/SkeletonLoader";
import TabbedResult from "@/components/TabbedResult";
import StreamingResult from "@/components/StreamingResult";
import { useStreaming } from "@/hooks/useStreaming";
import { useHistory } from "@/hooks/useHistory";
import { useToastContext } from "@/components/Toast";
import { IconSparkles, IconRefresh } from "@/components/icons";
import { BrandInfo, WizardStep, ToneType, QuickTemplate } from "@/types";

export default function GeneratePage() {
  const [step, setStep] = useState<WizardStep>(1);
  const [category, setCategory] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);
  const [tone, setTone] = useState<ToneType>("professional");
  const [brand, setBrand] = useState<BrandInfo>({
    name: "",
    description: "",
    specialty: "",
  });

  const { addToast } = useToastContext();
  const { addEntry } = useHistory();

  const handleStreamComplete = useCallback(
    (fullText: string) => {
      addToast("コンテンツの生成が完了しました", "success");
      addEntry({
        type: "generate",
        category: category || "",
        contentType: contentType || "",
        languages,
        tone,
        brandName: brand.name,
        resultPreview: fullText.slice(0, 120),
        fullResult: fullText,
      });
    },
    [category, contentType, languages, tone, brand.name, addToast, addEntry]
  );

  const { text, isStreaming, error, startStreaming, reset } = useStreaming({
    onComplete: handleStreamComplete,
  });

  const handleCategorySelect = (id: string) => {
    setCategory(id);
    setTimeout(() => setStep(2), 300);
  };

  const handleContentTypeSelect = (id: string) => {
    setContentType(id);
    setTimeout(() => setStep(3), 300);
  };

  const handleLanguageToggle = (id: string) => {
    setLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleTemplateSelect = useCallback(
    async (template: QuickTemplate) => {
      setCategory(template.category);
      setContentType(template.contentType);
      setLanguages(template.languages);
      setBrand(template.brand);
      setTone(template.tone);
      setStep(4);
      reset();
      await startStreaming("/api/generate", {
        category: template.category,
        contentType: template.contentType,
        languages: template.languages,
        brand: template.brand,
        tone: template.tone,
      });
    },
    [startStreaming, reset]
  );

  const handleGenerate = useCallback(async () => {
    if (!category || !contentType || languages.length === 0 || !brand.name)
      return;

    setStep(4);
    await startStreaming("/api/generate", {
      category,
      contentType,
      languages,
      brand,
      tone,
    });
  }, [category, contentType, languages, brand, tone, startStreaming]);

  const handleRegenerate = useCallback(async () => {
    reset();
    await startStreaming("/api/generate", {
      category,
      contentType,
      languages,
      brand,
      tone,
    });
  }, [category, contentType, languages, brand, tone, startStreaming, reset]);

  const handleStepClick = (targetStep: WizardStep) => {
    if (targetStep < step) {
      setStep(targetStep);
      if (targetStep <= 3) {
        reset();
      }
    }
  };

  const isStep3Valid =
    languages.length > 0 && brand.name.trim() && brand.description.trim();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-4 pb-12">
        <Breadcrumb items={[{ label: "コンテンツ生成" }]} />

        {/* Template Quick Start - show on step 1 */}
        {step === 1 && (
          <div className="mb-8">
            <TemplateQuickStart onSelect={handleTemplateSelect} />
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-text-sub">
                  または手動で設定
                </span>
              </div>
            </div>
          </div>
        )}

        <StepIndicator currentStep={step} onStepClick={handleStepClick} />

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <CategoryGrid selectedId={category} onSelect={handleCategorySelect} />
        )}

        {/* Step 2: Content Type Selection */}
        {step === 2 && (
          <ContentTypeGrid
            selectedId={contentType}
            onSelect={handleContentTypeSelect}
          />
        )}

        {/* Step 3: Language + Brand Info + Tone */}
        {step === 3 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-text mb-2">
                詳細情報を入力
              </h2>
              <p className="text-text-sub text-sm">
                対象言語・トーン・ブランド情報を入力してください
              </p>
            </div>

            <LanguageSelector
              selectedIds={languages}
              onToggle={handleLanguageToggle}
            />

            <ToneSelector selected={tone} onChange={setTone} />

            <BrandInput brand={brand} onChange={setBrand} />

            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerate}
                disabled={!isStep3Valid}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all ${
                  isStep3Valid
                    ? "bg-red hover:bg-red-hover shadow-lg shadow-red/20"
                    : "bg-border text-text-sub cursor-not-allowed"
                }`}
              >
                <IconSparkles size={18} />
                AIでコンテンツを生成
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-text mb-1">生成結果</h2>
                <p className="text-text-sub text-sm">
                  {isStreaming
                    ? "AIが文化に合わせたコンテンツを生成しています"
                    : "コンテンツが生成されました"}
                </p>
              </div>
              {!isStreaming && text && (
                <button
                  onClick={handleRegenerate}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-text-sub hover:text-text hover:border-border-active transition-colors"
                >
                  <IconRefresh size={14} />
                  <span>再生成</span>
                </button>
              )}
            </div>

            {/* Show skeleton before content starts streaming */}
            {!text && isStreaming && <SkeletonLoader />}

            {/* Show tabbed result if multiple languages */}
            {text && languages.length > 1 ? (
              <TabbedResult
                text={text}
                languages={languages}
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
