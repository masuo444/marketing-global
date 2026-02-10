"use client";

import { WizardStep } from "@/types";
import { IconCheck } from "./icons";

const STEPS = [
  { step: 1 as WizardStep, label: "業種選択", description: "ビジネスの種類" },
  { step: 2 as WizardStep, label: "コンテンツ種別", description: "生成する形式" },
  { step: 3 as WizardStep, label: "詳細入力", description: "言語とブランド" },
  { step: 4 as WizardStep, label: "AI生成", description: "コンテンツ生成" },
];

interface StepIndicatorProps {
  currentStep: WizardStep;
  onStepClick?: (step: WizardStep) => void;
}

export default function StepIndicator({
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="py-6">
      {/* Progress bar */}
      <div className="relative h-1 bg-border rounded-full mb-6 mx-8">
        <div
          className="absolute top-0 left-0 h-full bg-gold rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-start justify-between">
        {STEPS.map(({ step, label, description }) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          const isClickable = isCompleted && onStepClick;

          return (
            <button
              key={step}
              onClick={() => isClickable && onStepClick(step)}
              disabled={!isClickable}
              className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${
                isClickable ? "cursor-pointer" : ""
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? "bg-red text-white shadow-lg shadow-red/30"
                    : isCompleted
                      ? "bg-gold text-background"
                      : "bg-card-bg border border-border text-text-sub"
                }`}
              >
                {isCompleted ? <IconCheck size={16} /> : step}
              </span>
              <span
                className={`text-xs font-medium ${
                  isActive
                    ? "text-text"
                    : isCompleted
                      ? "text-gold"
                      : "text-text-sub"
                }`}
              >
                {label}
              </span>
              <span className="text-[10px] text-text-sub hidden sm:block">
                {description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
