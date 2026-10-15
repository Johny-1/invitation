import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvitationByIdOrSlug } from "@/lib/db";
import {
  ArrowRight,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Phone,
  MessageSquareHeart,
  Calendar,
  Download,
} from "lucide-react";
import { formatArabicDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function RsvpManagerPage({ params }: { params: { id: string } }) {
  const invitation = getInvitationByIdOrSlug(params.id);

  if (!invitation) {
    notFound();
  }

  const rsvpList = invitation.rsvpList || [];
  const attendingList = rsvpList.filter((r) => r.status === "attending");
  const declinedList = rsvpList.filter((r) => r.status === "declined");
  
  const totalAttendingGuests = attendingList.reduce(
    (acc, curr) => acc + 1 + (curr.companionsCount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8 text-right" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">
                قائمة تأكيدات الحضور (RSVP) 💌
              </h1>
              <p className="text-xs text-stone-400">
                دعوة: {invitation.weddingDetails.groomName} & {invitation.weddingDetails.brideName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/edit/${invitation.id}`}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold"
            >
              محرر الدعوة
            </Link>
            <Link
              href={`/invite/${invitation.slug || invitation.id}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold"
            >
              معاينة الدعوة
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{totalAttendingGuests}</span>
              <span className="block text-xs text-emerald-300 font-semibold">
                إجمالي الحضور المؤكدين ({attendingList.length} بطاقة)
              </span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-rose-950/30 border border-rose-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{declinedList.length}</span>
              <span className="block text-xs text-rose-300 font-semibold">
                المعتذرين عن الحضور
              </span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-white">{rsvpList.length}</span>
              <span className="block text-xs text-stone-400 font-semibold">
                إجمالي الردود المستلمة
              </span>
            </div>
          </div>
        </div>

        {/* Responses Table / List */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquareHeart className="w-4 h-4 text-amber-400" />
            <span>تفاصيل ردود المعازيم وتهانيهم</span>
          </h2>

          {rsvpList.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              لم يقم أي ضيف بتسجيل تأكيد الحضور بعد. شارك الرابط مع المعازيم!
            </div>
          ) : (
            <div className="space-y-3">
              {rsvpList.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{entry.guestName}</span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          entry.status === "attending"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        }`}
                      >
                        {entry.status === "attending"
                          ? `يشرفنا الحضور (${entry.companionsCount || 0} مرافق)`
                          : "يعتذر عن الحضور"}
                      </span>
                    </div>

                    {entry.wishes && (
                      <p className="text-xs text-amber-200/90 italic pt-1">
                        &quot;{entry.wishes}&quot;
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                      {entry.phone && (
                        <span className="flex items-center gap-1 font-mono" dir="ltr">
                          <Phone className="w-3 h-3" />
                          <span>{entry.phone}</span>
                        </span>
                      )}
                      <span>{formatArabicDate(entry.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
