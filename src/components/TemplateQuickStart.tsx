"use client";

import { QUICK_TEMPLATES } from "@/lib/constants";
import { QuickTemplate } from "@/types";
import { IconZap, IconArrowRight } from "./icons";
import { CATEGORY_ICONS, CONTENT_TYPE_ICONS } from "./icons";

interface TemplateQuickStartProps {
  onSelect: (template: QuickTemplate) => void;
}

export default function TemplateQuickStart({ onSelect }: TemplateQuickStartProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <IconZap size={18} className="text-gold" />
        <h3 className="text-sm font-medium text-text">テンプレートで即生成</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {QUICK_TEMPLATES.map((tmpl) => {
          const CatIcon = CATEGORY_ICONS[tmpl.category];
          const CtIcon = CONTENT_TYPE_ICONS[tmpl.contentType];
          return (
            <button
              key={tmpl.id}
              onClick={() => onSelect(tmpl)}
              className="group p-4 rounded-xl border border-border bg-card-bg hover:border-gold hover:bg-card-bg-hover transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex gap-1 mt-0.5 text-text-sub group-hover:text-gold transition-colors">
                  {CatIcon && <CatIcon size={18} />}
                  {CtIcon && <CtIcon size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-text group-hover:text-gold transition-colors">
                    {tmpl.label}
                  </div>
                  <div className="text-xs text-text-sub mt-1 line-clamp-2">
                    {tmpl.description}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>すぐに生成</span>
                    <IconArrowRight size={12} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
