"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import { Sparkles, Crown, Heart } from "lucide-react";
import CleanInnerCard from "./CleanInnerCard";

interface PresetProps {
  step: number;
  onNextStep: () => void;
  design: DesignConfig;
  weddingDetails: WeddingDetails;
  guestName?: string;
  isPreview?: boolean;
}

export default function EnvelopeWaxPreset({
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
    waxSealColor,
    envelopeColor,
    envelopeLinerColor,
    cardInsideImage,
    envelopeClosedImage,
    envelopeOpenImage,
    sealImage,
  } = design;

  return (
    <div
      onClick={onNextStep}
      className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center select-none perspective-[1200px] cursor-pointer"
    >
      {/* Background shadow & glow */}
      <div
        className="absolute inset-0 rounded-2xl filter blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${goldAccentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Envelope Wrapper */}
      <div className="relative w-[320px] sm:w-[350px] h-[460px] flex items-center justify-center">
        
        {/* Envelope Base Body */}
        <div
          className="relative w-full h-[240px] rounded-b-2xl shadow-2xl transition-all duration-700 overflow-hidden"
          style={{
            backgroundColor: envelopeColor || primaryColor || "#064e3b",
            border: `1px solid ${goldAccentColor}40`,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Envelope Liner (Interior visible when opened) */}
          <div
            className="absolute inset-x-3 top-2 bottom-3 rounded-b-xl overflow-hidden opacity-95"
            style={{
              backgroundColor: envelopeLinerColor || "#0b664f",
              backgroundImage: envelopeOpenImage
                ? `url(${envelopeOpenImage})`
                : `radial-gradient(${goldAccentColor}33 1px, transparent 1px)`,
              backgroundSize: envelopeOpenImage ? "cover" : "16px 16px",
              backgroundPosition: "center",
              border: `1px solid ${goldAccentColor}30`,
            }}
          />

          {/* INNER INVITATION CARD */}
          <motion.div
            className={`absolute left-6 right-6 h-[340px] rounded-xl shadow-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-between p-6 text-center border ${
              step >= 2 ? "z-50" : "z-20"
            }`}
            style={{
              backgroundColor: "#fffdf9",
              borderColor: goldAccentColor,
              boxShadow: step >= 2 ? "0 25px 60px rgba(0,0,0,0.8)" : "0 15px 35px -5px rgba(0,0,0,0.5)",
              color: "#1f2937",
            }}
            initial={{ y: 20, scale: 0.94 }}
            animate={
              step === 0
                ? { y: 20, scale: 0.94 }
                : step === 1
                ? { y: -50, scale: 0.98 }
                : { y: -130, scale: 1.08, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }
          >
            <CleanInnerCard
              cardInsideImage={cardInsideImage}
              weddingDetails={weddingDetails}
              design={design}
              guestName={guestName}
              isRevealed={step >= 2}
              onNextStep={onNextStep}
            />
          </motion.div>

          {/* Front Envelope Pocket (Left & Right Flaps Fold) */}
          <div
            className={`absolute inset-x-0 bottom-0 h-full rounded-b-2xl overflow-hidden pointer-events-none ${
              step >= 2 ? "z-25" : "z-30"
            }`}
            style={{
              clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
              backgroundColor: envelopeColor || primaryColor || "#064e3b",
              backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
              borderBottom: `1px solid ${goldAccentColor}40`,
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `linear-gradient(135deg, ${goldAccentColor} 0%, transparent 50%, ${goldAccentColor} 100%)`,
              }}
            />
          </div>

          {/* TOP ENVELOPE FLAP */}
          <motion.div
            className="absolute top-0 inset-x-0 h-[140px] origin-top z-40 cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
            }}
            initial={{ rotateX: 0 }}
            animate={step >= 1 ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Flap Front (when closed) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundColor: envelopeColor || primaryColor || "#064e3b",
                backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                borderTop: `1px solid ${goldAccentColor}60`,
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(180deg, ${goldAccentColor}30, transparent 80%)`,
                }}
              />
            </div>

            {/* Flap Back (when opened) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backgroundColor: envelopeLinerColor || "#0b664f",
                backgroundImage: envelopeOpenImage ? `url(${envelopeOpenImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "rotateY(180deg) rotateZ(180deg)",
                backfaceVisibility: "hidden",
                borderTop: `1px solid ${goldAccentColor}40`,
              }}
            />
          </motion.div>

          {/* WAX SEAL (Centered on the flap tip) */}
          <AnimatePresence>
            {step === 0 && (
              <motion.div
                className="absolute left-1/2 top-[125px] -translate-x-1/2 z-50 cursor-pointer"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 1.4,
                  opacity: 0,
                  rotate: 45,
                  filter: "blur(4px)",
                  transition: { duration: 0.5 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                {/* Wax Seal Outer Glow */}
                <div
                  className="absolute -inset-2 rounded-full animate-ping opacity-30 pointer-events-none"
                  style={{ backgroundColor: waxSealColor || "#b8860b" }}
                />

                {/* Wax Stamp Body */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative border-2 overflow-hidden"
                  style={{
                    backgroundColor: waxSealColor || "#b8860b",
                    borderColor: `${goldAccentColor}`,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="absolute inset-0.5 rounded-full border border-amber-900/30 opacity-80 pointer-events-none z-10" />
                  
                  {sealImage ? (
                    <img
                      src={sealImage}
                      alt="Custom Wax Seal"
                      className="w-11 h-11 object-contain rounded-full relative z-10 drop-shadow-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-amber-100 relative z-10">
                      <Crown className="w-6 h-6 drop-shadow-md text-amber-200" />
                      <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5 text-amber-200/90">
                        OPEN
                      </span>
                    </div>
                  )}
                </div>

                {/* Pulsing Hint Tooltip */}
                <motion.div
                  className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 backdrop-blur-md text-amber-300 text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-lg pointer-events-none flex items-center gap-1.5"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{design.stepDescriptions?.step1Prompt || "المس الختم لفتح الدعوة"}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Tooltip for Step 1 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 backdrop-blur-md text-amber-300 text-xs px-4 py-2 rounded-full border border-amber-400/50 shadow-xl z-50 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{design.stepDescriptions?.step2Prompt || "اضغط لفتح المظروف ✉️"}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
