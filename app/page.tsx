import Link from "next/link";
import { Sparkles, Heart, PlusCircle, ArrowLeft, Mail, ShieldCheck, Share2 } from "lucide-react";
import { getInvitations } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const invitations = getInvitations();
  const sample = invitations[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-black text-stone-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-6 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400/30" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-wide">منصة دعوات الزفاف التفاعلية</span>
            <span className="block text-[10px] text-amber-300/80">Interactive Wedding Invitations Studio</span>
          </div>
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-stone-950" />
          <span>لوحة تحكم الأدمن 👑</span>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-12 text-center z-10 my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>أنيميشن تفاعلي بالخطوات واللمس • بدون فيديو</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">
          اصنع دعوة زفاف ملكية
          <span className="block gold-shimmer-text mt-2 font-serif">
            تُفتح باللمس خطوة بخطوة ✨
          </span>
        </h1>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10">
          لوحة تحكم إدارية سهلة لرفع تصاميمك المخصصة (الظرف المفتوح والمقفول والختم الشمعي)، واختيار أفضل طريقة للأنيميشن التفاعلي، وتوليد روابط مخصصة للمعازيم مع تأكيد الحضور (RSVP).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {sample && (
            <Link
              href={`/invite/${sample.slug || sample.id}`}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-stone-950" />
              <span>تجربة فتح الدعوة التفاعلية ✉️</span>
            </Link>
          )}

          <Link
            href="/admin/create"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-400/30 font-bold text-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>إنشاء دعوة جديدة الآن</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-right">
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              👑
            </div>
            <h3 className="text-sm font-bold text-white mb-1">4 أنماط أنيميشن تفاعلية</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              الظرف الملكي مع الختم الشمعي، بوابة القصر ثلاثية الأبعاد، السحب العصري، وتفتّح الزهور.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">توليد روابط الواتساب بالأسماء</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              اكتب اسم الضيف لتوليد رابط ورسالة واتساب مجهزة خصيصاً له باسمه مع دعاء وتهنئة.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              💌
            </div>
            <h3 className="text-sm font-bold text-white mb-1">تأكيد الحضور (RSVP) والموقع</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              المعازيم يؤكدون حضورهم وعدد مرافقيهم وتهانيهم مع زر مباشر للموقع على خرائط جوجل.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-6 py-6 border-t border-stone-800/80 text-center text-xs text-stone-500 z-10">
        منصة دعوات الأفراح التفاعلية الذكية • تجربة فاخرة تليق بأجمل ليالي العمر ✨
      </footer>
    </div>
  );
}
