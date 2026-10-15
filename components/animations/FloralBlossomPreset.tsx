"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import { Sparkles, Heart } from "lucide-react";
import CleanInnerCard from "./CleanInnerCard";

interface PresetProps {
  step: number;
  onNextStep: () => void;
  design: DesignConfig;
  weddingDetails: WeddingDetails;
  guestName?: string;
  isPreview?: boolean;
}

export default function FloralBlossomPreset({
  step,
  onNextStep,
  design,
  weddingDetails,
  guestName,
  isPreview = false,
}: PresetProps) {
  const { goldAccentColor, cardInsideImage, sealImage } = design;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center select-none">
      {/* Background Glow */}
      <div
        className="absolute inset-0 rounded-3xl filter blur-3xl opacity-20 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, #f472b6 0%, transparent 70%)`,
        }}
      />

      <div className="relative w-[320px] sm:w-[350px] h-[480px] flex items-center justify-center">
        {/* Main Card */}
        <div
          className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: cardInsideImage ? "transparent" : "#fffdfa",
            borderColor: goldAccentColor,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <CleanInnerCard
            cardInsideImage={cardInsideImage}
            weddingDetails={weddingDetails}
            design={design}
            guestName={guestName}
            isRevealed={step >= 1}
            onNextStep={onNextStep}
          />
        </div>

        {/* Blooming Floral Overlay (Step 0) */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-sm border flex flex-col items-center justify-center p-6 z-30 cursor-pointer shadow-xl overflow-hidden"
              style={{ borderColor: goldAccentColor }}
              initial={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 1.3,
                opacity: 0,
                filter: "blur(6px)",
                transition: { duration: 0.7, ease: "easeOut" },
              }}
              onClick={onNextStep}
              whileHover={{ scale: 1.02 }}
            >
              {/* Spinning floral wreath with optional custom seal image in the center */}
              <motion.div
                className="relative w-36 h-36 rounded-full flex items-center justify-center border-2 border-rose-300 shadow-xl overflow-hidden"
                style={{
                  background: "radial-gradient(circle, #fdf2f8 0%, #fff 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {sealImage ? (
                  <img src={sealImage} alt="Custom Floral Seal" className="w-20 h-20 object-contain rounded-full" />
                ) : (
                  <span className="text-4xl">🌺</span>
                )}
              </motion.div>

              <div className="mt-6 text-center">
                <h3 className="text-base font-bold text-rose-900 mb-1">
                  دعوة زفاف خاصة
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  {weddingDetails.groomName} & {weddingDetails.brideName}
                </p>

                <motion.div
                  className="inline-flex items-center gap-1 px-4 py-1.5 bg-rose-600 text-white rounded-full text-xs font-semibold shadow-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{design.stepDescriptions?.step1Prompt || "المس لتفتّح الورد"}</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
