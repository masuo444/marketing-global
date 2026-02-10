"use client";

import { CONTENT_TYPES } from "@/lib/constants";
import { CONTENT_TYPE_ICONS } from "./icons";

interface ContentTypeGridProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ContentTypeGrid({
  selectedId,
  onSelect,
}: ContentTypeGridProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-text mb-2 text-center">
        コンテンツの種類を選択
      </h2>
      <p className="text-text-sub text-sm mb-6 text-center">
        生成したいコンテンツの種類を選んでください
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CONTENT_TYPES.map((ct) => {
          const isSelected = selectedId === ct.id;
          const Icon = CONTENT_TYPE_ICONS[ct.icon];
          return (
            <button
              key={ct.id}
              onClick={() => onSelect(ct.id)}
              className={`p-4 rounded-xl border transition-all text-left group ${
                isSelected
                  ? "border-red bg-red/10"
                  : "border-border bg-card-bg hover:border-border-active hover:bg-card-bg-hover"
              }`}
            >
              <div className={`mb-2 ${isSelected ? "text-red" : "text-text-sub group-hover:text-gold"}`}>
                {Icon ? <Icon size={24} /> : null}
              </div>
              <div
                className={`font-medium text-sm ${isSelected ? "text-red" : "text-text group-hover:text-gold"}`}
              >
                {ct.label}
              </div>
              <div className="text-xs text-text-sub mt-1">
                {ct.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
