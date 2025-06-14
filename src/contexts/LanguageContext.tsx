
import React, { createContext, useContext } from 'react';

export type Language = 'en';

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
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = 'en';

  // Set document to English and LTR
  React.useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.lang = 'en';
    document.documentElement.classList.remove('rtl');
  }, []);

  const setLanguage = (lang: Language) => {
    // Only English is supported, so this function does nothing
    console.log('Language switching disabled - English only');
  };

  const t = (key: string): string => {
    const translation = translations.en[key as keyof typeof translations.en];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
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
