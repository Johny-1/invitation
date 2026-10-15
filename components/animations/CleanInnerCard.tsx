"use client";

import React from "react";
import { motion } from "framer-motion";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import { Heart, Sparkles } from "lucide-react";

interface CleanInnerCardProps {
  cardInsideImage?: string;
  weddingDetails: WeddingDetails;
  design: DesignConfig;
  guestName?: string;
  isRevealed?: boolean;
  onNextStep: () => void;
  fontFamilyClass?: string;
}

export default function CleanInnerCard({
  cardInsideImage,
  weddingDetails,
  design,
  guestName,
  isRevealed = false,
  onNextStep,
  fontFamilyClass,
}: CleanInnerCardProps) {
  const { primaryColor, goldAccentColor, textColor } = design;

  // Case 1: Custom Uploaded Design Graphic
  // Display the user's design 100% clean, crisp, unobstructed with ZERO dark boxes!
  if (cardInsideImage) {
    return (
      <div
        onClick={isRevealed ? onNextStep : undefined}
        className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden rounded-2xl group cursor-pointer"
      >
        {/* Crisp, Pristine Uploaded Design Card */}
        <img
          src={cardInsideImage}
          alt="بطاقة الزفاف"
          className="w-full h-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
        />

        {/* Personalized Guest Badge (Floats at the top without covering the main design) */}
        {guestName && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-amber-500 text-stone-950 font-bold text-xs rounded-full shadow-lg backdrop-blur-md border border-amber-300 z-30 whitespace-nowrap">
            الأعزاء / {guestName} 🌸
          </div>
        )}

        {/* Bottom Action Prompt (Floats subtly at the bottom edge) */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, duration: 1.8, repeatType: "reverse" }}
            onClick={(e) => {
              e.stopPropagation();
              onNextStep();
            }}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 rounded-full text-xs font-black shadow-gold-sm flex items-center gap-1.5 z-30 whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
          >
            <span>انقر لمشاهدة التفاصيل والموقع 💍</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </div>
    );
  }

  // Case 2: Standard Typographic Card (When no custom design image is uploaded)
  return (
    <div
      onClick={isRevealed ? onNextStep : undefined}
      className="relative w-full h-full flex flex-col items-center justify-between p-6 text-center select-none overflow-hidden rounded-2xl cursor-pointer"
      style={{
        backgroundColor: "#fdfbf7",
        color: textColor || "#1c1917",
      }}
    >
      {/* Golden Ornamental Frame */}
      <div
        className="absolute inset-2 border rounded-xl pointer-events-none z-10"
        style={{ borderColor: `${goldAccentColor}80` }}
      >
        <div
          className="absolute inset-1 border border-dashed rounded-lg opacity-50"
          style={{ borderColor: goldAccentColor }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-bold"
          style={{ color: goldAccentColor }}
        >
          WEDDING INVITATION
        </span>
        <div className="w-12 h-0.5 my-1" style={{ backgroundColor: goldAccentColor }} />
        {weddingDetails.welcomeMessage ? (
          <p className="text-xs font-serif text-stone-600 line-clamp-1 px-4">
            {weddingDetails.welcomeMessage}
          </p>
        ) : (
          <p className="text-xs font-serif text-stone-500">
            دعوة زفاف خاصة
          </p>
        )}
      </div>

      {/* Couple Names */}
      <div className="relative z-10 my-auto py-2">
        {guestName && (
          <div className="mb-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 inline-block">
            <span className="text-xs text-amber-900 font-medium">الأعزاء / {guestName}</span>
          </div>
        )}
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${fontFamilyClass || ""}`}
          style={{
            color: primaryColor,
            fontFamily: "var(--font-arabic, 'Amiri', serif)",
          }}
        >
          {weddingDetails.groomName}
        </h2>
        <div className="flex items-center justify-center gap-2 my-0.5">
          <div className="h-[1px] w-6" style={{ backgroundColor: goldAccentColor }} />
          <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
          <div className="h-[1px] w-6" style={{ backgroundColor: goldAccentColor }} />
        </div>
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${fontFamilyClass || ""}`}
          style={{
            color: primaryColor,
            fontFamily: "var(--font-arabic, 'Amiri', serif)",
          }}
        >
          {weddingDetails.brideName}
        </h2>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-1 flex flex-col items-center">
        <span className="text-xs font-semibold" style={{ color: goldAccentColor }}>
          {weddingDetails.weddingDate}
        </span>
        <span className="text-[11px] text-stone-600 mt-0.5">
          {weddingDetails.venueName}
        </span>

        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="mt-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5"
          >
            <span>انقر للانتقال لتفاصيل الحفل</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
