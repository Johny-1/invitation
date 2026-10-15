"use client";

import React from "react";
import { DesignConfig } from "@/types/invitation";
import { THEME_PRESETS } from "@/lib/presets";
import { Check, Palette, Sparkles } from "lucide-react";

interface ColorPaletteSelectorProps {
  design: DesignConfig;
  onChange: (updatedFields: Partial<DesignConfig>) => void;
}

export default function ColorPaletteSelector({ design, onChange }: ColorPaletteSelectorProps) {
  return (
    <div className="space-y-6 text-right">
      {/* 1-Click Luxury Theme Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>قوالب ألوان ملكية جاهزة بنقرة واحدة</span>
          </h4>
          <span className="text-[11px] text-stone-400">اختر طابعك المفضل</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEME_PRESETS.map((preset) => {
            const isSelected = design.presetThemeId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  if (preset.config) {
                    onChange({
                      ...preset.config,
                      presetThemeId: preset.id,
                    });
                  }
                }}
                className={`relative p-3.5 rounded-2xl border text-right transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-amber-950/40 border-amber-400 shadow-gold-sm"
                    : "bg-stone-950/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex-shrink-0 flex items-center justify-center font-bold text-white text-xs"
                  style={{ backgroundColor: preset.previewColor }}
                >
                  {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {preset.name.split("(")[0]}
                  </span>
                  <span className="text-[10px] text-stone-400 block truncate mt-0.5">
                    {preset.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Tuning Grid */}
      <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-3">
        <h4 className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>تخصيص ألوان العناصر الدقيقة</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { key: "primaryColor", label: "اللون الأساسي للبطاقة" },
            { key: "goldAccentColor", label: "درجة الذهب واللمعان" },
            { key: "envelopeColor", label: "لون الظرف الخارجي" },
            { key: "envelopeLinerColor", label: "لون بطانة الظرف" },
            { key: "waxSealColor", label: "لون الختم الشمعي" },
            { key: "ribbonColor", label: "لون الشريط الحريري" },
          ].map((item) => {
            const val = (design as any)[item.key] || "#d4af37";
            return (
              <div
                key={item.key}
                className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <span className="text-[10px] text-stone-300 font-medium block truncate">
                    {item.label}
                  </span>
                  <span className="text-[9px] text-amber-400/80 font-mono uppercase">
                    {val}
                  </span>
                </div>
                <input
                  type="color"
                  value={val}
                  onChange={(e) => onChange({ [item.key]: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 flex-shrink-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
