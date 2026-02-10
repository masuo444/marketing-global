"use client";

import { CATEGORIES } from "@/lib/constants";
import { CATEGORY_ICONS } from "./icons";

interface CategoryGridProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function CategoryGrid({
  selectedId,
  onSelect,
}: CategoryGridProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-text mb-2 text-center">
        業種を選択してください
      </h2>
      <p className="text-text-sub text-sm mb-6 text-center">
        あなたのビジネスに最も近い業種を選んでください
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedId === cat.id;
          const Icon = CATEGORY_ICONS[cat.icon];
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`p-4 rounded-xl border transition-all text-left group ${
                isSelected
                  ? "border-red bg-red/10"
                  : "border-border bg-card-bg hover:border-border-active hover:bg-card-bg-hover"
              }`}
            >
              <div className={`mb-2 ${isSelected ? "text-red" : "text-text-sub group-hover:text-gold"}`}>
                {Icon ? <Icon size={28} /> : null}
              </div>
              <div
                className={`font-medium text-sm ${isSelected ? "text-red" : "text-text group-hover:text-gold"}`}
              >
                {cat.label}
              </div>
              <div className="text-xs text-text-sub mt-1">
                {cat.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
