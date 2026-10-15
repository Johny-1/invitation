"use client";

import React, { useState } from "react";
import { RotateCcw, Smartphone, Sparkles } from "lucide-react";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import AnimationContainer from "../animations/AnimationContainer";
import SparklesCanvas from "../guest/SparklesCanvas";

import AtmosphereBackground from "../guest/AtmosphereBackground";

import AudioPlayer from "../guest/AudioPlayer";

interface LivePhoneMockupProps {
  design: DesignConfig;
  weddingDetails: WeddingDetails;
}

export default function LivePhoneMockup({ design, weddingDetails }: LivePhoneMockupProps) {
  const [interactiveKey, setInteractiveKey] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-2">
      {/* Top Simulator Toolbar */}
      <div className="w-full max-w-[340px] flex items-center justify-between mb-3 px-2 text-xs">
        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>المعاينة التفاعلية الحية</span>
        </div>
        <button
          type="button"
          onClick={() => setInteractiveKey((k) => k + 1)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 text-[11px] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>إعادة الفتح</span>
        </button>
      </div>

      {/* iPhone Mockup Chassis */}
      <div
        className="relative w-[320px] sm:w-[340px] h-[640px] max-h-[78vh] rounded-[48px] bg-stone-950 border-[6px] border-stone-800 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 35px -5px rgba(212,175,55,0.15)",
        }}
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
          <div className="w-2 h-2 rounded-full bg-blue-950" />
        </div>

        {/* Inner Interactive Screen Area */}
        <div
          key={`${interactiveKey}-${design.animationPreset}-${design.cardInsideImage || ''}-${design.envelopeClosedImage || ''}-${design.sealImage || ''}-${design.backgroundConfig?.type}-${design.backgroundConfig?.gradientFrom}-${design.backgroundConfig?.solidColor}`}
          className="relative w-full h-full overflow-y-auto flex flex-col justify-center select-none"
        >
          <AtmosphereBackground design={design} className="flex flex-col justify-center">
            {design.audioUrl && (
              <AudioPlayer
                audioUrl={design.audioUrl}
                autoPlay={design.autoPlayAudioOnOpen}
                className="absolute top-9 left-2.5 z-50 scale-90 origin-top-left"
                compact={true}
              />
            )}
            <AnimationContainer
              design={design}
              weddingDetails={weddingDetails}
              guestName="أ/ ضيف تجريبي"
              isPreview={true}
            />
          </AtmosphereBackground>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>

      <p className="text-[11px] text-stone-500 mt-2 text-center">
        💡 يمكنك الضغط والتفاعل مع العناصر داخل الهاتف مباشرة!
      </p>
    </div>
  );
}
