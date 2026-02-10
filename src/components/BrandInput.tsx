"use client";

import { BrandInfo } from "@/types";
import { IconInfo } from "./icons";

interface BrandInputProps {
  brand: BrandInfo;
  onChange: (brand: BrandInfo) => void;
}

function CharCount({ current, max }: { current: number; max: number }) {
  const isOver = current > max;
  return (
    <span className={`text-xs ${isOver ? "text-red" : "text-text-sub"}`}>
      {current}/{max}
    </span>
  );
}

export default function BrandInput({ brand, onChange }: BrandInputProps) {
  const update = (field: keyof BrandInfo, value: string) => {
    onChange({ ...brand, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-text mb-3">ブランド情報</h3>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs text-text-sub">
            ブランド名 <span className="text-red">*</span>
          </label>
          <CharCount current={brand.name.length} max={50} />
        </div>
        <input
          type="text"
          value={brand.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="例: 京都織物工房 山田"
          maxLength={50}
          className="w-full px-3 py-2.5 bg-card-bg border border-border rounded-lg text-text text-sm placeholder:text-text-sub/50 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="flex items-center gap-1 text-xs text-text-sub">
            ブランド概要 <span className="text-red">*</span>
            <span className="relative group">
              <IconInfo size={12} className="text-text-sub cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-card-bg border border-border rounded text-[10px] text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                ブランドの歴史、特徴、主要製品などを記入
              </span>
            </span>
          </label>
          <CharCount current={brand.description.length} max={300} />
        </div>
        <textarea
          value={brand.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="例: 京都で200年続く織物工房。伝統的な西陣織の技法を用いながら、現代的なデザインのテキスタイルを制作しています。"
          rows={3}
          maxLength={300}
          className="w-full px-3 py-2.5 bg-card-bg border border-border rounded-lg text-text text-sm placeholder:text-text-sub/50 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="flex items-center gap-1 text-xs text-text-sub">
            こだわりポイント
            <span className="relative group">
              <IconInfo size={12} className="text-text-sub cursor-help" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-card-bg border border-border rounded text-[10px] text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                他社との差別化ポイントや独自のこだわり
              </span>
            </span>
          </label>
          <CharCount current={brand.specialty.length} max={200} />
        </div>
        <textarea
          value={brand.specialty}
          onChange={(e) => update("specialty", e.target.value)}
          placeholder="例: 天然素材のみを使用し、すべての工程を手作業で行っています。環境に配慮した染色方法を採用。"
          rows={2}
          maxLength={200}
          className="w-full px-3 py-2.5 bg-card-bg border border-border rounded-lg text-text text-sm placeholder:text-text-sub/50 focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
    </div>
  );
}
