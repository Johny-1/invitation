"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Heart,
  RotateCcw,
  Share2,
  CalendarPlus,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import { formatArabicDate, calculateCountdown } from "@/lib/utils";
import RsvpModal from "./RsvpModal";

interface InvitationDetailsProps {
  weddingDetails: WeddingDetails;
  design: DesignConfig;
  guestName?: string;
  onReplayAnimation?: () => void;
  invitationId?: string;
}

export default function InvitationDetails({
  weddingDetails,
  design,
  guestName,
  onReplayAnimation,
  invitationId = "demo",
}: InvitationDetailsProps) {
  const [countdown, setCountdown] = useState(
    calculateCountdown(weddingDetails.weddingDate, weddingDetails.weddingTime)
  );
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(
        calculateCountdown(weddingDetails.weddingDate, weddingDetails.weddingTime)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDetails.weddingDate, weddingDetails.weddingTime]);

  const { goldAccentColor, primaryColor, textColor, backgroundColor } = design;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `دعوة زفاف ${weddingDetails.groomName} & ${weddingDetails.brideName}`,
        text: `يسرنا دعوتكم لحضور حفل زفافنا ✨`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`حفل زفاف ${weddingDetails.groomName} & ${weddingDetails.brideName}`);
    const details = encodeURIComponent(`${weddingDetails.welcomeMessage}\nالمكان: ${weddingDetails.venueName}`);
    const location = encodeURIComponent(`${weddingDetails.venueName}, ${weddingDetails.venueAddress}`);
    
    // Create Google Calendar link
    const dateFormatted = weddingDetails.weddingDate.replace(/-/g, "");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T170000Z/${dateFormatted}T230000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl border text-center my-6 overflow-hidden"
      style={{
        backgroundColor: "rgba(10, 16, 20, 0.94)",
        borderColor: `${goldAccentColor || "#d4af37"}80`,
        boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px -5px ${goldAccentColor || "#d4af37"}30`,
        color: "#ffffff",
      }}
    >
      {/* Decorative Golden Ornate Corners */}
      <div
        className="absolute inset-3 border rounded-2xl pointer-events-none"
        style={{ borderColor: `${goldAccentColor}40` }}
      >
        <div
          className="absolute inset-1.5 border border-dashed rounded-xl opacity-40"
          style={{ borderColor: goldAccentColor }}
        />
      </div>

      {/* Top Replay & Share Bar */}
      <div className="relative z-10 flex items-center justify-between mb-6 pb-2 border-b border-amber-500/20">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-amber-200 text-xs border border-amber-400/20 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? "تم النسخ!" : "مشاركة"}</span>
        </button>

        {onReplayAnimation && (
          <button
            onClick={onReplayAnimation}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-amber-200 text-xs border border-amber-400/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الفتح</span>
          </button>
        )}
      </div>

      {/* Guest Name Greeting */}
      {guestName && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 mb-6 inline-block px-5 py-1.5 rounded-full backdrop-blur-md border shadow-inner"
          style={{
            backgroundColor: `${goldAccentColor}20`,
            borderColor: `${goldAccentColor}70`,
          }}
        >
          <span className="text-xs sm:text-sm font-semibold text-amber-200">
            الأعزاء / {guestName} 🌸
          </span>
        </motion.div>
      )}

      {/* Opening Header & Verse/Quote (100% Dynamic, only shown if configured) */}
      {(weddingDetails.openingHeader || weddingDetails.verseOrQuote) && (
        <div className="relative z-10 space-y-2 mb-6">
          {weddingDetails.openingHeader && (
            <p className="text-xs sm:text-sm font-serif text-amber-200/90 font-medium tracking-wide">
              {weddingDetails.openingHeader}
            </p>
          )}
          {weddingDetails.verseOrQuote && (
            <p
              className="text-xs sm:text-sm italic opacity-95 max-w-md mx-auto leading-relaxed px-4 font-serif"
              style={{ color: goldAccentColor || "#d4af37" }}
            >
              &quot;{weddingDetails.verseOrQuote}&quot;
            </p>
          )}
        </div>
      )}

      {/* Welcome & Parents Intro */}
      <div className="relative z-10 space-y-1 mb-6 text-sm sm:text-base text-stone-100 font-medium leading-relaxed max-w-lg mx-auto">
        <p className="leading-relaxed">{weddingDetails.welcomeMessage}</p>
        {(weddingDetails.groomParents || weddingDetails.brideParents) && (
          <div className="pt-2 text-xs text-amber-200/80 space-y-0.5">
            {weddingDetails.groomParents && <p>{weddingDetails.groomParents}</p>}
            {weddingDetails.brideParents && <p>{weddingDetails.brideParents}</p>}
          </div>
        )}
      </div>

      {/* Custom Card Artwork Preview if Uploaded */}
      {design.cardInsideImage && (
        <div className="relative z-10 my-4 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl group">
          <img
            src={design.cardInsideImage}
            alt="تصميم بطاقة الدعوة"
            className="w-full h-auto object-contain max-h-72 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
            <span className="text-[11px] text-amber-200 font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-400/30">
              تصميم كارت الزفاف الخاص 💍
            </span>
          </div>
        </div>
      )}

      {/* Couple Names (Huge Calligraphy) */}
      <div className="relative z-10 py-4 my-2">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-2"
            style={{
              color: goldAccentColor || "#d4af37",
              fontFamily: "var(--font-arabic, 'Amiri', serif)",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {weddingDetails.groomName}
          </h1>

          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1px] w-12 bg-amber-400/50" />
            <div className="p-2 rounded-full border border-amber-400/40 bg-amber-500/10">
              <Heart className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
            <div className="h-[1px] w-12 bg-amber-400/50" />
          </div>

          <h1
            className="text-3xl sm:text-5xl font-bold tracking-tight mt-2"
            style={{
              color: goldAccentColor || "#d4af37",
              fontFamily: "var(--font-arabic, 'Amiri', serif)",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {weddingDetails.brideName}
          </h1>
        </div>
      </div>

      {/* Date & Time Highlight */}
      <div className="relative z-10 my-6 inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-black/40 border border-amber-400/30 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{formatArabicDate(weddingDetails.weddingDate)}</span>
        </div>
        <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-amber-400/60" />
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>الساعة {weddingDetails.weddingTime}</span>
        </div>
      </div>

      {/* Live Countdown Timer */}
      <div className="relative z-10 my-6">
        <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>العد التنازلي ليوم الفرح</span>
          <Sparkles className="w-3.5 h-3.5" />
        </h4>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
          {[
            { label: "يوم", value: countdown.days },
            { label: "ساعة", value: countdown.hours },
            { label: "دقيقة", value: countdown.minutes },
            { label: "ثانية", value: countdown.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/50 border border-amber-500/20 backdrop-blur-sm"
            >
              <span className="text-xl sm:text-2xl font-bold text-amber-300">
                {item.value}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Venue & Location Section */}
      <div className="relative z-10 my-6 p-5 rounded-2xl bg-black/40 border border-amber-400/25 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/30 mb-2">
          <MapPin className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-amber-200 mb-1">
          {weddingDetails.venueName}
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 mb-4 max-w-md mx-auto">
          {weddingDetails.venueAddress}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={weddingDetails.googleMapsUrl || "https://maps.google.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition-all"
          >
            <Navigation className="w-4 h-4 text-stone-950" />
            <span>عرض الموقع على Google Maps</span>
          </a>

          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold transition-all"
          >
            <CalendarPlus className="w-4 h-4 text-amber-300" />
            <span>إضافة للتقويم</span>
          </button>
        </div>
      </div>

      {/* Event Schedule (Timeline) if available */}
      {weddingDetails.schedule && weddingDetails.schedule.length > 0 && (
        <div className="relative z-10 my-6 p-5 rounded-2xl bg-black/30 border border-amber-400/20 text-right">
          <h4 className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-4 text-center">
            برنامج الحفل ⏳
          </h4>
          <div className="space-y-3">
            {weddingDetails.schedule.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-400/30 text-[11px] font-bold text-amber-300 whitespace-nowrap">
                  {item.time}
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">
                    {item.title}
                  </h5>
                  {item.description && (
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing notes */}
      {weddingDetails.notes && (
        <p className="relative z-10 text-xs text-amber-200/80 my-4 italic">
          {weddingDetails.notes}
        </p>
      )}

      {/* BIG RSVP ACTION BUTTON */}
      <div className="relative z-10 mt-8 pt-4 border-t border-amber-500/20 flex flex-col items-center gap-3">
        <button
          onClick={() => setIsRsvpOpen(true)}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer animate-glow"
        >
          <CheckCircle2 className="w-5 h-5 text-stone-950" />
          <span>تأكيد الحضور (RSVP) 💌</span>
        </button>

        <p className="text-[11px] text-stone-400">
          حضوركم يسعدنا ويكتمل به سرورنا • نسعد بتأكيد حضوركم
        </p>
      </div>

      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        invitationId={invitationId}
        defaultGuestName={guestName}
        goldColor={goldAccentColor}
      />
    </motion.div>
  );
}
