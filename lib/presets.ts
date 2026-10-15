import { AnimationPresetType, BackgroundConfig, DesignConfig, Invitation, MotionConfig, WeddingDetails } from "@/types/invitation";

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  previewColor: string;
  config: Partial<DesignConfig>;
}

export const DEFAULT_MOTION_CONFIG: MotionConfig = {
  revealMechanism: 'envelope',
  triggerType: 'wax-seal',
  speed: 'normal',
  physics: 'smooth',
  stepsCount: 3,
  slideDirection: 'up',
  confettiType: 'gold',
};

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  type: 'gradient',
  solidColor: '#031d16',
  gradientType: 'linear',
  gradientFrom: '#064e3b',
  gradientVia: '#031d16',
  gradientTo: '#010f0b',
  gradientAngle: 135,
  bgImageOpacity: 0.25,
  bgImageBlur: 0,
  pattern: 'damask',
  patternOpacity: 0.15,
  ambientGlowColor: '#d4af37',
  ambientGlowIntensity: 0.4,
};

export const LUXURY_GRADIENT_PRESETS = [
  { id: 'eucalyptus-sage', name: 'أوراق اليوكالبتوس والزيتوني (Eucalyptus Sage)', from: '#1e332a', via: '#13211b', to: '#09120e', angle: 135 },
  { id: 'emerald-luxury', name: 'الزمردي الملكي', from: '#064e3b', via: '#031d16', to: '#010f0b', angle: 135 },
  { id: 'royal-burgundy', name: 'العنابي المخملي', from: '#4a0e17', via: '#2d080e', to: '#140306', angle: 145 },
  { id: 'midnight-navy', name: 'الكحلي والنجوم', from: '#0f172a', via: '#0b1329', to: '#050811', angle: 160 },
  { id: 'imperial-gold', name: 'الذهب الأسود 24K', from: '#2b210e', via: '#181206', to: '#0a0802', angle: 120 },
  { id: 'obsidian-luxury', name: 'الأوبسيديان الملكي', from: '#1a1a24', via: '#0e0e14', to: '#050508', angle: 180 },
  { id: 'pure-pearl', name: 'اللؤلؤ الناعم والبيج', from: '#2a2724', via: '#1a1816', to: '#0e0d0c', angle: 135 },
  { id: 'rose-blush', name: 'الوردي الملكي الفاخر', from: '#3f1124', via: '#240713', to: '#100208', angle: 150 },
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "emerald-gold",
    name: "الزمردي الملكي والذهب (Royal Emerald & Gold)",
    description: "طابع فاخر باللون الأخضر الزمردي الداكن مع لمسات ذهبية براقة وأختام شمعية ملكية",
    previewColor: "#064e3b",
    config: {
      presetThemeId: "emerald-gold",
      primaryColor: "#064e3b",
      secondaryColor: "#022c22",
      goldAccentColor: "#d4af37",
      backgroundColor: "#031d16",
      backgroundConfig: {
        type: 'gradient',
        solidColor: '#031d16',
        gradientType: 'linear',
        gradientFrom: '#064e3b',
        gradientVia: '#031d16',
        gradientTo: '#010f0b',
        gradientAngle: 135,
        bgImageOpacity: 0.25,
        bgImageBlur: 0,
        pattern: 'damask',
        patternOpacity: 0.15,
        ambientGlowColor: '#d4af37',
        ambientGlowIntensity: 0.45,
      },
      envelopeColor: "#064e3b",
      envelopeLinerColor: "#0b664f",
      waxSealColor: "#b8860b",
      ribbonColor: "#d4af37",
      textColor: "#fef3c7",
      fontFamily: "amiri",
      backgroundPattern: "damask",
      particlesType: "gold-sparkles",
      animationPreset: "royal-wax-envelope",
      motionConfig: {
        revealMechanism: 'envelope',
        triggerType: 'wax-seal',
        speed: 'normal',
        physics: 'smooth',
        stepsCount: 3,
        slideDirection: 'up',
        confettiType: 'gold',
      },
      autoPlayAudioOnOpen: true,
      stepDescriptions: {
        step1Prompt: "المس الختم الشمعي لفتح الدعوة 👑",
        step2Prompt: "اضغط لفتح مظروف الزفاف ✉️",
        step3Prompt: "اسحب بطاقة الدعوة الملكية ✨",
      }
    }
  },
  {
    id: "royal-burgundy",
    name: "العنابي المخملي الفاخر (Royal Velvet Burgundy)",
    description: "طابع دافئ ورومانسي باللون العنابي الملكي مع أختام نحاسية وفيونكات حريرية",
    previewColor: "#581c87",
    config: {
      presetThemeId: "royal-burgundy",
      primaryColor: "#4a0e17",
      secondaryColor: "#2d080e",
      goldAccentColor: "#e5a93c",
      backgroundColor: "#1c0408",
      backgroundConfig: {
        type: 'gradient',
        solidColor: '#1c0408',
        gradientType: 'linear',
        gradientFrom: '#4a0e17',
        gradientVia: '#2d080e',
        gradientTo: '#140306',
        gradientAngle: 145,
        bgImageOpacity: 0.25,
        bgImageBlur: 0,
        pattern: 'floral',
        patternOpacity: 0.15,
        ambientGlowColor: '#e5a93c',
        ambientGlowIntensity: 0.4,
      },
      envelopeColor: "#4a0e17",
      envelopeLinerColor: "#701524",
      waxSealColor: "#8b0000",
      ribbonColor: "#c59b27",
      textColor: "#fff1f2",
      fontFamily: "aref",
      backgroundPattern: "floral",
      particlesType: "rose-petals",
      animationPreset: "luxury-gatefold",
      motionConfig: {
        revealMechanism: 'gatefold',
        triggerType: 'ribbon',
        speed: 'normal',
        physics: 'smooth',
        stepsCount: 3,
        confettiType: 'petals',
      },
      autoPlayAudioOnOpen: true,
      stepDescriptions: {
        step1Prompt: "المس الشريط الحريري لفك العقدة 🎀",
        step2Prompt: "افتح بوابتي القصر لمشاهدة الكارت 🏰",
        step3Prompt: "انقر للدخول لتفاصيل الحفل 💖",
      }
    }
  },
  {
    id: "ivory-pearl",
    name: "اللؤلؤ الأبيض النقي (Pure Ivory & Pearl)",
    description: "تصميم ناصع وناعم بنقوش زهرية رقيقة ودرجات البيج والذهب الوردي",
    previewColor: "#faf5ef",
    config: {
      presetThemeId: "ivory-pearl",
      primaryColor: "#fbf8f3",
      secondaryColor: "#e8dfd3",
      goldAccentColor: "#bfa15f",
      backgroundColor: "#f5eee4",
      backgroundConfig: {
        type: 'gradient',
        solidColor: '#f5eee4',
        gradientType: 'linear',
        gradientFrom: '#fdfbf7',
        gradientVia: '#f5eee4',
        gradientTo: '#e8dfd3',
        gradientAngle: 135,
        bgImageOpacity: 0.2,
        bgImageBlur: 0,
        pattern: 'lattice',
        patternOpacity: 0.12,
        ambientGlowColor: '#bfa15f',
        ambientGlowIntensity: 0.35,
      },
      envelopeColor: "#faf6f0",
      envelopeLinerColor: "#eeddc8",
      waxSealColor: "#c5a059",
      ribbonColor: "#e0caa0",
      textColor: "#2c241b",
      fontFamily: "cairo",
      backgroundPattern: "lattice",
      particlesType: "rose-petals",
      animationPreset: "floral-blossom",
      motionConfig: {
        revealMechanism: 'blossom',
        triggerType: 'custom-image',
        speed: 'normal',
        physics: 'spring',
        stepsCount: 2,
        confettiType: 'petals',
      },
      autoPlayAudioOnOpen: true,
      stepDescriptions: {
        step1Prompt: "انقر على باقة الورد لتفتّح الزهور 🌸",
        step2Prompt: "اضغط على الظرف الأنيق 💌",
        step3Prompt: "المس الكارت للبدء ✨",
      }
    }
  },
  {
    id: "midnight-luxury",
    name: "كحلي الليل والنجوم (Midnight Navy & Silver Gold)",
    description: "فخامة عصرية باللون الكحلي الداكن مع لمسات زجاجية عاكسة ونجوم متلألئة",
    previewColor: "#0f172a",
    config: {
      presetThemeId: "midnight-luxury",
      primaryColor: "#0f172a",
      secondaryColor: "#090d16",
      goldAccentColor: "#e2b857",
      backgroundColor: "#070b12",
      backgroundConfig: {
        type: 'gradient',
        solidColor: '#070b12',
        gradientType: 'linear',
        gradientFrom: '#0f172a',
        gradientVia: '#0b1329',
        gradientTo: '#050811',
        gradientAngle: 160,
        bgImageOpacity: 0.3,
        bgImageBlur: 0,
        pattern: 'stars',
        patternOpacity: 0.2,
        ambientGlowColor: '#e2b857',
        ambientGlowIntensity: 0.45,
      },
      envelopeColor: "#131d36",
      envelopeLinerColor: "#1d2a4d",
      waxSealColor: "#cba135",
      ribbonColor: "#e2b857",
      textColor: "#f1f5f9",
      fontFamily: "tajawal",
      backgroundPattern: "stars",
      particlesType: "gold-sparkles",
      animationPreset: "modern-frosted-slide",
      motionConfig: {
        revealMechanism: 'slide',
        triggerType: 'monogram',
        speed: 'fast',
        physics: 'smooth',
        stepsCount: 2,
        slideDirection: 'down',
        confettiType: 'gold',
      },
      autoPlayAudioOnOpen: true,
      stepDescriptions: {
        step1Prompt: "انقر لسحب الغلاف الزجاجي الفاخر 💫",
        step2Prompt: "المس البطاقة للكشف عن التفاصيل 📜",
        step3Prompt: "شاهد تفاصيل الحفل والموقع 💍",
      }
    }
  }
];

export const ANIMATION_PRESETS_LIST = [
  {
    id: "custom-studio" as AnimationPresetType,
    name: "الاستوديو المخصص (Custom Motion)",
    icon: "Sliders",
    description: "تخصيص كامل: اختر آلية الفتح، شكل القفل، السرعة، اتجاه الحركة، وعدد الخطوات حسب تصميمك المرفوع",
    stepsCount: 3,
  },
  {
    id: "royal-wax-envelope" as AnimationPresetType,
    name: "الظرف الملكي والختم الشمعي",
    icon: "Mail",
    description: "كسر الختم الشمعي 👈 فتح لسان الظرف للأعلى 👈 خروج الكارت وتكبيره بتركيز كامل",
    stepsCount: 3,
  },
  {
    id: "luxury-gatefold" as AnimationPresetType,
    name: "البوابة الملكية والفيونكة الحريرية",
    icon: "Gift",
    description: "فك الفيونكة الحريرية 👈 انفتاح درفتي البوابة يميناً ويساراً 3D 👈 بروز الكارت",
    stepsCount: 3,
  },
  {
    id: "modern-frosted-slide" as AnimationPresetType,
    name: "السحب العصري الزجاجي (Frosted Slide)",
    icon: "Layers",
    description: "انزلاق الغلاف الخارجي بتأثير زجاجي مثلج 👈 ظهور الكارت بتلاشي ناعم وتألق",
    stepsCount: 2,
  },
  {
    id: "book-flip-3d" as AnimationPresetType,
    name: "الكارت المطوي والدفتر 3D",
    icon: "BookOpen",
    description: "انفتاح غلاف الكارت المطوي للأمام كالكتاب الملكي 👈 بروز الكارت وتفاصيل الزفاف",
    stepsCount: 2,
  },
  {
    id: "direct-fade-zoom" as AnimationPresetType,
    name: "الظهور السينمائي المباشر (Direct Zoom)",
    icon: "Sparkles",
    description: "مثالي للتصاميم الكاملة الجاهزة: لمسة واحدة 👈 تكبير وبروز سينمائي فاخر مع بريق الذهب",
    stepsCount: 1,
  },
  {
    id: "floral-blossom" as AnimationPresetType,
    name: "تفتّح الزهور والبريق الذهبي",
    icon: "Flower2",
    description: "تفتح إكليل الورد تدريجياً 👈 صعود البطاقة بانسيابية مع تطاير أوراق الورد",
    stepsCount: 2,
  },
];

export const DEFAULT_SAMPLE_INVITATION: Invitation = {
  id: "demo-royal-wedding",
  slug: "ahmed-and-mariam",
  title: "دعوة زفاف أحمد ومريم",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  viewsCount: 142,
  weddingDetails: {
    groomName: "أحمد عبد الله",
    groomTitle: "العريس",
    groomParents: "نجل الأستاذ عبد الله إبراهيم",
    brideName: "مريم المنصوري",
    brideTitle: "العروس",
    brideParents: "كريمة المستشار محمد المنصوري",
    weddingDate: "2026-11-20",
    weddingTime: "08:30 مساءً",
    venueName: "فندق فور سيزونز - قاعة البلازا الكبرى",
    venueAddress: "كورنيش النيل، جاردن سيتي، القاهرة",
    googleMapsUrl: "https://maps.google.com/?q=Four+Seasons+Hotel+Cairo+at+Nile+Plaza",
    welcomeMessage: "بأسمى آيات البهجة والسرور، تتشرف عائلتا عبد الله والمنصوري بدعوتكم لحضور حفل زفاف نجليهما",
    closingMessage: "حضوركم شرف لنا ويزيد من فرحتنا وسرورنا",
    notes: "نرجو تأكيد الحضور عبر النموذج أدناه • جنة الأطفال منازلهم",
    schedule: [
      { time: "08:00 م", title: "استقبال الضيوف الكرام والترحيب", description: "بمشروبات الاستقبال والضيافة الملكية" },
      { time: "09:00 م", title: "مراسم الزفة ودخول العروسين", description: "أجواء احتفالية رائعة" },
      { time: "10:30 م", title: "العشاء الفاخر", description: "بوفيه مفتوح بأشهى المأكولات" },
      { time: "11:30 م", title: "تقطيع الكعكة والتقاط الصور", description: "تخليداً لأجمل اللحظات" },
    ]
  },
  design: {
    presetThemeId: "emerald-gold",
    primaryColor: "#064e3b",
    secondaryColor: "#022c22",
    goldAccentColor: "#d4af37",
    backgroundColor: "#031d16",
    backgroundConfig: DEFAULT_BACKGROUND_CONFIG,
    envelopeColor: "#064e3b",
    envelopeLinerColor: "#0b664f",
    waxSealColor: "#b8860b",
    ribbonColor: "#d4af37",
    textColor: "#fef3c7",
    fontFamily: "amiri",
    backgroundPattern: "damask",
    particlesType: "gold-sparkles",
    animationPreset: "royal-wax-envelope",
    motionConfig: DEFAULT_MOTION_CONFIG,
    autoPlayAudioOnOpen: true,
    stepDescriptions: {
      step1Prompt: "المس الختم الشمعي لفك الختم 👑",
      step2Prompt: "اضغط لفتح مظروف الدعوة ✉️",
      step3Prompt: "اسحب بطاقة الزفاف للاطلاع ✨",
    }
  },
  rsvpList: [
    {
      id: "rsvp-1",
      guestName: "د. طارق وسام وعائلته",
      status: "attending",
      companionsCount: 3,
      phone: "+201000000001",
      wishes: "ألف ألف مبروك للعروسين، بارك الله لكما وجمع بينكما في خير!",
      createdAt: "2026-10-06T18:30:00.000Z"
    },
    {
      id: "rsvp-2",
      guestName: "م. حسام الدين",
      status: "attending",
      companionsCount: 1,
      phone: "+201000000002",
      wishes: "مبروك يا أحلى عريس، فرحة العمر إن شاء الله.",
      createdAt: "2026-10-06T20:15:00.000Z"
    },
    {
      id: "rsvp-3",
      guestName: "أ. ياسر كمال",
      status: "declined",
      companionsCount: 0,
      phone: "+201000000003",
      wishes: "نعتذر لظروف السفر، قلوبنا معكم وألف مبروك مقدماً!",
      createdAt: "2026-10-07T09:00:00.000Z"
    }
  ]
};
