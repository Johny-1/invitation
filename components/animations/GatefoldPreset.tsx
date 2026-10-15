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

export default function GatefoldPreset({
  step,
  onNextStep,
  design,
  weddingDetails,
  guestName,
  isPreview = false,
}: PresetProps) {
  const {
    primaryColor,
    goldAccentColor,
    ribbonColor,
    envelopeColor,
    cardInsideImage,
    envelopeClosedImage,
    sealImage,
  } = design;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center select-none perspective-[1200px]">
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-3xl filter blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${goldAccentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Container */}
      <div className="relative w-[320px] sm:w-[350px] h-[480px] flex items-center justify-center">
        
        {/* Inner Card (Always underneath the folding doors) */}
        <div
          className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: cardInsideImage ? "transparent" : "#fdfbf7",
            borderColor: goldAccentColor,
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          <CleanInnerCard
            cardInsideImage={cardInsideImage}
            weddingDetails={weddingDetails}
            design={design}
            guestName={guestName}
            isRevealed={step >= 2}
            onNextStep={onNextStep}
          />
        </div>

        {/* 3D Gatefold Left Door */}
        <motion.div
          className="absolute left-0 inset-y-0 w-1/2 rounded-l-2xl origin-left z-30 overflow-hidden cursor-pointer shadow-xl border-y border-l"
          style={{
            backgroundColor: envelopeColor || primaryColor || "#4a0e17",
            backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "left center",
            borderColor: `${goldAccentColor}50`,
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateY: 0 }}
          animate={step >= 2 ? { rotateY: -140 } : { rotateY: 0 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          onClick={() => {
            if (step === 1) onNextStep();
          }}
        >
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${goldAccentColor} 1.5px, transparent 1.5px)`,
              backgroundSize: "14px 14px",
            }}
          />
          <div
            className="absolute inset-2 border-r-0 border rounded-l-xl pointer-events-none"
            style={{ borderColor: `${goldAccentColor}80` }}
          />
        </motion.div>

        {/* 3D Gatefold Right Door */}
        <motion.div
          className="absolute right-0 inset-y-0 w-1/2 rounded-r-2xl origin-right z-30 overflow-hidden cursor-pointer shadow-xl border-y border-r"
          style={{
            backgroundColor: envelopeColor || primaryColor || "#4a0e17",
            backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            borderColor: `${goldAccentColor}50`,
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateY: 0 }}
          animate={step >= 2 ? { rotateY: 140 } : { rotateY: 0 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          onClick={() => {
            if (step === 1) onNextStep();
          }}
        >
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${goldAccentColor} 1.5px, transparent 1.5px)`,
              backgroundSize: "14px 14px",
            }}
          />
          <div
            className="absolute inset-2 border-l-0 border rounded-r-xl pointer-events-none"
            style={{ borderColor: `${goldAccentColor}80` }}
          />
        </motion.div>

        {/* RIBBON & BOW (Step 0) */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                y: 120,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                onNextStep();
              }}
            >
              {/* Horizontal Satin Ribbon Band */}
              <div
                className="absolute inset-x-0 h-10 shadow-lg border-y flex items-center justify-center"
                style={{
                  backgroundColor: ribbonColor || "#d4af37",
                  borderColor: `${goldAccentColor}90`,
                  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                }}
              />

              {/* Central Luxury Bow Knot */}
              <motion.div
                className="relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 overflow-hidden"
                style={{
                  backgroundColor: ribbonColor || "#d4af37",
                  borderColor: "#fff",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {sealImage ? (
                  <img src={sealImage} alt="Custom Seal" className="w-12 h-12 object-contain rounded-full" />
                ) : (
                  <>
                    <span className="text-xl">🎀</span>
                    <span className="text-[9px] font-bold text-stone-900 tracking-wider uppercase mt-0.5">
                      UNTIE
                    </span>
                  </>
                )}
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute -bottom-10 whitespace-nowrap bg-black/85 backdrop-blur-md text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-400/40 shadow-xl pointer-events-none flex items-center gap-1.5"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{design.stepDescriptions?.step1Prompt || "المس الشريط لفك العقدة"}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1 Prompt */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 backdrop-blur-md text-amber-200 text-xs px-4 py-1.5 rounded-full border border-amber-400/40 shadow-xl z-50 flex items-center gap-1.5 cursor-pointer"
            onClick={onNextStep}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{design.stepDescriptions?.step2Prompt || "افتح بوابتي القصر 🏰"}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
