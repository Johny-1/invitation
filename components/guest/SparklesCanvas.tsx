"use client";

import React, { useEffect, useRef } from "react";

interface SparklesCanvasProps {
  type: "gold-sparkles" | "rose-petals" | "stars" | "floating-hearts" | "none";
  speed?: "slow" | "normal" | "fast";
  density?: "low" | "medium" | "high";
}

export default function SparklesCanvas({
  type,
  speed = "normal",
  density = "medium",
}: SparklesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (type === "none") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const baseCount = type === "rose-petals" ? 25 : type === "floating-hearts" ? 20 : 45;
    const densityMultiplier = density === "low" ? 0.6 : density === "high" ? 1.6 : 1.0;
    const count = Math.round(baseCount * densityMultiplier);

    const speedMultiplier = speed === "slow" ? 0.5 : speed === "fast" ? 1.8 : 1.0;

    const particles: any[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === "rose-petals"
            ? Math.random() * 12 + 8
            : type === "floating-hearts"
            ? Math.random() * 10 + 7
            : Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * (type === "rose-petals" ? 1.2 : 0.6) * speedMultiplier,
        speedY:
          (type === "floating-hearts"
            ? -(Math.random() * 1.2 + 0.5)
            : type === "rose-petals"
            ? Math.random() * 1.4 + 0.7
            : (Math.random() - 0.5) * 0.8) * speedMultiplier,
        opacity: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2 * speedMultiplier,
        color:
          type === "rose-petals"
            ? `rgba(${220 + Math.floor(Math.random() * 35)}, ${50 + Math.floor(Math.random() * 60)}, ${80 + Math.floor(Math.random() * 50)}, ${Math.random() * 0.5 + 0.4})`
            : type === "floating-hearts"
            ? `rgba(${230 + Math.floor(Math.random() * 25)}, ${90 + Math.floor(Math.random() * 70)}, ${120 + Math.floor(Math.random() * 50)}, ${Math.random() * 0.5 + 0.35})`
            : type === "stars"
            ? `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`
            : `rgba(${212 + Math.floor(Math.random() * 40)}, ${175 + Math.floor(Math.random() * 40)}, ${55 + Math.floor(Math.random() * 40)}, ${Math.random() * 0.8 + 0.2})`,
      });
    }

    const drawPetal = (x: number, y: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size / 2, -size / 2, size, 0, 0, size);
      ctx.bezierCurveTo(-size, 0, -size / 2, -size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (x: number, y: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      // bottom right curve
      ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (x: number, y: number, size: number, opacity: number, color: string) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (type === "floating-hearts") {
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (type === "rose-petals") {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color);
        } else if (type === "floating-hearts") {
          drawHeart(p.x, p.y, p.size, p.rotation, p.color);
        } else {
          drawSparkle(p.x, p.y, p.size, p.opacity, p.color);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, speed, density]);

  if (type === "none") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
