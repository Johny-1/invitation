"use client";

import React, { useState } from "react";
import { BackgroundConfig, BackgroundPatternType, BackgroundType, DesignConfig } from "@/types/invitation";
import { DEFAULT_BACKGROUND_CONFIG, LUXURY_GRADIENT_PRESETS } from "@/lib/presets";
import {
  Palette,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Trash2,
  Sliders,
  SunMedium,
  Grid,
  Layers,
  Check,
} from "lucide-react";

interface BackgroundStudioProps {
  design: DesignConfig;
  onChange: (updatedFields: Partial<DesignConfig>) => void;
}

export default function BackgroundStudio({ design, onChange }: BackgroundStudioProps) {
  const bgConfig: BackgroundConfig = design.backgroundConfig || {
    ...DEFAULT_BACKGROUND_CONFIG,
    solidColor: design.backgroundColor || "#031d16",
    gradientFrom: design.primaryColor || "#064e3b",
    gradientTo: design.backgroundColor || "#010f0b",
  };

  const [uploading, setUploading] = useState(false);

  const updateBg = (fields: Partial<BackgroundConfig>) => {
    const updated = {
      ...bgConfig,
      ...fields,
    };
    onChange({
      backgroundColor: updated.solidColor || updated.gradientTo || design.backgroundColor,
      backgroundPattern: updated.pattern,
      backgroundConfig: updated,
    });
  };

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        updateBg({
          type: "image",
          bgCustomImage: data.url,
        });
      } else {
        alert("فشل رفع الصورة: " + (data.error || "خطأ غير معروف"));
      }
    } catch {
      alert("حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  const patternOptions: { id: BackgroundPatternType; label: string; desc: string }[] = [
    { id: "damask", label: "نقوش دمشقية إسلامية", desc: "زخارف أرابيسك ملكية فاخرة" },
    { id: "stars", label: "نجوم متلألئة", desc: "سماء ليلية مرصعة بالنجوم" },
    { id: "lattice", label: "شبكية مغربية ملكية", desc: "خطوط هندسية فخمة" },
    { id: "floral", label: "ورود ناعمة", desc: "أغصان وأزهار رومانسية" },
    { id: "geometric", label: "هندسة ذهبية", desc: "مربعات ومضلعات عصرية" },
    { id: "dots", label: "نقاط ذهبية متباعدة", desc: "نقاط متلألئة أنيقة" },
    { id: "clean", label: "سادة وبدون نقوش", desc: "خلفية ناعمة هادئة" },
  ];

  return (
    <div className="space-y-6 text-right animate-fade-in">
      
      {/* Intro Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>استوديو خلفيات ومظهر الموقع (Background & Atmosphere Studio)</span>
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            اختر لون أو تدرج خلفية السايت، أو ارفع صورة خلفية خاصة، وتحكم في النقوش والهالة الضوئية
          </p>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 whitespace-nowrap">
          أجواء ملكية ✨
        </span>
      </div>

      {/* 1. Background Style Mode Switcher */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>1. أسلوب ونوع خلفية السايت (Background Mode)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            اختر ما بين التدرجات اللونية الفاخرة، اللون الموحد، أو صورة خاصة من جهازك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: "gradient" as BackgroundType,
              title: "تدرج لوني ملكي (Luxury Gradient)",
              desc: "تدرج سينمائي انسيابي بين درجتين أو ثلاث درجات",
              icon: Sparkles,
            },
            {
              id: "solid" as BackgroundType,
              title: "لون مصمت موحد (Solid Color)",
              desc: "لون واحد أنيق ومريح للعين مع منتقي ألوان دقيق",
              icon: Palette,
            },
            {
              id: "image" as BackgroundType,
              title: "صورة خلفية مخصصة (Custom Image)",
              desc: "رفع صورة خاصة للسايت مع تحكم بالشفافية والبلور",
              icon: ImageIcon,
            },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = bgConfig.type === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => updateBg({ type: mode.id })}
                className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-amber-950/40 border-amber-400 shadow-gold-sm scale-[1.01]"
                    : "bg-stone-950 border-stone-800 hover:border-stone-700 hover:bg-stone-900"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <span className="text-[10px] text-amber-400 font-bold">مختار ✓</span>}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white mb-1">{mode.title}</h5>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{mode.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* --- GRADIENT CONTROLS --- */}
        {bgConfig.type === "gradient" && (
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <div>
              <span className="text-xs font-bold text-stone-300 block mb-2">قوالب تدرجات ملكية جاهزة بنقرة واحدة:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {LUXURY_GRADIENT_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      updateBg({
                        gradientFrom: p.from,
                        gradientVia: p.via,
                        gradientTo: p.to,
                        gradientAngle: p.angle,
                      })
                    }
                    className="p-2.5 rounded-xl border border-stone-800 hover:border-amber-400 bg-stone-950 text-right flex items-center gap-2 group transition-all cursor-pointer"
                  >
                    <div
                      className="w-7 h-7 rounded-lg border border-white/20 shadow-sm flex-shrink-0"
                      style={{
                        background: `linear-gradient(${p.angle}deg, ${p.from}, ${p.via || p.to}, ${p.to})`,
                      }}
                    />
                    <span className="text-[11px] font-medium text-stone-300 group-hover:text-amber-300 truncate">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Gradient Colors & Angle */}
            <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-4">
              <span className="text-xs font-bold text-amber-300 block">تخصيص ألوان وزاوية التدرج:</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">لون البداية</span>
                    <span className="text-xs font-mono text-amber-300 uppercase">{bgConfig.gradientFrom}</span>
                  </div>
                  <input
                    type="color"
                    value={bgConfig.gradientFrom}
                    onChange={(e) => updateBg({ gradientFrom: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>

                <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">لون المنتصف</span>
                    <span className="text-xs font-mono text-amber-300 uppercase">{bgConfig.gradientVia || "#031d16"}</span>
                  </div>
                  <input
                    type="color"
                    value={bgConfig.gradientVia || "#031d16"}
                    onChange={(e) => updateBg({ gradientVia: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>

                <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">لون النهاية</span>
                    <span className="text-xs font-mono text-amber-300 uppercase">{bgConfig.gradientTo}</span>
                  </div>
                  <input
                    type="color"
                    value={bgConfig.gradientTo}
                    onChange={(e) => updateBg({ gradientTo: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>

                <div className="p-2.5 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">نوع التدرج</span>
                    <span className="text-xs font-bold text-amber-300">{bgConfig.gradientType === 'linear' ? 'خطي (Linear)' : 'دائري (Radial)'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateBg({ gradientType: bgConfig.gradientType === 'linear' ? 'radial' : 'linear' })}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-[10px] font-bold border border-stone-700"
                  >
                    تبديل
                  </button>
                </div>
              </div>

              {/* Angle slider for Linear */}
              {bgConfig.gradientType === 'linear' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>زاوية التدرج اللوني:</span>
                    <span className="font-mono text-amber-300">{bgConfig.gradientAngle || 135}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={bgConfig.gradientAngle || 135}
                    onChange={(e) => updateBg({ gradientAngle: Number(e.target.value) })}
                    className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- SOLID COLOR CONTROLS --- */}
        {bgConfig.type === "solid" && (
          <div className="pt-4 border-t border-stone-800 p-4 bg-stone-950/80 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">لون خلفية الموقع الموحد:</span>
              <span className="text-[11px] text-stone-400">اختر درجة اللون أو اكتب كود الـ Hex</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={bgConfig.solidColor || "#031d16"}
                onChange={(e) => updateBg({ solidColor: e.target.value })}
                className="w-24 px-3 py-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-amber-300 font-mono text-center uppercase"
                dir="ltr"
              />
              <input
                type="color"
                value={bgConfig.solidColor || "#031d16"}
                onChange={(e) => updateBg({ solidColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>
        )}

        {/* --- CUSTOM IMAGE CONTROLS --- */}
        {bgConfig.type === "image" && (
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">صورة خلفية السايت:</span>
                  <span className="text-[11px] text-stone-400">ارفع صورة عالية الدقة لتكون خلفية عامة للدعوة</span>
                </div>
                {bgConfig.bgCustomImage && (
                  <button
                    type="button"
                    onClick={() => updateBg({ bgCustomImage: undefined })}
                    className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف الصورة</span>
                  </button>
                )}
              </div>

              {bgConfig.bgCustomImage && (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-stone-700 bg-black/60">
                  <img src={bgConfig.bgCustomImage} alt="Site background" className="w-full h-full object-cover" />
                </div>
              )}

              <label className="w-full px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs text-amber-300 font-semibold text-center cursor-pointer transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                <span>{uploading ? "جاري الرفع..." : bgConfig.bgCustomImage ? "تغيير صورة الخلفية" : "رفع صورة خلفية للسايت"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBgImageUpload}
                  className="hidden"
                />
              </label>

              {/* Sliders for Opacity & Blur */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>نسبة شفافية الصورة (Opacity):</span>
                    <span className="text-amber-300 font-mono">{Math.round((bgConfig.bgImageOpacity ?? 0.25) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={Math.round((bgConfig.bgImageOpacity ?? 0.25) * 100)}
                    onChange={(e) => updateBg({ bgImageOpacity: Number(e.target.value) / 100 })}
                    className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>تأثير الغباشة (Blur Effect):</span>
                    <span className="text-amber-300 font-mono">{bgConfig.bgImageBlur ?? 0}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={bgConfig.bgImageBlur ?? 0}
                    onChange={(e) => updateBg({ bgImageBlur: Number(e.target.value) })}
                    className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Background Patterns */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <Grid className="w-4 h-4 text-amber-400" />
              <span>2. النقوش والزخارف الملكية (Background Patterns)</span>
            </h4>
            <p className="text-[11px] text-stone-400 mt-0.5">
              نقوش إسلامية ودمشقية تمنح الموقع عمقاً بصرياً وفخامة استثنائية
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-400">وضوح النقش:</span>
            <input
              type="range"
              min="5"
              max="50"
              value={Math.round((bgConfig.patternOpacity ?? 0.15) * 100)}
              onChange={(e) => updateBg({ patternOpacity: Number(e.target.value) / 100 })}
              className="w-24 accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-amber-300">{Math.round((bgConfig.patternOpacity ?? 0.15) * 100)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {patternOptions.map((pat) => {
            const isSelected = (bgConfig.pattern || "damask") === pat.id;
            return (
              <button
                key={pat.id}
                type="button"
                onClick={() => updateBg({ pattern: pat.id })}
                className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm"
                    : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white">{pat.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <span className="text-[10px] text-stone-400 block truncate">{pat.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Card Ambient Glow (الهالة الضوئية) */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <SunMedium className="w-4 h-4 text-amber-400" />
            <span>3. هالة التوهج المحيطة بالدعوة (Ambient Card Aura Glow)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            توهج ضوئي ساحر يشع من خلف بطاقة الفرح لإبرازها على أي شاشة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone-950/80 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">لون التوهج (Aura Color):</span>
              <span className="text-[11px] text-stone-400 font-mono uppercase">{bgConfig.ambientGlowColor || "#d4af37"}</span>
            </div>
            <input
              type="color"
              value={bgConfig.ambientGlowColor || "#d4af37"}
              onChange={(e) => updateBg({ ambientGlowColor: e.target.value })}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span>شدة التوهج (Glow Intensity):</span>
              <span className="text-amber-300 font-mono">{Math.round((bgConfig.ambientGlowIntensity ?? 0.4) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round((bgConfig.ambientGlowIntensity ?? 0.4) * 100)}
              onChange={(e) => updateBg({ ambientGlowIntensity: Number(e.target.value) / 100 })}
              className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Atmospheric Particles (الجزيئات المتطايرة) */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>4. جزيئات الهواء الحية (Atmospheric Floating Particles)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            مؤثرات متطايرة تملأ شاشة الزائر بأجواء رومانسية احتفالية
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: "gold-sparkles", label: "بريق ذهبي 24K ✨" },
            { id: "rose-petals", label: "بتلات ورد متساقطة 🌹" },
            { id: "stars", label: "نجوم متلألئة 🌟" },
            { id: "floating-hearts", label: "قلوب حب متطايرة 💖" },
            { id: "none", label: "بدون جزيئات 🚫" },
          ].map((part) => (
            <button
              key={part.id}
              type="button"
              onClick={() => onChange({ particlesType: part.id as any })}
              className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                design.particlesType === part.id
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm font-bold"
                  : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
              }`}
            >
              {part.label}
            </button>
          ))}
        </div>

        {/* Speed & Density */}
        {design.particlesType !== "none" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-800">
            <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-[11px] text-stone-300 font-bold">سرعة الجزيئات:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "slow", label: "هادئة" },
                  { id: "normal", label: "طبيعية" },
                  { id: "fast", label: "سريعة" },
                ].map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => onChange({ particlesSpeed: sp.id as any })}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      (design.particlesSpeed || "normal") === sp.id
                        ? "bg-amber-500 text-stone-950"
                        : "bg-stone-900 text-stone-400"
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-[11px] text-stone-300 font-bold">كثافة الجزيئات:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "low", label: "خفيفة" },
                  { id: "medium", label: "متوسطة" },
                  { id: "high", label: "كثيفة" },
                ].map((den) => (
                  <button
                    key={den.id}
                    type="button"
                    onClick={() => onChange({ particlesDensity: den.id as any })}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      (design.particlesDensity || "medium") === den.id
                        ? "bg-amber-500 text-stone-950"
                        : "bg-stone-900 text-stone-400"
                    }`}
                  >
                    {den.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
