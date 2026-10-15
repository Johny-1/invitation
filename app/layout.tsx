import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منصة دعوات الزفاف التفاعلية | Interactive Wedding Invitations",
  description: "منصة فاخرة لإنشاء وتخصيص دعوات الزفاف التفاعلية بالخطوات مع لوحة تحكم ذكية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-stone-950 text-stone-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
