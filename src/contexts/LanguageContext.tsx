
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
    aboutTitle: "About EduConsult",
    aboutDescription: "With over 10 years of experience, we have successfully helped thousands of students achieve their dreams of studying abroad. Our expert team provides personalized guidance throughout your educational journey.",
    
    // Contact
    contactTitle: "Get in Touch",
    email: "Email",
    phone: "Phone",
    address: "Address",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
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
    aboutTitle: "حول إيدو كونسلت",
    aboutDescription: "مع أكثر من 10 سنوات من الخبرة، ساعدنا بنجاح آلاف الطلاب على تحقيق أحلامهم في الدراسة بالخارج. فريقنا المتخصص يقدم إرشادًا مخصصًا طوال رحلتك التعليمية.",
    
    // Contact
    contactTitle: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع المظلم",
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
    aboutTitle: "À propos d'EduConsult",
    aboutDescription: "Avec plus de 10 ans d'expérience, nous avons aidé avec succès des milliers d'étudiants à réaliser leurs rêves d'étudier à l'étranger. Notre équipe d'experts fournit des conseils personnalisés tout au long de votre parcours éducatif.",
    
    // Contact
    contactTitle: "Contactez-nous",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse",
    
    // Theme
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
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
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
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
