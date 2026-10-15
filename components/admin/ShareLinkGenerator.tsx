"use client";

import React, { useState } from "react";
import { Copy, Check, Send, Sparkles, UserCheck, ExternalLink } from "lucide-react";
import { generateWhatsAppMessage } from "@/lib/utils";

interface ShareLinkGeneratorProps {
  invitationIdOrSlug: string;
  groomName: string;
  brideName: string;
}

export default function ShareLinkGenerator({
  invitationIdOrSlug,
  groomName,
  brideName,
}: ShareLinkGeneratorProps) {
  const [guestName, setGuestName] = useState("");
  const [copiedBase, setCopiedBase] = useState(false);
  const [copiedCustom, setCopiedCustom] = useState(false);

  // In client, get base URL safely
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const baseInviteUrl = `${origin}/invite/${invitationIdOrSlug}`;
  
  const customInviteUrl = guestName.trim()
    ? `${baseInviteUrl}?to=${encodeURIComponent(guestName.trim())}`
    : baseInviteUrl;

  const handleCopyBase = () => {
    navigator.clipboard.writeText(baseInviteUrl);
    setCopiedBase(true);
    setTimeout(() => setCopiedBase(false), 2000);
  };

  const handleCopyCustom = () => {
    navigator.clipboard.writeText(customInviteUrl);
    setCopiedCustom(true);
    setTimeout(() => setCopiedCustom(false), 2000);
  };

  const handleWhatsAppSend = () => {
    const text = generateWhatsAppMessage(
      guestName.trim(),
      groomName,
      brideName,
      customInviteUrl
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-6 text-right">
      {/* 1. Base Public Link */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الرابط العام للدعوة (بدون اسم محدد)</span>
          </span>
          <a
            href={baseInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>فتح الدعوة</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={baseInviteUrl}
            className="flex-1 px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 select-all font-mono"
            dir="ltr"
          />
          <button
            onClick={handleCopyBase}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-colors"
          >
            {copiedBase ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedBase ? "تم النسخ" : "نسخ"}</span>
          </button>
        </div>
      </div>

      {/* 2. Personalized Guest Link Generator */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>توليد رابط مخصص باسم الضيف وإرساله بالواتساب</span>
          </h4>
          <p className="text-xs text-stone-400 mt-1">
            اكتب اسم الضيف لتظهر له عبارة ترحيب خاصة به أعلى الكارت ورسالة واتساب مهندمة
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">
              اسم الضيف أو العائلة
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="مثال: أ/ محمد عبد الرحمن وعائلته الكريمة"
              className="w-full px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-right"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
            <input
              type="text"
              readOnly
              value={customInviteUrl}
              className="w-full flex-1 px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-amber-200 select-all font-mono"
              dir="ltr"
            />

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyCustom}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700 transition-colors"
              >
                {copiedCustom ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCustom ? "تم النسخ" : "نسخ الرابط"}</span>
              </button>

              <button
                onClick={handleWhatsAppSend}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال عبر WhatsApp 💬</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live WhatsApp text preview */}
        <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1">
          <span className="text-[11px] font-bold text-stone-300 block">
            معاينة نص الرسالة التلقائي للواتساب:
          </span>
          <p className="whitespace-pre-line font-sans text-stone-300/90 leading-relaxed text-[11px]">
            {decodeURIComponent(
              generateWhatsAppMessage(guestName, groomName, brideName, customInviteUrl)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
