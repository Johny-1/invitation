"use client";

import React from "react";
import { AnimationPresetType } from "@/types/invitation";
import { ANIMATION_PRESETS_LIST } from "@/lib/presets";
import { Mail, Gift, Layers, Flower2, Check, Sparkles } from "lucide-react";

interface AnimationPickerProps {
  selectedPreset: AnimationPresetType;
  onChange: (preset: AnimationPresetType) => void;
  onPreview?: () => void;
}

export default function AnimationPicker({
  selectedPreset,
  onChange,
  onPreview,
}: AnimationPickerProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Mail":
        return <Mail className="w-5 h-5" />;
      case "Gift":
        return <Gift className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Flower2":
        return <Flower2 className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4 text-right">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-stone-100">
            طريقة فتح الدعوة والأنيميشن (Animation Style)
          </h3>
          <p className="text-xs text-stone-400">
            اختر طريقة التفاعل باللمس عند فتح الضيف للرابط
          </p>
        </div>
        {onPreview && (
          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-semibold hover:bg-amber-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>معاينة وتجربة الدوسات 📱</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ANIMATION_PRESETS_LIST.map((preset) => {
          const isSelected = selectedPreset === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => onChange(preset.id)}
              className={`relative p-4 rounded-2xl border text-right cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? "bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-950/50 scale-[1.01]"
                  : "bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    isSelected
                      ? "bg-amber-500 text-stone-950 border-amber-400"
                      : "bg-stone-800 text-stone-300 border-stone-700"
                  }`}
                >
                  {getIcon(preset.icon)}
                </div>

                <div className="flex-1 pl-6">
                  <h4 className="text-sm font-bold text-white mb-1">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
                <span>تفاعل يدوي باللمس: {preset.stepsCount} خطوات</span>
                <span className={isSelected ? "text-amber-400 font-bold" : ""}>
                  {isSelected ? "النمط المختار حالياً ✓" : "انقر للاختيار"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
