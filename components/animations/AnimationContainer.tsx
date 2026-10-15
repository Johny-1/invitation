"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import EnvelopeWaxPreset from "./EnvelopeWaxPreset";
import GatefoldPreset from "./GatefoldPreset";
import ModernSlidePreset from "./ModernSlidePreset";
import FloralBlossomPreset from "./FloralBlossomPreset";
import CustomMotionPreset from "./CustomMotionPreset";
import InvitationDetails from "../guest/InvitationDetails";
import { Sparkles, RotateCcw } from "lucide-react";

interface AnimationContainerProps {
  design: DesignConfig;
  weddingDetails: WeddingDetails;
  guestName?: string;
  isPreview?: boolean;
  onOpenComplete?: () => void;
  invitationId?: string;
}

export default function AnimationContainer({
  design,
  weddingDetails,
  guestName,
  isPreview = false,
  onOpenComplete,
  invitationId,
}: AnimationContainerProps) {
  const [step, setStep] = useState(0);
  const [isOpenedFully, setIsOpenedFully] = useState(false);

  const getPresetMaxSteps = () => {
    if (design.animationPreset === "custom-studio") {
      return design.motionConfig?.stepsCount || 3;
    }
    switch (design.animationPreset) {
      case "royal-wax-envelope":
        return 3;
      case "luxury-gatefold":
        return 3;
      case "modern-frosted-slide":
        return 2;
      case "book-flip-3d":
        return 2;
      case "direct-fade-zoom":
        return 1;
      case "floral-blossom":
        return 2;
      default:
        return 3;
    }
  };

  const getCurrentStepPrompt = () => {
    if (design.animationPreset === "royal-wax-envelope") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "المس الختم الشمعي لفك الختم 👑";
      if (step === 1) return design.stepDescriptions?.step2Prompt || "اضغط لفتح مظروف الزفاف ✉️";
      return design.stepDescriptions?.step3Prompt || "انقر للدخول لتفاصيل الحفل والخريطة ✨";
    } else if (design.animationPreset === "luxury-gatefold") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "المس الشريط الحريري لفك العقدة 🎀";
      if (step === 1) return design.stepDescriptions?.step2Prompt || "افتح بوابتي القصر لمشاهدة الكارت 🏰";
      return design.stepDescriptions?.step3Prompt || "انقر للدخول لتفاصيل الحفل 💖";
    } else if (design.animationPreset === "modern-frosted-slide") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "انقر لسحب الغلاف الفاخر 💫";
      return design.stepDescriptions?.step2Prompt || "المس البطاقة للكشف عن التفاصيل 📜";
    } else if (design.animationPreset === "book-flip-3d") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "انقر لفتح دفتر الزفاف الملكي 📖";
      return design.stepDescriptions?.step2Prompt || "المس الكارت لمشاهدة التفاصيل الكاملة ✨";
    } else if (design.animationPreset === "direct-fade-zoom") {
      return design.stepDescriptions?.step1Prompt || "المس الكارت للبدء وتكبير التفاصيل 💎";
    } else if (design.animationPreset === "floral-blossom") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "انقر لتفتّح باقة الزهور 🌸";
      return design.stepDescriptions?.step2Prompt || "المس الكارت للبدء ورؤية التفاصيل ✨";
    } else if (design.animationPreset === "custom-studio") {
      if (step === 0) return design.stepDescriptions?.step1Prompt || "المس للتفاعل وفتح الكارت ✨";
      if (step === 1) return design.stepDescriptions?.step2Prompt || "اضغط للكشف عن البطاقة 📜";
      return design.stepDescriptions?.step3Prompt || "انقر للدخول لتفاصيل الحفل والخريطة 💍";
    }
    return "اضغط للمتابعة 👈";
  };

  const confettiType = design.motionConfig?.confettiType || (design.particlesType === "rose-petals" ? "petals" : "gold");

  const triggerStepConfetti = () => {
    if (confettiType === "none") return;
    try {
      const colors =
        confettiType === "petals"
          ? ["#f43f5e", "#fb7185", "#fda4af", "#d4af37"]
          : confettiType === "stars"
          ? ["#ffffff", "#e0e7ff", "#fef08a", "#d4af37"]
          : ["#d4af37", "#f59e0b", "#fbbf24", "#ffffff"];

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });
    } catch {}
  };

  const triggerGrandConfetti = () => {
    if (confettiType === "none") return;
    try {
      const end = Date.now() + 1.2 * 1000;
      const colors =
        confettiType === "petals"
          ? ["#f43f5e", "#fb7185", "#fda4af", "#d4af37", "#ffffff"]
          : ["#d4af37", "#b45309", "#f59e0b", "#ffffff", "#f43f5e"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  };

  const handleNextStep = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:play-audio"));
    }
    const max = getPresetMaxSteps();
    const next = step + 1;

    if (next < max) {
      setStep(next);
      triggerStepConfetti();
    } else {
      setStep(max);
      triggerGrandConfetti();
      setTimeout(() => {
        setIsOpenedFully(true);
        if (onOpenComplete) onOpenComplete();
      }, 400);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsOpenedFully(false);
  };

  const renderPreset = () => {
    const props = {
      step,
      onNextStep: handleNextStep,
      design,
      weddingDetails,
      guestName,
      isPreview,
    };

    switch (design.animationPreset) {
      case "custom-studio":
        return <CustomMotionPreset {...props} />;
      case "book-flip-3d":
        return (
          <CustomMotionPreset
            {...props}
            design={{
              ...design,
              motionConfig: {
                revealMechanism: "book-flip",
                triggerType: design.motionConfig?.triggerType || "wax-seal",
                speed: design.motionConfig?.speed || "normal",
                physics: design.motionConfig?.physics || "smooth",
                stepsCount: 2,
              },
            }}
          />
        );
      case "direct-fade-zoom":
        return (
          <CustomMotionPreset
            {...props}
            design={{
              ...design,
              motionConfig: {
                revealMechanism: "direct-zoom",
                triggerType: design.motionConfig?.triggerType || "wax-seal",
                speed: design.motionConfig?.speed || "normal",
                physics: design.motionConfig?.physics || "smooth",
                stepsCount: 1,
              },
            }}
          />
        );
      case "royal-wax-envelope":
        return <EnvelopeWaxPreset {...props} />;
      case "luxury-gatefold":
        return <GatefoldPreset {...props} />;
      case "modern-frosted-slide":
        return <ModernSlidePreset {...props} />;
      case "floral-blossom":
        return <FloralBlossomPreset {...props} />;
      default:
        return <CustomMotionPreset {...props} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
      {/* Top Controls / Preview Banner */}
      {isPreview && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md text-amber-300 text-xs rounded-full border border-amber-400/40 hover:bg-black/80 transition-all shadow-lg cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التجربة</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {!isOpenedFully ? (
        <div className="w-full flex flex-col items-center justify-center animate-fade-in my-auto">
          {/* Preset Display */}
          {renderPreset()}

          {/* Direct Interactive Action Button */}
          <div className="mt-4 flex flex-col items-center gap-2 z-50">
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-black text-xs shadow-gold-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer animate-glow"
            >
              <span>{getCurrentStepPrompt()}</span>
              <Sparkles className="w-4 h-4 text-stone-950 stroke-[2.5]" />
            </button>

            {/* Interactive Steps Progress Indicator */}
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-400/20">
              {Array.from({ length: getPresetMaxSteps() }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx <= step
                      ? "w-5 bg-gradient-to-r from-amber-400 to-amber-600 shadow-sm"
                      : "w-1.5 bg-zinc-600/50"
                  }`}
                />
              ))}
              <span className="text-[10px] text-amber-200/90 mr-1.5 font-medium">
                خطوة {step + 1} من {getPresetMaxSteps()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl animate-fade-in my-8">
          <InvitationDetails
            weddingDetails={weddingDetails}
            design={design}
            guestName={guestName}
            onReplayAnimation={handleReset}
            invitationId={invitationId}
          />
        </div>
      )}
    </div>
  );
}
