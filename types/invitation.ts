export type AnimationPresetType = 
  | 'royal-wax-envelope'      // الظرف الملكي والختم الشمعي
  | 'luxury-gatefold'         // البوابة الملكية ثلاثية الأبعاد والفيونكة
  | 'modern-frosted-slide'    // السحب العصري الزجاجي
  | 'floral-blossom'          // تفتح الزهور والبطاقة الذهبية
  | 'book-flip-3d'            // فتح الدفتر والكارت المطوي ثلاثي الأبعاد
  | 'direct-fade-zoom'        // الظهور والتكبير الفاخر المباشر
  | 'custom-studio';          // الاستوديو المخصص الكامل

export type MotionRevealMechanism = 
  | 'envelope'
  | 'gatefold'
  | 'slide'
  | 'book-flip'
  | 'direct-zoom'
  | 'blossom';

export type MotionTriggerType = 
  | 'wax-seal'
  | 'ribbon'
  | 'monogram'
  | 'custom-image'
  | 'none';

export type MotionSpeed = 'slow' | 'normal' | 'fast';
export type MotionPhysics = 'spring' | 'smooth' | 'gentle';

export interface MotionConfig {
  revealMechanism: MotionRevealMechanism;
  triggerType: MotionTriggerType;
  speed: MotionSpeed;
  physics: MotionPhysics;
  stepsCount: 1 | 2 | 3;
  slideDirection?: 'up' | 'down' | 'left' | 'right';
  confettiType?: 'gold' | 'petals' | 'stars' | 'confetti' | 'none';
}

export type BackgroundType = 'solid' | 'gradient' | 'image' | 'mesh';
export type BackgroundPatternType = 'damask' | 'stars' | 'floral' | 'lattice' | 'geometric' | 'dots' | 'clean' | 'none' | 'custom';

export interface BackgroundConfig {
  type: BackgroundType;
  solidColor: string;
  gradientType: 'linear' | 'radial';
  gradientFrom: string;
  gradientVia?: string;
  gradientTo: string;
  gradientAngle: number; // 0 to 360
  bgCustomImage?: string;
  bgImageOpacity: number; // 0 to 1
  bgImageBlur: number; // 0 to 20
  bgOverlayColor?: string;
  pattern: BackgroundPatternType;
  patternOpacity: number; // 0 to 1
  ambientGlowColor: string;
  ambientGlowIntensity: number; // 0 to 1
}

export interface WeddingDetails {
  openingHeader?: string;     // e.g. "باسم الآب والابن والروح القدس" أو "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" أو فارغ
  verseOrQuote?: string;      // e.g. الآية أو الشاهد أو بيت الشعر
  groomName: string;
  groomTitle?: string;
  brideName: string;
  brideTitle?: string;
  groomParents?: string;
  brideParents?: string;
  weddingDate: string;        // e.g. "2026-11-20"
  weddingTime: string;        // e.g. "08:00 مساءً"
  venueName: string;          // e.g. "فندق ريتز كارلتون - قاعة الكريستال"
  venueAddress: string;       // e.g. "كورنيش النيل، القاهرة"
  googleMapsUrl: string;
  wazeUrl?: string;
  welcomeMessage: string;     // e.g. "يتشرف العروسين وعائلتيهما بدعوتكم لمشاركتهم فرحة العمر"
  closingMessage?: string;    // e.g. "حضوركم يسعدنا ويكتمل به سرورنا"
  notes?: string;             // e.g. "جنة الأطفال منازلهم / بارك الله لهما وبارك عليهما"
  schedule?: {
    time: string;
    title: string;
    description?: string;
  }[];
}

export interface DesignConfig {
  presetThemeId: string;
  primaryColor: string;
  secondaryColor: string;
  goldAccentColor: string;
  backgroundColor: string;
  envelopeColor: string;
  envelopeLinerColor: string;
  waxSealColor: string;
  ribbonColor: string;
  textColor: string;
  fontFamily: 'amiri' | 'cairo' | 'tajawal' | 'reem' | 'aref';
  backgroundPattern: BackgroundPatternType;
  bgCustomImage?: string;

  // Advanced Background Configuration:
  backgroundConfig?: BackgroundConfig;
  
  // Custom Images Uploaded by Admin:
  envelopeClosedImage?: string;
  envelopeOpenImage?: string;
  cardInsideImage?: string;
  sealImage?: string;
  couplePhoto?: string;
  
  // Audio:
  audioUrl?: string;
  audioTitle?: string;
  autoPlayAudioOnOpen: boolean;
  
  // Animation settings:
  animationPreset: AnimationPresetType;
  motionConfig?: MotionConfig;
  particlesType: 'gold-sparkles' | 'rose-petals' | 'stars' | 'floating-hearts' | 'none';
  particlesSpeed?: 'slow' | 'normal' | 'fast';
  particlesDensity?: 'low' | 'medium' | 'high';
  
  stepDescriptions?: {
    step1Prompt?: string;
    step2Prompt?: string;
    step3Prompt?: string;
  };
}

export interface RsvpEntry {
  id: string;
  guestName: string;
  status: 'attending' | 'declined' | 'tentative';
  companionsCount: number;
  phone?: string;
  wishes?: string;
  createdAt: string;
}

export interface Invitation {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  weddingDetails: WeddingDetails;
  design: DesignConfig;
  rsvpList: RsvpEntry[];
  viewsCount: number;
}
