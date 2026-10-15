"use client";

import React from "react";
import { DesignConfig, BackgroundConfig, BackgroundPatternType } from "@/types/invitation";
import { DEFAULT_BACKGROUND_CONFIG } from "@/lib/presets";
import SparklesCanvas from "./SparklesCanvas";

interface AtmosphereBackgroundProps {
  design: DesignConfig;
  className?: string;
  children?: React.ReactNode;
}

export function getPatternStyle(pattern?: BackgroundPatternType, opacity = 0.15): React.CSSProperties {
  const op = Math.max(0, Math.min(1, opacity));
  
  switch (pattern) {
    case "stars":
      return {
        backgroundImage: `
          radial-gradient(1px 1px at 25px 25px, #ffffff 100%, transparent 0),
          radial-gradient(1.5px 1.5px at 75px 60px, #d4af37 100%, transparent 0),
          radial-gradient(1px 1px at 120px 40px, #ffffff 100%, transparent 0),
          radial-gradient(1px 1px at 180px 100px, #e6c666 100%, transparent 0)
        `,
        backgroundSize: "200px 200px",
        opacity: op,
      };
    case "lattice":
      return {
        backgroundImage: `
          linear-gradient(45deg, #d4af37 10%, transparent 10%, transparent 90%, #d4af37 90%),
          linear-gradient(135deg, #d4af37 10%, transparent 10%, transparent 90%, #d4af37 90%)
        `,
        backgroundSize: "28px 28px",
        opacity: op,
      };
    case "floral":
      return {
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #d4af37 1.5px, transparent 1.5px),
          radial-gradient(circle at 0 0, #d4af37 1.5px, transparent 1.5px)
        `,
        backgroundSize: "22px 22px",
        opacity: op,
      };
    case "geometric":
      return {
        backgroundImage: `
          linear-gradient(to right, #d4af37 1px, transparent 1px),
          linear-gradient(to bottom, #d4af37 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
        opacity: op,
      };
    case "dots":
      return {
        backgroundImage: "radial-gradient(circle at center, #d4af37 1.2px, transparent 1.2px)",
        backgroundSize: "20px 20px",
        opacity: op,
      };
    case "clean":
    case "none":
      return {
        display: "none",
      };
    case "damask":
    default:
      return {
        backgroundImage: "radial-gradient(circle at center, #d4af37 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        opacity: op,
      };
  }
}

export default function AtmosphereBackground({
  design,
  className = "",
  children,
}: AtmosphereBackgroundProps) {
  const bgConfig: BackgroundConfig = design.backgroundConfig || {
    ...DEFAULT_BACKGROUND_CONFIG,
    solidColor: design.backgroundColor || "#031d16",
    gradientFrom: design.primaryColor || "#064e3b",
    gradientTo: design.backgroundColor || "#010f0b",
    pattern: design.backgroundPattern || "damask",
    bgCustomImage: design.bgCustomImage,
  };

  // Base background styling (Gradient or Solid)
  let baseStyle: React.CSSProperties = {
    backgroundColor: bgConfig.solidColor || design.backgroundColor || "#031d16",
  };

  if (bgConfig.type === "gradient") {
    const from = bgConfig.gradientFrom || "#064e3b";
    const via = bgConfig.gradientVia;
    const to = bgConfig.gradientTo || "#010f0b";
    const angle = bgConfig.gradientAngle ?? 135;

    if (bgConfig.gradientType === "radial") {
      baseStyle = {
        background: via
          ? `radial-gradient(circle at 50% 35%, ${from} 0%, ${via} 50%, ${to} 100%)`
          : `radial-gradient(circle at 50% 35%, ${from} 0%, ${to} 100%)`,
      };
    } else {
      baseStyle = {
        background: via
          ? `linear-gradient(${angle}deg, ${from} 0%, ${via} 50%, ${to} 100%)`
          : `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`,
      };
    }
  } else if (bgConfig.type === "solid") {
    baseStyle = {
      backgroundColor: bgConfig.solidColor || design.backgroundColor || "#031d16",
    };
  } else if (bgConfig.type === "image") {
    baseStyle = {
      backgroundColor: bgConfig.solidColor || "#020d09",
    };
  }

  const customImage = bgConfig.bgCustomImage || design.bgCustomImage;
  const imageOpacity = bgConfig.bgImageOpacity ?? 0.25;
  const imageBlur = bgConfig.bgImageBlur ?? 0;

  const patternType = bgConfig.pattern || design.backgroundPattern || "damask";
  const patternOpacity = bgConfig.patternOpacity ?? 0.15;

  const glowColor = bgConfig.ambientGlowColor || "#d4af37";
  const glowIntensity = bgConfig.ambientGlowIntensity ?? 0.4;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={baseStyle}
    >
      {/* Layer 1: Custom Uploaded Background Image (if configured) */}
      {customImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-700"
          style={{
            backgroundImage: `url(${customImage})`,
            opacity: imageOpacity,
            filter: imageBlur > 0 ? `blur(${imageBlur}px)` : undefined,
            transform: imageBlur > 0 ? "scale(1.05)" : undefined, // prevents edge blur clipping
          }}
        />
      )}

      {/* Layer 2: Ambient Card Aura Glow behind the center invitation */}
      {glowIntensity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${glowColor} 0%, transparent 68%)`,
            opacity: glowIntensity * 0.45,
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* Layer 3: Background Patterns */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={getPatternStyle(patternType, patternOpacity)}
      />

      {/* Layer 4: Floating Atmospheric Particles Canvas */}
      <SparklesCanvas
        type={design.particlesType || "gold-sparkles"}
        speed={design.particlesSpeed || "normal"}
        density={design.particlesDensity || "medium"}
      />

      {/* Inner Content (Animation Container, etc.) */}
      {children}
    </div>
  );
}
