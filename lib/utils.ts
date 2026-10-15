import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatArabicDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function calculateCountdown(targetDateStr: string, timeStr?: string) {
  try {
    const target = new Date(`${targetDateStr}T18:00:00`);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isPassed: false };
  } catch {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: false };
  }
}

export function generateWhatsAppMessage(
  guestName: string,
  groomName: string,
  brideName: string,
  inviteUrl: string
): string {
  const text = `السلام عليكم ورحمة الله وبركاته،\nالأعزاء / ${guestName || "الضيوف الكرام"} 🌸\n\nيسرنا ويسعدنا دعوتكم لحضور حفل زفاف:\n🤵 ${groomName} & 👰 ${brideName}\n\nلمشاهدة بطاقة الدعوة التفاعلية وموقع القاعة وتأكيد الحضور:\n🔗 ${inviteUrl}\n\nحضوركم يسعدنا ويكتمل به سرورنا! ✨`;
  return encodeURIComponent(text);
}
