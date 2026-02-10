"use client";

import { INQUIRY_CATEGORIES } from "@/lib/constants";
import { INQUIRY_ICONS } from "./icons";

interface InquiryFormProps {
  selectedCategory: string;
  customMessage: string;
  onCategorySelect: (id: string) => void;
  onCustomMessageChange: (msg: string) => void;
}

export default function InquiryForm({
  selectedCategory,
  customMessage,
  onCategorySelect,
  onCustomMessageChange,
}: InquiryFormProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text mb-2 text-center">
          問い合わせ内容
        </h2>
        <p className="text-text-sub text-sm mb-6 text-center">
          海外顧客からの問い合わせに対する回答テンプレートを生成します
        </p>
      </div>

      {/* Category Selection */}
      <div>
        <h3 className="text-sm font-medium text-text mb-3">
          問い合わせカテゴリ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INQUIRY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = INQUIRY_ICONS[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`p-3 rounded-xl border transition-all text-left flex items-start gap-3 ${
                  isSelected
                    ? "border-red bg-red/10"
                    : "border-border bg-card-bg hover:border-border-active hover:bg-card-bg-hover"
                }`}
              >
                <span className={`mt-0.5 ${isSelected ? "text-red" : "text-text-sub"}`}>
                  {Icon ? <Icon size={20} /> : null}
                </span>
                <div>
                  <div
                    className={`font-medium text-sm ${isSelected ? "text-red" : "text-text"}`}
                  >
                    {cat.label}
                  </div>
                  <div className="text-xs text-text-sub mt-0.5">
                    {cat.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Message */}
      <div>
        <h3 className="text-sm font-medium text-text mb-2">
          {selectedCategory === "custom"
            ? "問い合わせ内容を入力"
            : "追加の詳細（任意）"}
        </h3>
        <textarea
          value={customMessage}
          onChange={(e) => onCustomMessageChange(e.target.value)}
          placeholder={
            selectedCategory === "custom"
              ? "例: 御社の製品をOEM供給していただくことは可能でしょうか？最小ロット数と価格帯を教えてください。"
              : "例: 具体的な商品名や状況を記入すると、より適切な回答が生成されます"
          }
          rows={4}
          className="w-full px-3 py-2.5 bg-card-bg border border-border rounded-lg text-text text-sm placeholder:text-text-sub/50 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
    </div>
  );
}
