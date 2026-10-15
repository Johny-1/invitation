"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Monitor, RotateCcw } from "lucide-react";
import { DesignConfig, WeddingDetails } from "@/types/invitation";
import AnimationContainer from "../animations/AnimationContainer";
import SparklesCanvas from "../guest/SparklesCanvas";

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: DesignConfig;
  weddingDetails: WeddingDetails;
}

export default function LivePreviewModal({
  isOpen,
  onClose,
  design,
  weddingDetails,
}: LivePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<"mobile" | "fullscreen">("mobile");
  const [previewKey, setPreviewKey] = useState(0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full h-full max-w-5xl bg-stone-950 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-right"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                onClick={() => setPreviewKey((k) => k + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة التجربة</span>
              </button>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => setDeviceMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  deviceMode === "mobile"
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>شاشة الهاتف (Mobile)</span>
              </button>
              <button
                onClick={() => setDeviceMode("fullscreen")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  deviceMode === "fullscreen"
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>شاشة كاملة (Desktop)</span>
              </button>
            </div>

            <div className="text-right">
              <h3 className="text-sm font-bold text-white">
                المعاينة الحية وتجربة الدوسات ✨
              </h3>
              <p className="text-[11px] text-stone-400">
                اضغط على العناصر كما سيفعل الضيف تماماً
              </p>
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 bg-stone-950 relative">
            <SparklesCanvas type={design.particlesType} />

            {deviceMode === "mobile" ? (
              /* Mobile Phone Mockup Frame */
              <div className="relative w-[375px] h-[720px] max-h-[85vh] bg-stone-900 rounded-[44px] border-[6px] border-stone-700 shadow-2xl overflow-y-auto flex flex-col relative my-auto">
                {/* iPhone Dynamic Island notch */}
                <div className="sticky top-2 z-50 w-28 h-4 bg-black rounded-full mx-auto" />
                
                <div className="flex-1 flex flex-col relative" key={previewKey}>
                  <AnimationContainer
                    design={design}
                    weddingDetails={weddingDetails}
                    guestName="أ/ ضيف تجريبي"
                    isPreview={true}
                  />
                </div>
              </div>
            ) : (
              /* Full Screen View */
              <div className="w-full h-full max-w-4xl relative" key={previewKey}>
                <AnimationContainer
                  design={design}
                  weddingDetails={weddingDetails}
                  guestName="أ/ ضيف تجريبي"
                  isPreview={true}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
