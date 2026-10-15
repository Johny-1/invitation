"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import { Sparkles, Heart, ChevronDown } from "lucide-react";
import CleanInnerCard from "./CleanInnerCard";

interface PresetProps {
  step: number;
  onNextStep: () => void;
  design: DesignConfig;
  weddingDetails: WeddingDetails;
  guestName?: string;
  isPreview?: boolean;
}

export default function ModernSlidePreset({
  step,
  onNextStep,
  design,
  weddingDetails,
  guestName,
  isPreview = false,
}: PresetProps) {
  const {
    goldAccentColor,
    cardInsideImage,
    envelopeClosedImage,
    sealImage,
  } = design;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center select-none">
      {/* Background Glow */}
      <div
        className="absolute inset-0 rounded-3xl filter blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${goldAccentColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative w-[320px] sm:w-[350px] h-[480px] flex items-center justify-center">
        {/* Inner Luxurious Card */}
        <div
          className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: cardInsideImage ? "transparent" : "#0d1527",
            borderColor: goldAccentColor,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          }}
        >
          <CleanInnerCard
            cardInsideImage={cardInsideImage}
            weddingDetails={weddingDetails}
            design={design}
            guestName={guestName}
            isRevealed={step >= 1}
            onNextStep={onNextStep}
            fontFamilyClass="font-sans"
          />
        </div>

        {/* Sliding Frosted Glass Sleeve (Step 0) */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              className="absolute inset-0 rounded-2xl backdrop-blur-md bg-slate-900/85 border-2 flex flex-col items-center justify-between p-6 z-30 cursor-pointer shadow-2xl overflow-hidden"
              style={{
                borderColor: `${goldAccentColor}80`,
                backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ y: 0, opacity: 1 }}
              exit={{
                y: "110%",
                opacity: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
              onClick={onNextStep}
              whileHover={{ y: -6 }}
            >
              <div className="pt-6 flex flex-col items-center relative z-10 bg-black/40 px-3 py-1 rounded-xl backdrop-blur-sm">
                <span className="text-2xl mb-1">✨</span>
                <span className="text-xs tracking-[0.2em] uppercase text-amber-200 font-bold">
                  INVITATION
                </span>
              </div>

              {/* Central Glowing Seal */}
              <div className="relative z-10 w-24 h-24 rounded-full border border-amber-400/50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 shadow-inner overflow-hidden">
                {sealImage ? (
                  <img src={sealImage} alt="Custom Monogram" className="w-16 h-16 object-contain rounded-full" />
                ) : (
                  <span className="text-2xl font-serif text-amber-300">
                    {weddingDetails.groomName.charAt(0)} & {weddingDetails.brideName.charAt(0)}
                  </span>
                )}
              </div>

              <div className="pb-6 flex flex-col items-center relative z-10">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-1 text-amber-300 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-amber-400/30"
                >
                  <span className="text-xs font-bold">
                    {design.stepDescriptions?.step1Prompt || "انقر لسحب الغلاف الفاخر"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
