"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Check, Users, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitationId: string;
  defaultGuestName?: string;
  goldColor?: string;
}

export default function RsvpModal({
  isOpen,
  onClose,
  invitationId,
  defaultGuestName = "",
  goldColor = "#d4af37",
}: RsvpModalProps) {
  const [guestName, setGuestName] = useState(defaultGuestName);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"attending" | "declined">("attending");
  const [companionsCount, setCompanionsCount] = useState(0);
  const [wishes, setWishes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg("يرجى إدخال اسمك الكريم");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/rsvp/${invitationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          phone: phone.trim(),
          status,
          companionsCount: status === "attending" ? companionsCount : 0,
          wishes: wishes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "تعذر حفظ تأكيد الحضور");
      }

      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء الإرسال");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-stone-900 border rounded-3xl p-6 shadow-2xl text-stone-100 overflow-hidden"
          style={{ borderColor: `${goldColor}60` }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2">
                  <Heart className="w-6 h-6 text-amber-400 fill-amber-400/30" />
                </div>
                <h3 className="text-xl font-bold text-amber-300">
                  تأكيد الحضور (RSVP)
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  يسعدنا مشاركتكم فرحتنا وتأكيد حضوركم الكريم
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                {/* Status selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("attending")}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                      status === "attending"
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-950"
                        : "bg-stone-800/60 border-stone-700 text-stone-400 hover:border-stone-600"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>يشرفني الحضور 💍</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("declined")}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                      status === "declined"
                        ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-md shadow-rose-950"
                        : "bg-stone-800/60 border-stone-700 text-stone-400 hover:border-stone-600"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    <span>أعتذر عن الحضور 🌸</span>
                  </button>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="أدخل اسمك الكريم"
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-right"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    رقم الهاتف (اختياري)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-right"
                  />
                </div>

                {/* Companions Count (if attending) */}
                {status === "attending" && (
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      عدد المرافقين الإضافيين
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex items-center justify-between bg-stone-800 border border-stone-700 rounded-xl p-1.5">
                        <button
                          type="button"
                          onClick={() => setCompanionsCount(Math.max(0, companionsCount - 1))}
                          className="w-8 h-8 rounded-lg bg-stone-700 text-white font-bold flex items-center justify-center hover:bg-stone-600"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-stone-400" />
                          {companionsCount === 0 ? "أنا فقط (بدون مرافقين)" : `${companionsCount} مرافق`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCompanionsCount(companionsCount + 1)}
                          className="w-8 h-8 rounded-lg bg-stone-700 text-white font-bold flex items-center justify-center hover:bg-stone-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wishes / Note */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    تهنئة للعروسين 💖 (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder="بارك الله لكما وبارك عليكما..."
                    className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-right resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>جاري التأكيد...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-stone-950" />
                      <span>إرسال التأكيد</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mb-3 text-emerald-400">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                تم تسجيل ردك بنجاح! ✨
              </h3>
              <p className="text-sm text-stone-300 mb-6">
                {status === "attending"
                  ? "شكراً لك، ننتظر تشريفك ومشاركتنا فرحة العمر بكل محبة وسرور 💖"
                  : "شكراً لاهتمامك وتهنئتك الرقيقة، ونتمنى لكم دوام الأفراح 🌸"}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white text-sm font-semibold transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
