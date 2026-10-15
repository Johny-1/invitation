"use client";

import React from "react";
import { DesignConfig, MotionConfig, MotionPhysics, MotionRevealMechanism, MotionSpeed, MotionTriggerType } from "@/types/invitation";
import { DEFAULT_MOTION_CONFIG } from "@/lib/presets";
import {
  Sparkles,
  Layers,
  Gift,
  Mail,
  BookOpen,
  Zap,
  Flower2,
  Clock,
  Compass,
  PartyPopper,
  Flame,
  Check,
  MousePointerClick,
  Sliders,
} from "lucide-react";

interface MotionStudioProps {
  design: DesignConfig;
  onChange: (updatedFields: Partial<DesignConfig>) => void;
}

export default function MotionStudio({ design, onChange }: MotionStudioProps) {
  const motionConfig: MotionConfig = design.motionConfig || DEFAULT_MOTION_CONFIG;

  const updateMotion = (fields: Partial<MotionConfig>) => {
    const updated = {
      ...motionConfig,
      ...fields,
    };
    onChange({
      animationPreset: "custom-studio",
      motionConfig: updated,
    });
  };

  const revealOptions: { id: MotionRevealMechanism; title: string; desc: string; icon: any }[] = [
    {
      id: "envelope",
      title: "الظرف الملكي المتحرك (3D Envelope)",
      desc: "فتح لسان الظرف للأعلى وصعود الكارت للأمام وتكبيره بتركيز كامل",
      icon: Mail,
    },
    {
      id: "gatefold",
      title: "البوابة المزدوجة ثلاثية الأبعاد (3D Gatefold)",
      desc: "انفتاح درفتي البوابة يميناً ويساراً بتأثير ثلاثي الأبعاد لكشف الكارت",
      icon: Gift,
    },
    {
      id: "slide",
      title: "السحب والانزلاق العصري (Slider Sleeve)",
      desc: "انزلاق الغلاف الخارجي للأعلى أو الأسفل أو الجانب لكشف الكارت",
      icon: Layers,
    },
    {
      id: "book-flip",
      title: "فتح الكارت المطوي والدفتر 3D (Book Flip)",
      desc: "انفتاح غلاف الكارت المطوي للأمام كالكتاب أو دفتر الزفاف الملكي",
      icon: BookOpen,
    },
    {
      id: "direct-zoom",
      title: "الظهور السينمائي المباشر (Direct Zoom & Float)",
      desc: "مثالي للتصاميم الكاملة: نقرة واحدة تكبّر الكارت وتبرزه مع بريق الذهب",
      icon: Zap,
    },
    {
      id: "blossom",
      title: "تفتّح الزهور والأوراق (Radial Blossom)",
      desc: "تفتّح باقة الورد تدريجياً وصعود الكارت الداخلي للأعلى",
      icon: Flower2,
    },
  ];

  const triggerOptions: { id: MotionTriggerType; title: string; desc: string; icon: any }[] = [
    {
      id: "wax-seal",
      title: "ختم شمعي ملكي (Wax Seal)",
      desc: "ختم شمعي أحمر/ذهبي يكسر عند الدوس ويتلاشى ببريق ذهبي",
      icon: Flame,
    },
    {
      id: "ribbon",
      title: "شريط وفيونكة حريرية (Silk Ribbon)",
      desc: "عقدة حريرية فاخرة تنفك بحركة ناعمة وانسيابية",
      icon: Gift,
    },
    {
      id: "monogram",
      title: "شارة مونوغرام ذهبية (Gold Monogram)",
      desc: "مونوغرام أنيق يحمل أول حروف أسماء العروسين أو لوجو الدعوة",
      icon: Sparkles,
    },
    {
      id: "custom-image",
      title: "صورة الختم المرفوعة مباشرة",
      desc: "استخدام اللوجو/الختم الخاص المرفوع في تبويب التصاميم كزر تشغيل متوهج",
      icon: Check,
    },
    {
      id: "none",
      title: "بدون قفل (نقر مباشر)",
      desc: "الفتح باللمس المباشر على الكارت أو الظرف بدون أي ختم",
      icon: MousePointerClick,
    },
  ];

  const speedOptions: { id: MotionSpeed; label: string; desc: string }[] = [
    { id: "slow", label: "هادئ وملكي (1.2s)", desc: "حركة سينمائية مهيبة" },
    { id: "normal", label: "متوازن (0.8s)", desc: "الإيقاع الطبيعي الأمثل" },
    { id: "fast", label: "سريع وخفيف (0.45s)", desc: "استجابة سريعة جداً" },
  ];

  const physicsOptions: { id: MotionPhysics; label: string; desc: string }[] = [
    { id: "spring", label: "مرن ونابض (Spring Physics)", desc: "ارتداد فيزيائي ممتع" },
    { id: "smooth", label: "انسيابي ناعم (Smooth Easing)", desc: "حركة ناعمة وفخمة" },
    { id: "gentle", label: "كلاسيكي هادئ (Gentle Ease-Out)", desc: "حركة مستقيمة ومتلاشية" },
  ];

  return (
    <div className="space-y-6 text-right animate-fade-in">
      
      {/* Intro Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>صانع الأنيميشن المخصص (Custom Motion Studio)</span>
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            صمم طريقة فتح الدعوة كما تحب وفقاً للتصميم الذي رفعته، وحدد آلية الكشف والقفل والسرعة
          </p>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 whitespace-nowrap">
          مخصص بالكامل ✓
        </span>
      </div>

      {/* 1. Reveal Mechanism */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>1. آلية فتح وكشف الكارت (Reveal Mechanism)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            اختر كيف سيتحرك الغلاف أو الظرف ليُظهر كارت الزفاف
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {revealOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = motionConfig.revealMechanism === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateMotion({ revealMechanism: opt.id })}
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
                  <h5 className="text-xs font-bold text-white mb-1">{opt.title}</h5>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* If Slide is chosen, show Direction selector */}
        {motionConfig.revealMechanism === "slide" && (
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-4">
            <span className="text-xs text-stone-300 font-medium">اتجاه حركة سحب الغلاف:</span>
            <div className="flex items-center gap-2">
              {[
                { id: "down", label: "للأسفل ⬇️" },
                { id: "up", label: "للأعلى ⬆️" },
                { id: "right", label: "لليمين ➡️" },
                { id: "left", label: "لليسار ⬅️" },
              ].map((dir) => (
                <button
                  key={dir.id}
                  type="button"
                  onClick={() => updateMotion({ slideDirection: dir.id as any })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    (motionConfig.slideDirection || "up") === dir.id
                      ? "bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Trigger / Seal Style */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>2. عنصر القفل والبداية (Trigger / Lock Style)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            الختم أو الزر الذي سيلمسه الضيف في البداية ليبدأ التفاعل
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {triggerOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = motionConfig.triggerType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateMotion({ triggerType: opt.id })}
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
                  <h5 className="text-xs font-bold text-white mb-1">{opt.title}</h5>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Speed & Physics */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-6">
        <div>
          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>3. سرعة وفيزيائية الحركة (Motion Speed & Easing)</span>
          </h4>
          <p className="text-[11px] text-stone-400 mt-0.5">
            تحكم في سلاسة الحركة، الارتداد المرن، وتوقيت الإطارات
          </p>
        </div>

        {/* Speed */}
        <div className="space-y-2">
          <label className="block text-[11px] text-stone-300 font-bold">سرعة حركة العناصر:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {speedOptions.map((s) => {
              const isSelected = motionConfig.speed === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => updateMotion({ speed: s.id })}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                  }`}
                >
                  <span className="text-xs block text-white">{s.label}</span>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">{s.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Physics */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <label className="block text-[11px] text-stone-300 font-bold">أسلوب الارتداد والانسيابية:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {physicsOptions.map((p) => {
              const isSelected = motionConfig.physics === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => updateMotion({ physics: p.id })}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm"
                      : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                  }`}
                >
                  <span className="text-xs block text-white">{p.label}</span>
                  <span className="text-[10px] text-stone-400 mt-0.5 block">{p.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Steps & Confetti Customization */}
      <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span>4. عدد الخطوات التفاعلية ومؤثرات الاحتفال</span>
            </h4>
            <p className="text-[11px] text-stone-400 mt-0.5">
              حدد كم لمسة يحتاجها الضيف للوصول إلى تفاصيل الحفل
            </p>
          </div>

          {/* Steps Count */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-2xl border border-stone-800">
            {([1, 2, 3] as const).map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => updateMotion({ stepsCount: cnt })}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  motionConfig.stepsCount === cnt
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {cnt} {cnt === 1 ? "خطوة" : "خطوات"}
              </button>
            ))}
          </div>
        </div>

        {/* Confetti Celebration Style */}
        <div className="pt-2">
          <label className="block text-[11px] text-stone-300 font-bold mb-2">تأثير الاحتفال والشرارات عند كل خطوة:</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: "gold", label: "بريق ذهبي ✨" },
              { id: "petals", label: "بتلات ورد 🌹" },
              { id: "stars", label: "نجوم متلألئة 🌟" },
              { id: "confetti", label: "قصاصات ملونة 🎉" },
              { id: "none", label: "بدون مؤثرات 🚫" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => updateMotion({ confettiType: c.id as any })}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  (motionConfig.confettiType || "gold") === c.id
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm"
                    : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Prompts per Step */}
        <div className="pt-3 border-t border-stone-800 space-y-3">
          <label className="block text-[11px] text-stone-300 font-bold">تخصيص عبارات الأزرار والتلميحات التفاعلية:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-[10px] text-stone-400 block mb-1">زر الخطوة 1 (القفل / البداية):</span>
              <input
                type="text"
                value={design.stepDescriptions?.step1Prompt || ""}
                onChange={(e) =>
                  onChange({
                    stepDescriptions: {
                      ...design.stepDescriptions,
                      step1Prompt: e.target.value,
                    },
                  })
                }
                placeholder="المس لفتح الدعوة 👑"
                className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
              />
            </div>
            {motionConfig.stepsCount >= 2 && (
              <div>
                <span className="text-[10px] text-stone-400 block mb-1">زر الخطوة 2 (كشف الكارت):</span>
                <input
                  type="text"
                  value={design.stepDescriptions?.step2Prompt || ""}
                  onChange={(e) =>
                    onChange({
                      stepDescriptions: {
                        ...design.stepDescriptions,
                        step2Prompt: e.target.value,
                      },
                    })
                  }
                  placeholder="اضغط لمشاهدة الكارت ✉️"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                />
              </div>
            )}
            {motionConfig.stepsCount >= 3 && (
              <div>
                <span className="text-[10px] text-stone-400 block mb-1">زر الخطوة 3 (دخول التفاصيل):</span>
                <input
                  type="text"
                  value={design.stepDescriptions?.step3Prompt || ""}
                  onChange={(e) =>
                    onChange({
                      stepDescriptions: {
                        ...design.stepDescriptions,
                        step3Prompt: e.target.value,
                      },
                    })
                  }
                  placeholder="انقر للدخول لتفاصيل الحفل والخريطة ✨"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white"
                />
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
