"use client";

import { LANGUAGES } from "@/lib/constants";

interface LanguageSelectorProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function LanguageSelector({
  selectedIds,
  onToggle,
}: LanguageSelectorProps) {
  const allSelected = selectedIds.length === LANGUAGES.length;

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all - toggle each selected
      selectedIds.forEach((id) => onToggle(id));
    } else {
      // Select all missing
      LANGUAGES.forEach((lang) => {
        if (!selectedIds.includes(lang.id)) {
          onToggle(lang.id);
        }
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-text">
          対象言語を選択（複数可）
        </h3>
        <button
          onClick={handleSelectAll}
          className="text-xs text-gold hover:text-gold-hover transition-colors"
        >
          {allSelected ? "すべて解除" : "すべて選択"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => {
          const isSelected = selectedIds.includes(lang.id);
          return (
            <button
              key={lang.id}
              onClick={() => onToggle(lang.id)}
              className={`px-3 py-2 rounded-lg border text-sm transition-all flex items-center gap-2 ${
                isSelected
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border bg-card-bg text-text-sub hover:border-border-active hover:text-text"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
      {selectedIds.length > 0 && (
        <p className="text-xs text-text-sub mt-2">
          {selectedIds.length}言語を選択中
        </p>
      )}
    </div>
  );
}
