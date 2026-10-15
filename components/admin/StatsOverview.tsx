"use client";

import React from "react";
import { Mail, Eye, Users, HeartHandshake, TrendingUp, Sparkles } from "lucide-react";
import { Invitation } from "@/types/invitation";

interface StatsOverviewProps {
  invitations: Invitation[];
}

export default function StatsOverview({ invitations }: StatsOverviewProps) {
  const totalInvitations = invitations.length;
  const totalViews = invitations.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  
  let totalRsvps = 0;
  let totalAttending = 0;
  let totalDeclined = 0;

  invitations.forEach((inv) => {
    (inv.rsvpList || []).forEach((r) => {
      totalRsvps++;
      if (r.status === "attending") {
        totalAttending += 1 + (r.companionsCount || 0);
      } else if (r.status === "declined") {
        totalDeclined++;
      }
    });
  });

  const responseRate = totalViews > 0 ? Math.round((totalRsvps / totalViews) * 100) : 0;

  const stats = [
    {
      label: "إجمالي الدعوات المنشأة",
      value: totalInvitations,
      subtext: "دعوات نشطة",
      icon: Mail,
      accentColor: "from-amber-500/20 to-amber-600/5",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/20",
    },
    {
      label: "إجمالي المشاهدات والتفاعل",
      value: totalViews,
      subtext: "زيارة فريدة للروابط",
      icon: Eye,
      accentColor: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
    },
    {
      label: "الحضور المؤكد (RSVP)",
      value: totalAttending,
      subtext: `من أصل ${totalRsvps} رد مستلم`,
      icon: Users,
      accentColor: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/20",
    },
    {
      label: "نسبة التفاعل والتأكيد",
      value: `${responseRate}%`,
      subtext: "معدل تفاعل المعازيم",
      icon: TrendingUp,
      accentColor: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden p-5 rounded-3xl bg-gradient-to-br ${stat.accentColor} bg-stone-900/80 border ${stat.borderColor} backdrop-blur-xl shadow-glass transition-all duration-300 hover:scale-[1.02] group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-2xl ${stat.iconBg} flex items-center justify-center ${stat.iconColor} shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
              <Sparkles className="w-4 h-4 text-stone-600 group-hover:text-amber-400 transition-colors opacity-60" />
            </div>

            <div>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <h4 className="text-xs font-bold text-stone-300 mt-1">
                {stat.label}
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {stat.subtext}
              </p>
            </div>

            {/* Subtle light bar */}
            <div className="absolute bottom-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}
