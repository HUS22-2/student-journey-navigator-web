
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar' | 'fr';

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
    testimonials: "آراء الطلاب",
    
    // Hero Section
    welcomeTitle: "بوابتك للتعليم العالمي",
    welcomeSubtitle: "نساعد الطلاب الدوليين على تحقيق أحلامهم في الدراسة بالخارج من خلال التوجيه المخصص والدعم المتخصص.",
    chooseCountry: "في أي دولة تريد الدراسة؟",
    startJourney: "ابدأ رحلتك",
    
    // Countries
    turkey: "تركيا",
    france: "فرنسا",
    tunisia: "تونس",
    canada: "كندا",
    morocco: "المغرب",
    russia: "روسيا",
    
    // Services
    universityAdmission: "قبول جامعي",
    scholarships: "منح دراسية",
    visaGuidance: "إرشاد التأشيرة",
    accommodation: "السكن",
    
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
    aboutTitle: "حول إيدو باس",
    aboutDescription: "مع أكثر من 10 سنوات من الخبرة، ساعدنا بنجاح آلاف الطلاب على تحقيق أحلامهم في الدراسة بالخارج. فريقنا المتخصص يقدم إرشادًا مخصصًا طوال رحلتك التعليمية.",
    
    // Contact
    contactTitle: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع المظلم",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "قصص نجاح الطلاب",
    hearFromStudents: "استمع من طلابنا الذين يدرسون الآن في أفضل الجامعات حول العالم",
    successRate: "معدل النجاح",
    ofStudentsAccepted: "من طلابنا يتم قبولهم",
    scholarshipsSecured: "تم تأمينها لطلابنا",
    partnerUniversities: "مؤسسة شريكة حول العالم",
    studyDestinations: "وجهات الدراسة",
    videoTestimonials: "شهادات فيديو",
    watchStudentExperiences: "شاهد طلابنا يشاركون تجاربهم",
    studentSuccessStory: "قصة نجاح طالب",
    watchHowWeHelped: "شاهد كيف ساعدنا الطلاب على تحقيق أحلامهم",
    readyToWriteStory: "هل أنت مستعد لكتابة قصة نجاحك؟",
    joinThousandsOfStudents: "انضم إلى آلاف الطلاب الذين حققوا أحلامهم في التعليم الدولي بمساعدتنا.",
    freeConsultation: "استشارة مجانية",
    bookThirtyMinuteCall: "احجز مكالمة لمدة 30 دقيقة لمناقشة أهدافك"
  },
  fr: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    services: "Services",
    contact: "Contact",
    testimonials: "Témoignages",
    
    // Hero Section
    welcomeTitle: "Votre Passerelle vers l'Éducation Mondiale",
    welcomeSubtitle: "Nous aidons les étudiants internationaux à réaliser leurs rêves d'étudier à l'étranger avec des conseils personnalisés et un soutien expert.",
    chooseCountry: "Dans quel pays voulez-vous étudier ?",
    startJourney: "Commencez Votre Voyage",
    
    // Countries
    turkey: "Turquie",
    france: "France",
    tunisia: "Tunisie",
    canada: "Canada",
    morocco: "Maroc",
    russia: "Russie",
    
    // Services
    universityAdmission: "Admission Universitaire",
    scholarships: "Bourses d'Études",
    visaGuidance: "Conseils Visa",
    accommodation: "Hébergement",
    
    // Form
    fullName: "Nom Complet",
    nationality: "Nationalité",
    whatsapp: "Numéro WhatsApp",
    educationLevel: "Niveau d'Éducation",
    studyField: "Domaine d'Étude Préféré",
    languageOfInstruction: "Langue d'Instruction",
    startApplication: "Commencer la Candidature",
    submit: "Soumettre la Candidature",
    
    // About
    aboutTitle: "À propos d'EDUPASS",
    aboutDescription: "Avec plus de 10 ans d'expérience, nous avons aidé avec succès des milliers d'étudiants à réaliser leurs rêves d'étudier à l'étranger. Notre équipe d'experts fournit des conseils personnalisés tout au long de votre parcours éducatif.",
    
    // Contact
    contactTitle: "Contactez-nous",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    
    // Theme
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "Histoires de Réussite d'Étudiants",
    hearFromStudents: "Écoutez nos étudiants qui étudient maintenant dans les meilleures universités du monde",
    successRate: "Taux de Réussite",
    ofStudentsAccepted: "de nos étudiants sont acceptés",
    scholarshipsSecured: "sécurisées pour nos étudiants",
    partnerUniversities: "institutions partenaires dans le monde",
    studyDestinations: "destinations d'études",
    videoTestimonials: "Témoignages Vidéo",
    watchStudentExperiences: "Regardez nos étudiants partager leurs expériences",
    studentSuccessStory: "Histoire de Réussite d'Étudiant",
    watchHowWeHelped: "Regardez comment nous avons aidé les étudiants à réaliser leurs rêves",
    readyToWriteStory: "Prêt à Écrire Votre Histoire de Réussite ?",
    joinThousandsOfStudents: "Rejoignez des milliers d'étudiants qui ont réalisé leurs rêves d'éducation internationale avec notre aide.",
    freeConsultation: "Consultation Gratuite",
    bookThirtyMinuteCall: "Réservez un appel de 30 minutes pour discuter de vos objectifs"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0] as Language;
    if (['en', 'ar', 'fr'].includes(browserLang)) {
      setLanguage(browserLang);
    }
    
    // Apply proper RTL styles to document
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.lang = language;
    }
  }, [language]);

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
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
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
