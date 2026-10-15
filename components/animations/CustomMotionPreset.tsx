"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DesignConfig, MotionConfig, WeddingDetails } from "@/types/invitation";
import { Sparkles, Crown, Heart, ChevronDown, BookOpen, Layers } from "lucide-react";
import CleanInnerCard from "./CleanInnerCard";

interface PresetProps {
  step: number;
  onNextStep: () => void;
  design: DesignConfig;
  weddingDetails: WeddingDetails;
  guestName?: string;
  isPreview?: boolean;
}

export default function CustomMotionPreset({
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
    ribbonColor,
    cardInsideImage,
    envelopeClosedImage,
    envelopeOpenImage,
    sealImage,
    motionConfig,
  } = design;

  const reveal = motionConfig?.revealMechanism || "envelope";
  const trigger = motionConfig?.triggerType || "wax-seal";
  const speed = motionConfig?.speed || "normal";
  const physics = motionConfig?.physics || "smooth";
  const slideDir = motionConfig?.slideDirection || "up";

  const duration = speed === "slow" ? 1.2 : speed === "fast" ? 0.45 : 0.8;
  const transitionConfig =
    physics === "spring"
      ? { type: "spring", stiffness: 100, damping: 12 }
      : physics === "gentle"
      ? { duration, ease: "easeOut" }
      : { duration, ease: [0.16, 1, 0.3, 1] };

  // Inner Card Content component
  const renderCardContent = () => (
    <CleanInnerCard
      cardInsideImage={cardInsideImage}
      weddingDetails={weddingDetails}
      design={design}
      guestName={guestName}
      isRevealed={step >= 1}
      onNextStep={onNextStep}
    />
  );

  // Trigger Element (Seal, Ribbon, Monogram, or Custom Logo)
  const renderTrigger = () => {
    if (trigger === "none" || step > 0) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="absolute z-50 cursor-pointer flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.3, opacity: 0, filter: "blur(4px)", transition: { duration: 0.4 } }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={(e) => {
            e.stopPropagation();
            onNextStep();
          }}
        >
          {trigger === "wax-seal" && (
            <div className="relative flex flex-col items-center">
              <div
                className="absolute -inset-2 rounded-full animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: waxSealColor || "#b8860b" }}
              />
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative border-2 overflow-hidden"
                style={{
                  backgroundColor: waxSealColor || "#b8860b",
                  borderColor: goldAccentColor,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)",
                }}
              >
                {sealImage ? (
                  <img src={sealImage} alt="Seal" className="w-11 h-11 object-contain rounded-full" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-amber-100">
                    <Crown className="w-6 h-6 text-amber-200" />
                    <span className="text-[8px] font-bold tracking-widest uppercase mt-0.5">OPEN</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {trigger === "ribbon" && (
            <div className="relative flex flex-col items-center">
              <div
                className="w-18 h-18 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 p-2"
                style={{
                  backgroundColor: ribbonColor || goldAccentColor || "#d4af37",
                  borderColor: "#ffffff",
                }}
              >
                {sealImage ? (
                  <img src={sealImage} alt="Ribbon Emblem" className="w-10 h-10 object-contain rounded-full" />
                ) : (
                  <>
                    <span className="text-xl">🎀</span>
                    <span className="text-[9px] font-bold text-stone-900 tracking-wider uppercase">UNTIE</span>
                  </>
                )}
              </div>
            </div>
          )}

          {trigger === "monogram" && (
            <div
              className="w-18 h-18 rounded-2xl bg-stone-950/90 border-2 border-amber-400 p-2 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
              style={{ borderColor: goldAccentColor }}
            >
              {sealImage ? (
                <img src={sealImage} alt="Monogram" className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-base font-serif font-black text-amber-300">
                  {weddingDetails.groomName.charAt(0)} & {weddingDetails.brideName.charAt(0)}
                </span>
              )}
            </div>
          )}

          {trigger === "custom-image" && sealImage && (
            <div className="relative p-2 rounded-2xl bg-black/60 border border-amber-400/50 backdrop-blur-md shadow-2xl animate-pulse">
              <img src={sealImage} alt="Custom Emblem" className="w-16 h-16 object-contain rounded-xl" />
            </div>
          )}

          {/* Hint Tooltip */}
          <motion.div
            className="mt-2 whitespace-nowrap bg-black/85 backdrop-blur-md text-amber-300 text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-xl pointer-events-none flex items-center gap-1.5"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{design.stepDescriptions?.step1Prompt || "المس لفتح الدعوة"}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div
      onClick={onNextStep}
      className="relative w-full max-w-md mx-auto aspect-[3/4] flex items-center justify-center select-none perspective-[1200px] cursor-pointer"
    >
      {/* Ambient Glow Aura */}
      <div
        className="absolute inset-0 rounded-3xl filter blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${goldAccentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Container */}
      <div className="relative w-[320px] sm:w-[350px] h-[480px] flex items-center justify-center">

        {/* 1. ENVELOPE MECHANISM */}
        {reveal === "envelope" && (
          <div className="relative w-full h-[460px] flex items-center justify-center">
            {/* Base Envelope Pocket */}
            <div
              className="relative w-full h-[240px] rounded-b-2xl shadow-2xl transition-all duration-700 overflow-hidden"
              style={{
                backgroundColor: envelopeColor || primaryColor || "#064e3b",
                border: `1px solid ${goldAccentColor}40`,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              }}
            >
              {/* Inner Liner */}
              <div
                className="absolute inset-x-3 top-2 bottom-3 rounded-b-xl overflow-hidden opacity-95"
                style={{
                  backgroundColor: envelopeLinerColor || "#0b664f",
                  backgroundImage: envelopeOpenImage ? `url(${envelopeOpenImage})` : `radial-gradient(${goldAccentColor}33 1px, transparent 1px)`,
                  backgroundSize: envelopeOpenImage ? "cover" : "16px 16px",
                  backgroundPosition: "center",
                }}
              />

              {/* Inner Card */}
              <motion.div
                className={`absolute left-6 right-6 h-[340px] rounded-xl shadow-2xl overflow-hidden border ${
                  step >= 2 ? "z-50" : "z-20"
                }`}
                style={{
                  backgroundColor: "#fffdf9",
                  borderColor: goldAccentColor,
                }}
                initial={{ y: 20, scale: 0.94 }}
                animate={
                  step === 0
                    ? { y: 20, scale: 0.94 }
                    : step === 1
                    ? { y: -50, scale: 0.98 }
                    : { y: -130, scale: 1.08 }
                }
                transition={transitionConfig}
              >
                {renderCardContent()}
              </motion.div>

              {/* Front Flap Pocket */}
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
                }}
              />

              {/* Top Flap */}
              <motion.div
                className="absolute top-0 inset-x-0 h-[140px] origin-top z-40"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: 0 }}
                animate={step >= 1 ? { rotateX: 180 } : { rotateX: 0 }}
                transition={transitionConfig}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backgroundColor: envelopeColor || primaryColor || "#064e3b",
                    backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                    backgroundSize: "cover",
                    backfaceVisibility: "hidden",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backgroundColor: envelopeLinerColor || "#0b664f",
                    backgroundImage: envelopeOpenImage ? `url(${envelopeOpenImage})` : undefined,
                    backgroundSize: "cover",
                    transform: "rotateY(180deg) rotateZ(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>

              {/* Trigger */}
              <div className="absolute left-1/2 top-[125px] -translate-x-1/2 z-50">
                {renderTrigger()}
              </div>
            </div>
          </div>
        )}

        {/* 2. GATEFOLD MECHANISM */}
        {reveal === "gatefold" && (
          <div className="relative w-full h-full rounded-2xl shadow-2xl border overflow-hidden" style={{ borderColor: goldAccentColor }}>
            {/* Card Content underneath */}
            <div className="absolute inset-0 bg-[#fdfbf7]">
              {renderCardContent()}
            </div>

            {/* Left 3D Door */}
            <motion.div
              className="absolute left-0 inset-y-0 w-1/2 rounded-l-2xl origin-left z-30 shadow-xl border-y border-l overflow-hidden"
              style={{
                backgroundColor: envelopeColor || primaryColor || "#4a0e17",
                backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "left center",
                borderColor: `${goldAccentColor}60`,
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0 }}
              animate={step >= 1 ? { rotateY: -140 } : { rotateY: 0 }}
              transition={transitionConfig}
            />

            {/* Right 3D Door */}
            <motion.div
              className="absolute right-0 inset-y-0 w-1/2 rounded-r-2xl origin-right z-30 shadow-xl border-y border-r overflow-hidden"
              style={{
                backgroundColor: envelopeColor || primaryColor || "#4a0e17",
                backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "right center",
                borderColor: `${goldAccentColor}60`,
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0 }}
              animate={step >= 1 ? { rotateY: 140 } : { rotateY: 0 }}
              transition={transitionConfig}
            />

            {/* Trigger Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              {renderTrigger()}
            </div>
          </div>
        )}

        {/* 3. SLIDE MECHANISM */}
        {reveal === "slide" && (
          <div className="relative w-full h-full rounded-2xl shadow-2xl border overflow-hidden" style={{ borderColor: goldAccentColor }}>
            <div className="absolute inset-0 bg-[#0d1527]">
              {renderCardContent()}
            </div>

            {/* Sliding Sleeve */}
            <AnimatePresence>
              {step === 0 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl backdrop-blur-md bg-stone-900/90 border-2 flex flex-col items-center justify-center p-6 z-30 shadow-2xl overflow-hidden"
                  style={{
                    borderColor: goldAccentColor,
                    backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  exit={
                    slideDir === "down"
                      ? { y: "115%", opacity: 0 }
                      : slideDir === "up"
                      ? { y: "-115%", opacity: 0 }
                      : slideDir === "right"
                      ? { x: "115%", opacity: 0 }
                      : { x: "-115%", opacity: 0 }
                  }
                  transition={transitionConfig}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    {renderTrigger()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 4. BOOK FLIP 3D MECHANISM */}
        {reveal === "book-flip" && (
          <div className="relative w-full h-full rounded-2xl shadow-2xl border overflow-hidden" style={{ borderColor: goldAccentColor }}>
            <div className="absolute inset-0 bg-[#fdfbf7]">
              {renderCardContent()}
            </div>

            {/* Book Cover Flip */}
            <motion.div
              className="absolute inset-0 rounded-2xl origin-left z-30 shadow-2xl border overflow-hidden flex flex-col items-center justify-center"
              style={{
                backgroundColor: envelopeColor || primaryColor || "#064e3b",
                backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderColor: goldAccentColor,
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0 }}
              animate={step >= 1 ? { rotateY: -160, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              transition={transitionConfig}
            >
              <div className="relative z-10 flex flex-col items-center">
                {renderTrigger()}
              </div>
            </motion.div>
          </div>
        )}

        {/* 5. DIRECT ZOOM & CINEMATIC REVEAL (FOR COMPLETE ARTWORK UPLOADS) */}
        {reveal === "direct-zoom" && (
          <div className="relative w-full h-full rounded-2xl shadow-2xl border overflow-hidden" style={{ borderColor: goldAccentColor }}>
            <motion.div
              className="w-full h-full"
              initial={{ scale: 0.9, opacity: 0.9 }}
              animate={step >= 1 ? { scale: 1.03, opacity: 1 } : { scale: 0.96, opacity: 0.95 }}
              transition={transitionConfig}
            >
              {renderCardContent()}
            </motion.div>

            {step === 0 && (
              <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                {renderTrigger()}
              </div>
            )}
          </div>
        )}

        {/* 6. BLOSSOM RADIAL REVEAL */}
        {reveal === "blossom" && (
          <div className="relative w-full h-full rounded-2xl shadow-2xl border overflow-hidden" style={{ borderColor: goldAccentColor }}>
            <div className="absolute inset-0 bg-[#fffdfa]">
              {renderCardContent()}
            </div>

            <AnimatePresence>
              {step === 0 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white/95 backdrop-blur-sm border flex flex-col items-center justify-center p-6 z-30 shadow-xl overflow-hidden"
                  style={{
                    borderColor: goldAccentColor,
                    backgroundImage: envelopeClosedImage ? `url(${envelopeClosedImage})` : undefined,
                    backgroundSize: "cover",
                  }}
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.35, opacity: 0, filter: "blur(6px)" }}
                  transition={transitionConfig}
                >
                  <div className="relative z-10 flex flex-col items-center">
                    {renderTrigger()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}
