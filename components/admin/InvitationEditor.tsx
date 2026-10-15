"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Eye,
  Share2,
  Palette,
  Sparkles,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Sliders,
  Type,
  FileText,
} from "lucide-react";
import { Invitation, DesignConfig, WeddingDetails, AnimationPresetType } from "@/types/invitation";
import AnimationPicker from "./AnimationPicker";
import MotionStudio from "./MotionStudio";
import BackgroundStudio from "./BackgroundStudio";
import ColorPaletteSelector from "./ColorPaletteSelector";
import LivePhoneMockup from "./LivePhoneMockup";
import ShareLinkGenerator from "./ShareLinkGenerator";

interface InvitationEditorProps {
  initialData: Invitation;
  isNew?: boolean;
}

export default function InvitationEditor({ initialData, isNew = false }: InvitationEditorProps) {
  const router = useRouter();
  const [invitation, setInvitation] = useState<Invitation>(initialData);
  const [activeTab, setActiveTab] = useState<"details" | "animation" | "background" | "themes" | "uploads" | "share">("details");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);

  const updateWeddingDetails = (fields: Partial<WeddingDetails>) => {
    setInvitation((prev) => ({
      ...prev,
      weddingDetails: { ...prev.weddingDetails, ...fields },
    }));
  };

  const updateDesign = (fields: Partial<DesignConfig>) => {
    setInvitation((prev) => ({
      ...prev,
      design: { ...prev.design, ...fields },
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof DesignConfig) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        updateDesign({ [fieldName]: data.url });
      } else {
        alert("فشل رفع الملف: " + (data.error || "خطأ غير معروف"));
      }
    } catch (error) {
      alert("حدث خطأ أثناء رفع الملف");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const url = isNew ? "/api/invitations" : `/api/invitations/${invitation.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل حفظ الدعوة");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      if (isNew && data.data?.id) {
        router.push(`/admin/edit/${data.data.id}`);
      }
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setIsSaving(false);
    }
  };

  const addScheduleItem = () => {
    const current = invitation.weddingDetails.schedule || [];
    updateWeddingDetails({
      schedule: [...current, { time: "09:00 م", title: "فقرة جديدة", description: "" }],
    });
  };

  const removeScheduleItem = (idx: number) => {
    const current = invitation.weddingDetails.schedule || [];
    updateWeddingDetails({
      schedule: current.filter((_, i) => i !== idx),
    });
  };

  const updateScheduleItem = (idx: number, fields: any) => {
    const current = [...(invitation.weddingDetails.schedule || [])];
    current[idx] = { ...current[idx], ...fields };
    updateWeddingDetails({ schedule: current });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between text-right" dir="rtl">
      
      {/* Top Studio Navbar */}
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-xl border-b border-stone-800 px-4 sm:px-8 py-3.5 shadow-glass">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Breadcrumbs & Title */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.push("/admin")}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="العودة للوحة الإدارة"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{isNew ? "إنشاء دعوة زفاف جديدة ✉️" : `استوديو التعديل: ${invitation.title}`}</span>
              </h1>
              <p className="text-[11px] text-stone-400">
                الرابط المختصر: <span className="text-amber-300 font-mono">/invite/{invitation.slug || invitation.id}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Mobile Simulator Toggle */}
            <button
              type="button"
              onClick={() => setShowMobileSimulator(!showMobileSimulator)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-amber-400/30"
            >
              <Smartphone className="w-4 h-4" />
              <span>{showMobileSimulator ? "إخفاء الهاتف" : "معاينة الهاتف"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:brightness-110 text-stone-950 text-xs font-black shadow-gold-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <span>جاري الحفظ...</span>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-stone-950 stroke-[2.5]" />
                  <span>تم الحفظ بنجاح! ✨</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-stone-950 stroke-[2.5]" />
                  <span>حفظ الدعوة</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "details", label: "بيانات العروسين والحفل", icon: Heart },
            { id: "animation", label: "استوديو الأنيميشن المخصص 🎬", icon: Sparkles },
            { id: "background", label: "ألوان وخلفية السايت 🎨", icon: Sliders },
            { id: "themes", label: "القوالب الجاهزة والخطوط 👑", icon: Palette },
            { id: "uploads", label: "رفع التصاميم والموسيقى 📁", icon: Upload },
            { id: "share", label: "توليد الروابط والواتساب 💬", icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setShowMobileSimulator(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-stone-950 shadow-gold-sm"
                    : "bg-stone-800/60 text-stone-400 hover:text-white hover:bg-stone-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Studio Body (Side-by-Side Split View) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* RIGHT COLUMN: Studio Controls (7 Cols on desktop) */}
          <div className={`lg:col-span-7 space-y-6 ${showMobileSimulator ? 'hidden lg:block' : 'block'}`}>
            
            {/* TAB 1: WEDDING DETAILS */}
            {activeTab === "details" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Title & Slug */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>عنوان الدعوة والرابط المختصر</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">اسم الدعوة في اللوحة</label>
                      <input
                        type="text"
                        value={invitation.title}
                        onChange={(e) => setInvitation({ ...invitation, title: e.target.value })}
                        placeholder="مثال: دعوة زفاف أحمد ومريم"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">الرابط المخصص (Slug)</label>
                      <input
                        type="text"
                        value={invitation.slug}
                        onChange={(e) => setInvitation({ ...invitation, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        placeholder="ahmed-and-mariam"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-400 transition-colors"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Bride & Groom */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-400" />
                    <span>بيانات العروسين وعائلتيهما</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3 p-4 bg-stone-950/60 rounded-2xl border border-stone-800/70">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <span>🤵 بيانات العريس</span>
                      </span>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">اسم العريس *</label>
                        <input
                          type="text"
                          value={invitation.weddingDetails.groomName}
                          onChange={(e) => updateWeddingDetails({ groomName: e.target.value })}
                          placeholder="أحمد عبد الله"
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">أهل العريس / اللقب</label>
                        <input
                          type="text"
                          value={invitation.weddingDetails.groomParents || ""}
                          onChange={(e) => updateWeddingDetails({ groomParents: e.target.value })}
                          placeholder="نجل الأستاذ عبد الله إبراهيم"
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 p-4 bg-stone-950/60 rounded-2xl border border-stone-800/70">
                      <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                        <span>👰 بيانات العروس</span>
                      </span>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">اسم العروس *</label>
                        <input
                          type="text"
                          value={invitation.weddingDetails.brideName}
                          onChange={(e) => updateWeddingDetails({ brideName: e.target.value })}
                          placeholder="مريم المنصوري"
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">أهل العروس / اللقب</label>
                        <input
                          type="text"
                          value={invitation.weddingDetails.brideParents || ""}
                          onChange={(e) => updateWeddingDetails({ brideParents: e.target.value })}
                          placeholder="كريمة المستشار محمد المنصوري"
                          className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-sm text-white focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>الموعد والقاعة وموقع خرائط جوجل</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">تاريخ الحفل *</label>
                      <input
                        type="date"
                        value={invitation.weddingDetails.weddingDate}
                        onChange={(e) => updateWeddingDetails({ weddingDate: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">توقيت الحفل</label>
                      <input
                        type="text"
                        value={invitation.weddingDetails.weddingTime}
                        onChange={(e) => updateWeddingDetails({ weddingTime: e.target.value })}
                        placeholder="08:30 مساءً"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">اسم القاعة أو الفندق</label>
                      <input
                        type="text"
                        value={invitation.weddingDetails.venueName}
                        onChange={(e) => updateWeddingDetails({ venueName: e.target.value })}
                        placeholder="فندق فور سيزونز - قاعة البلازا"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">عنوان القاعة</label>
                      <input
                        type="text"
                        value={invitation.weddingDetails.venueAddress}
                        onChange={(e) => updateWeddingDetails({ venueAddress: e.target.value })}
                        placeholder="كورنيش النيل، جاردن سيتي، القاهرة"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">رابط Google Maps للوصول المباشر</label>
                      <input
                        type="url"
                        value={invitation.weddingDetails.googleMapsUrl}
                        onChange={(e) => updateWeddingDetails({ googleMapsUrl: e.target.value })}
                        placeholder="https://maps.google.com/?q=..."
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-amber-300 font-mono focus:border-amber-400"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Welcome & Spiritual Texts */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300">
                    العبارات الافتتاحية ورسالة الدعوة (قابلة للتعديل بالكامل)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">
                        الافتتاحية العلوية (مثل: باسم الآب والابن والروح القدس / بسم الله الرحمن الرحيم / أو اتركها فارغة)
                      </label>
                      <input
                        type="text"
                        value={invitation.weddingDetails.openingHeader || ""}
                        onChange={(e) => updateWeddingDetails({ openingHeader: e.target.value })}
                        placeholder="باسم الآب والابن والروح القدس / بسم الله الرحمن الرحيم"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">
                        الآية أو الشاهد الديني أو بيت الشعر الافتتاحي (اختياري)
                      </label>
                      <textarea
                        rows={2}
                        value={invitation.weddingDetails.verseOrQuote || ""}
                        onChange={(e) => updateWeddingDetails({ verseOrQuote: e.target.value })}
                        placeholder="اكتب الآية أو الشاهد هنا أو اتركه فارغاً"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-amber-300 font-serif focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">عبارة الدعوة الرئيسية</label>
                      <textarea
                        rows={2}
                        value={invitation.weddingDetails.welcomeMessage}
                        onChange={(e) => updateWeddingDetails({ welcomeMessage: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-400 mb-1.5 font-medium">ملاحظات ختامية (مثل: جنة الأطفال منازلهم)</label>
                      <input
                        type="text"
                        value={invitation.weddingDetails.notes || ""}
                        onChange={(e) => updateWeddingDetails({ notes: e.target.value })}
                        placeholder="جنة الأطفال منازلهم • حضوركم يسعدنا"
                        className="w-full px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-white focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Schedule */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>فقرات الحفل (Timeline)</span>
                    </h3>
                    <button
                      type="button"
                      onClick={addScheduleItem}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl text-xs font-semibold border border-stone-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة فقرة</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(invitation.weddingDetails.schedule || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-stone-950 rounded-2xl border border-stone-800"
                      >
                        <input
                          type="text"
                          value={item.time}
                          onChange={(e) => updateScheduleItem(idx, { time: e.target.value })}
                          placeholder="09:00 م"
                          className="w-24 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-amber-300 text-center font-bold"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateScheduleItem(idx, { title: e.target.value })}
                          placeholder="عنوان الفقرة (مثلاً: زفة العروسين)"
                          className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeScheduleItem(idx)}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MOTION & ANIMATION STUDIO */}
            {activeTab === "animation" && (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Master Motion Studio (Full Animation Customization) */}
                <MotionStudio
                  design={invitation.design}
                  onChange={updateDesign}
                />

                {/* 2. Ready Animation Presets Switcher (Optional 1-Click Templates) */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>أو اختر قالباً حركياً جاهزاً مسبقاً (Ready Animation Presets)</span>
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-1">
                      يمكنك اختيار أحد القوالب الجاهزة بنقرة واحدة، أو التعديل والتخصيص الحر عبر استوديو الحركة بالأعلى
                    </p>
                  </div>
                  <AnimationPicker
                    selectedPreset={invitation.design.animationPreset}
                    onChange={(preset) => updateDesign({ animationPreset: preset })}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: BACKGROUND & ATMOSPHERE STUDIO */}
            {activeTab === "background" && (
              <div className="space-y-6 animate-fade-in">
                <BackgroundStudio
                  design={invitation.design}
                  onChange={updateDesign}
                />
              </div>
            )}

            {/* TAB 3: THEMES, COLORS & FONTS */}
            {activeTab === "themes" && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass">
                  <ColorPaletteSelector
                    design={invitation.design}
                    onChange={updateDesign}
                  />
                </div>

                {/* Typography Selection */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span>الخط العربي الملكي (Typography)</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { id: "amiri", name: "الخط الأميري الملكي", preview: "أحمد & مريم" },
                      { id: "aref", name: "خط رقعة فاخر (Aref)", preview: "أحمد & مريم" },
                      { id: "cairo", name: "خط كايرو العصري", preview: "أحمد & مريم" },
                      { id: "tajawal", name: "خط تجوال الأنيق", preview: "أحمد & مريم" },
                      { id: "reem", name: "خط ريم الكوفي", preview: "أحمد & مريم" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateDesign({ fontFamily: f.id as any })}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          invitation.design.fontFamily === f.id
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-gold-sm"
                            : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                        }`}
                      >
                        <span className="text-base font-bold block mb-1 text-white">{f.preview}</span>
                        <span className="text-[11px] text-stone-400">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CUSTOM UPLOADS & AUDIO */}
            {activeTab === "uploads" && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300">
                    رفع تصميمات مخصصة (Custom Graphics)
                  </h3>
                  <p className="text-xs text-stone-400">
                    يمكنك رفع تصميماتك الجاهزة من الفوتوشوب للظرف المفتوح والمقفول وكارت الدعوة وشعار الختم
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "envelopeClosedImage", label: "صورة الظرف مقفول (Closed Envelope)" },
                      { key: "envelopeOpenImage", label: "صورة الظرف مفتوح (Open Envelope)" },
                      { key: "cardInsideImage", label: "تصميم كارت الدعوة الداخلي (Card Design)" },
                      { key: "sealImage", label: "شعار الختم / المونوغرام (Seal/Monogram)" },
                    ].map((item) => {
                      const currentVal = (invitation.design as any)[item.key];
                      const isUploading = uploadingField === item.key;

                      return (
                        <div key={item.key} className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                          <h4 className="text-xs font-bold text-white">{item.label}</h4>

                          {currentVal && (
                            <div className="relative w-full h-28 rounded-xl overflow-hidden bg-black/50 border border-stone-700 flex items-center justify-center">
                              <img src={currentVal} alt={item.label} className="max-h-full object-contain" />
                              <button
                                type="button"
                                onClick={() => updateDesign({ [item.key]: undefined })}
                                className="absolute top-2 left-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          <label className="w-full px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs text-amber-300 font-semibold text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? "جاري الرفع..." : currentVal ? "تغيير الصورة" : "رفع ملف صورة"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, item.key as any)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Audio */}
                <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800/80 shadow-glass space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Music className="w-4 h-4 text-amber-400" />
                    <span>الموسيقى المصاحبة للدعوة</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-stone-950 rounded-2xl border border-stone-800">
                      <input
                        type="checkbox"
                        id="autoPlayCheckStudio"
                        checked={invitation.design.autoPlayAudioOnOpen}
                        onChange={(e) => updateDesign({ autoPlayAudioOnOpen: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                      />
                      <label htmlFor="autoPlayCheckStudio" className="text-xs text-stone-200 cursor-pointer font-medium">
                        تشغيل الموسيقى تلقائياً عند فتح الضيف للدعوة 🎵
                      </label>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                      <label className="block text-xs text-stone-300 font-medium">
                        رفع ملف صوتي مخصص (MP3) أو وضع رابط مباشر
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="text"
                          value={invitation.design.audioUrl || ""}
                          onChange={(e) => updateDesign({ audioUrl: e.target.value })}
                          placeholder="https://example.com/romantic-track.mp3"
                          className="flex-1 px-4 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-mono"
                          dir="ltr"
                        />
                        <label className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-300 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 whitespace-nowrap">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingField === "audioUrl" ? "جاري الرفع..." : "رفع MP3"}</span>
                          <input
                            type="file"
                            accept="audio/mp3,audio/mpeg,audio/wav"
                            onChange={(e) => handleFileUpload(e, "audioUrl")}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SHARE & WHATSAPP */}
            {activeTab === "share" && (
              <div className="space-y-6 animate-fade-in">
                <ShareLinkGenerator
                  invitationIdOrSlug={invitation.slug || invitation.id}
                  groomName={invitation.weddingDetails.groomName}
                  brideName={invitation.weddingDetails.brideName}
                />
              </div>
            )}

          </div>

          {/* LEFT COLUMN: LIVE INTERACTIVE PHONE MOCKUP (5 Cols on desktop) */}
          <div className={`lg:col-span-5 lg:sticky lg:top-24 ${showMobileSimulator ? 'block' : 'hidden lg:block'}`}>
            <div className="p-4 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-glass flex flex-col items-center">
              <LivePhoneMockup
                design={invitation.design}
                weddingDetails={invitation.weddingDetails}
              />
            </div>
          </div>

        </div>
      </main>

      {/* Studio Footer */}
      <footer className="border-t border-stone-800/80 py-4 px-6 text-center text-[11px] text-stone-500 bg-stone-950">
        استوديو تخصيص دعوات الزفاف التفاعلية • جميع التغييرات يتم تحديثها فوراً في المحاكي المباشر ✨
      </footer>

    </div>
  );
}
