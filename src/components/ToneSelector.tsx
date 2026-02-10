"use client";

import { TONES } from "@/lib/constants";
import { ToneType } from "@/types";
import { IconStar } from "./icons";

interface ToneSelectorProps {
  selected: ToneType;
  onChange: (tone: ToneType) => void;
}

export default function ToneSelector({ selected, onChange }: ToneSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-text mb-3 flex items-center gap-2">
        <IconStar size={16} className="text-gold" />
        トーンを選択
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {TONES.map((tone) => {
          const isSelected = selected === tone.id;
          return (
            <button
              key={tone.id}
              onClick={() => onChange(tone.id)}
              className={`px-3 py-2.5 rounded-xl border text-sm transition-all text-left ${
                isSelected
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border bg-card-bg text-text-sub hover:border-border-active hover:text-text"
              }`}
            >
              <div className={`font-medium ${isSelected ? "text-gold" : "text-text"}`}>
                {tone.label}
              </div>
              <div className="text-xs mt-0.5 opacity-70">{tone.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
