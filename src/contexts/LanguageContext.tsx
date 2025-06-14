
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    testimonials: "Testimonials",
    
    // Hero Section
    welcomeTitle: "Your Gateway to Global Education",
    welcomeSubtitle: "We help international students achieve their dreams of studying abroad with personalized guidance and expert support.",
    chooseCountry: "Which country do you want to study in?",
    startJourney: "Start Your Journey",
    getStarted: "Get Started",
    
    // Countries
    turkey: "Turkey",
    france: "France",
    tunisia: "Tunisia",
    canada: "Canada",
    morocco: "Morocco",
    russia: "Russia",
    
    // Services
    universityAdmission: "University Admission",
    scholarships: "Scholarships",
    visaGuidance: "Visa Guidance",
    accommodation: "Accommodation",
    
    // Index Page Content
    universities: "Universities",
    internationalStudents: "International Students",
    provinces: "Provinces",
    seasons: "Seasons",
    everythingAboutTurkey: "Everything About Turkey",
    allInformationNeeded: "All the information you need from planning your education to graduation",
    universitiesAndPrograms: "Universities & Programs",
    exploreUniversities: "Explore 200+ world-class universities and programs",
    scholarshipsAndFunding: "Scholarships & Funding",
    turkishScholarships: "Turkish Scholarships and other funding opportunities",
    citiesAndLifestyle: "Cities & Lifestyle",
    discoverCities: "Discover Turkey's student-friendly cities",
    economyAndLivingCosts: "Economy & Living Costs",
    currentEconomicSituation: "Current economic situation and living expenses",
    whyTurkey: "Why Turkey?",
    strategicLocation: "Strategic Location",
    strategicLocationDesc: "Bridge between Europe and Asia with strategic positioning",
    culturalRichness: "Cultural Richness",
    culturalRichnessDesc: "Thousands of years of history and multicultural environment",
    hospitality: "Hospitality",
    hospitalityDesc: "World-famous Turkish hospitality and warmth",
    easyAccess: "Easy Access",
    easyAccessDesc: "Gateway to the world with excellent transportation links",
    startEducationalJourney: "Start Your Educational Journey in Turkey Today",
    guideFromApplication: "We guide you from application process to graduation",
    applyNow: "Apply Now",
    learnMore: "Learn More",
    
    // Form
    fullName: "Full Name",
    nationality: "Nationality",
    whatsapp: "WhatsApp Number",
    educationLevel: "Education Level",
    studyField: "Preferred Study Field",
    languageOfInstruction: "Language of Instruction",
    startApplication: "Start Application",
    submit: "Submit Application",
    
    // About
    aboutTitle: "About EDUPASS",
    aboutDescription: "With over 10 years of experience, we have successfully helped thousands of students achieve their dreams of studying abroad. Our expert team provides personalized guidance throughout your educational journey.",
    
    // Contact
    contactTitle: "Get in Touch",
    email: "Email",
    phone: "Phone",
    address: "Address",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "Student Success Stories",
    hearFromStudents: "Hear from our students who are now studying at top universities around the world",
    successRate: "Success Rate",
    ofStudentsAccepted: "of our students get accepted",
    scholarshipsSecured: "secured for our students",
    partnerUniversities: "partner institutions worldwide",
    studyDestinations: "study destinations",
    videoTestimonials: "Video Testimonials",
    watchStudentExperiences: "Watch our students share their experiences",
    studentSuccessStory: "Student Success Story",
    watchHowWeHelped: "Watch how we helped students achieve their dreams",
    readyToWriteStory: "Ready to Write Your Success Story?",
    joinThousandsOfStudents: "Join thousands of students who have achieved their international education dreams with our help.",
    freeConsultation: "Free Consultation",
    bookThirtyMinuteCall: "Book a 30-minute call to discuss your goals"
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    contact: "اتصل بنا",
    testimonials: "شهادات الطلاب",
    
    // Hero Section
    welcomeTitle: "بوابتك للتعليم العالمي",
    welcomeSubtitle: "نساعد الطلاب الدوليين على تحقيق أحلامهم في الدراسة بالخارج من خلال التوجيه الشخصي والدعم المتخصص.",
    chooseCountry: "في أي دولة تريد الدراسة؟",
    startJourney: "ابدأ رحلتك",
    getStarted: "ابدأ الآن",
    
    // Countries
    turkey: "تركيا",
    france: "فرنسا",
    tunisia: "تونس",
    canada: "كندا",
    morocco: "المغرب",
    russia: "روسيا",
    
    // Services
    universityAdmission: "القبول الجامعي",
    scholarships: "المنح الدراسية",
    visaGuidance: "إرشادات التأشيرة",
    accommodation: "السكن",
    
    // Index Page Content
    universities: "جامعة",
    internationalStudents: "طالب دولي",
    provinces: "ولاية",
    seasons: "فصول",
    everythingAboutTurkey: "كل شيء حول تركيا",
    allInformationNeeded: "جميع المعلومات التي تحتاجها من التخطيط لتعليمك إلى التخرج",
    universitiesAndPrograms: "الجامعات والبرامج",
    exploreUniversities: "استكشف أكثر من 200 جامعة وبرنامج عالمي المستوى",
    scholarshipsAndFunding: "المنح الدراسية والتمويل",
    turkishScholarships: "المنح التركية وفرص التمويل الأخرى",
    citiesAndLifestyle: "المدن وأسلوب الحياة",
    discoverCities: "اكتشف مدن تركيا الصديقة للطلاب",
    economyAndLivingCosts: "الاقتصاد وتكاليف المعيشة",
    currentEconomicSituation: "الوضع الاقتصادي الحالي ونفقات المعيشة",
    whyTurkey: "لماذا تركيا؟",
    strategicLocation: "الموقع الاستراتيجي",
    strategicLocationDesc: "جسر بين أوروبا وآسيا مع موقع استراتيجي",
    culturalRichness: "الثراء الثقافي",
    culturalRichnessDesc: "آلاف السنين من التاريخ والبيئة متعددة الثقافات",
    hospitality: "الضيافة",
    hospitalityDesc: "الضيافة والدفء التركي المشهور عالمياً",
    easyAccess: "سهولة الوصول",
    easyAccessDesc: "بوابة إلى العالم مع روابط مواصلات ممتازة",
    startEducationalJourney: "ابدأ رحلتك التعليمية في تركيا اليوم",
    guideFromApplication: "نرشدك من عملية التقديم إلى التخرج",
    applyNow: "قدم الآن",
    learnMore: "اعرف أكثر",
    
    // Form
    fullName: "الاسم الكامل",
    nationality: "الجنسية",
    whatsapp: "رقم الواتساب",
    educationLevel: "المستوى التعليمي",
    studyField: "مجال الدراسة المفضل",
    languageOfInstruction: "لغة التدريس",
    startApplication: "بدء التقديم",
    submit: "إرسال الطلب",
    
    // About
    aboutTitle: "حول إيدوباس",
    aboutDescription: "بخبرة تزيد عن 10 سنوات، ساعدنا بنجاح آلاف الطلاب على تحقيق أحلامهم في الدراسة بالخارج. فريقنا المتخصص يقدم التوجيه الشخصي طوال رحلتك التعليمية.",
    
    // Contact
    contactTitle: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "قصص نجاح الطلاب",
    hearFromStudents: "استمع لطلابنا الذين يدرسون الآن في أفضل الجامعات حول العالم",
    successRate: "معدل النجاح",
    ofStudentsAccepted: "من طلابنا يحصلون على القبول",
    scholarshipsSecured: "تم تأمينها لطلابنا",
    partnerUniversities: "مؤسسة شريكة حول العالم",
    studyDestinations: "وجهة دراسية",
    videoTestimonials: "شهادات فيديو",
    watchStudentExperiences: "شاهد طلابنا يشاركون تجاربهم",
    studentSuccessStory: "قصة نجاح طالب",
    watchHowWeHelped: "شاهد كيف ساعدنا الطلاب على تحقيق أحلامهم",
    readyToWriteStory: "مستعد لكتابة قصة نجاحك؟",
    joinThousandsOfStudents: "انضم لآلاف الطلاب الذين حققوا أحلامهم التعليمية الدولية بمساعدتنا.",
    freeConsultation: "استشارة مجانية",
    bookThirtyMinuteCall: "احجز مكالمة مدتها 30 دقيقة لمناقشة أهدافك"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Apply RTL/LTR and language settings
  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.lang = language;
    
    if (isRtl) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
