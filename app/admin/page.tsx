import React from "react";
import Link from "next/link";
import { getInvitations } from "@/lib/db";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  ExternalLink,
  Sparkles,
  Share2,
  Heart,
  Calendar,
  Layers,
  Search,
  Check,
  Send,
} from "lucide-react";
import { formatArabicDate } from "@/lib/utils";
import StatsOverview from "@/components/admin/StatsOverview";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const invitations = getInvitations();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Luxury Top Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900/95 to-amber-950/30 border border-amber-500/20 shadow-glass relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 shadow-gold-md">
              <Sparkles className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>لوحة تحكم دعوات الزفاف الملكية</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  الإصدار الذكي 2.0
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                صمّم دعوات تفاعلية تفتح بالخطوات واللمس، وتابع تأكيدات الحضور وتوليد روابط الواتساب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 z-10 w-full md:w-auto justify-end">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-all border border-stone-700/60"
            >
              الصفحة الرئيسية
            </Link>
            <Link
              href="/admin/create"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:brightness-110 text-stone-950 text-xs font-black shadow-gold-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-stone-950 stroke-[3]" />
              <span>إنشاء دعوة جديدة ✉️</span>
            </Link>
          </div>
        </header>

        {/* KPI Stats Overview */}
        <StatsOverview invitations={invitations} />

        {/* Invitations Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black text-white">
                قائمة بطاقات الدعوة النشطة ({invitations.length})
              </h2>
            </div>

            <Link
              href="/admin/create"
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة كارت فرح جديد</span>
            </Link>
          </div>

          {invitations.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 space-y-3">
              <Heart className="w-12 h-12 text-stone-600 mx-auto" />
              <h3 className="text-base font-bold text-stone-300">لا توجد دعوات منشأة حتى الآن</h3>
              <p className="text-xs text-stone-500">ابدأ بإنشاء أول دعوة فرح تفاعلية في ثوانٍ معدودة</p>
              <Link
                href="/admin/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow-gold-sm mt-2"
              >
                <Plus className="w-4 h-4 text-stone-950 stroke-[3]" />
                <span>إنشاء دعوة جديدة</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map((inv) => {
                const rsvpCount = inv.rsvpList?.length || 0;
                const attendingCount = (inv.rsvpList || [])
                  .filter((r) => r.status === "attending")
                  .reduce((acc, curr) => acc + 1 + (curr.companionsCount || 0), 0);

                const inviteUrl = `/invite/${inv.slug || inv.id}`;

                return (
                  <div
                    key={inv.id}
                    className="flex flex-col justify-between rounded-3xl bg-stone-900/90 border border-stone-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-glass overflow-hidden group hover:scale-[1.01]"
                  >
                    {/* Visual Card Banner with Theme Color Preview */}
                    <div
                      className="p-6 relative overflow-hidden border-b border-stone-800/60"
                      style={{
                        background: `linear-gradient(135deg, ${inv.design.primaryColor || '#064e3b'} 0%, ${inv.design.backgroundColor || '#022c22'} 100%)`,
                      }}
                    >
                      {/* Gold Ambient Shimmer */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-400/10 filter blur-xl" />

                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-[11px] px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 font-bold">
                          {inv.design.animationPreset}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span>{inv.viewsCount || 0} مشاهدة</span>
                        </div>
                      </div>

                      <div className="relative z-10 text-center py-2">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-300/80">
                          WEDDING INVITATION
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                          {inv.weddingDetails.groomName} & {inv.weddingDetails.brideName}
                        </h3>
                        <p className="text-xs text-stone-300 mt-1 truncate">
                          {inv.title}
                        </p>
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2 text-xs text-stone-300">
                        <div className="flex items-center gap-2 p-2.5 bg-stone-950/60 rounded-xl border border-stone-800/70">
                          <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span className="truncate">{formatArabicDate(inv.weddingDetails.weddingDate)} • {inv.weddingDetails.weddingTime}</span>
                        </div>

                        <div className="flex items-center gap-2 p-2.5 bg-stone-950/60 rounded-xl border border-stone-800/70 text-[11px] text-stone-400 truncate">
                          <span>📍 {inv.weddingDetails.venueName}</span>
                        </div>

                        {/* RSVP Stats Bar */}
                        <div className="flex items-center justify-between p-2.5 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs">
                          <span className="text-stone-400">الحضور المؤكد:</span>
                          <span className="font-bold text-emerald-400 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{attendingCount} شخص مؤكد ({rsvpCount} رد)</span>
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-stone-800/80">
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={inviteUrl}
                            target="_blank"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-stone-700 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>فتح الدعوة 📱</span>
                          </Link>

                          <Link
                            href={`/admin/edit/${inv.id}`}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 text-xs font-black shadow-gold-sm transition-all"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>الاستوديو والتعديل</span>
                          </Link>
                        </div>

                        <Link
                          href={`/admin/rsvp/${inv.id}`}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-950 hover:bg-stone-800/90 border border-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-colors"
                        >
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>قائمة الـ RSVP وردود المعازيم ({rsvpCount})</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
