import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    testimonials: 'Testimonials',
    universities: 'Universities',
    scholarships: 'Scholarships',
    cities: 'Cities',
    economy: 'Economy',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    account: 'Account',
    
    // Common
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    apply: 'Apply',
    applyNow: 'Apply Now',
    
    // Hero Section
    heroTitle: 'Your Gateway to Global Education',
    heroSubtitle: 'We help students from the Middle East and North Africa achieve their dreams of studying abroad with personalized guidance and expert support.',
    welcomeSubtitle: 'Your complete guide to studying in Turkey - from universities to scholarships, cities to living costs.',
    
    // About Section
    aboutTitle: 'About EduConsult',
    aboutDescription: 'EduConsult is a leading educational consultancy specializing in helping MENA students navigate their journey to international education.',
    
    // Services
    servicesTitle: 'Our Services',
    universitySelection: 'University Selection',
    applicationSupport: 'Application Support',
    visaAssistance: 'Visa Assistance',
    scholarshipGuidance: 'Scholarship Guidance',
    universityAdmission: 'University Admission',
    visaGuidance: 'Visa Guidance',
    accommodation: 'Accommodation',
    
    // Countries
    studyDestinations: 'Study Destinations',
    popularCountries: 'Popular Countries',
    
    // Testimonials
    studentSuccessStories: 'Student Success Stories',
    hearFromStudents: 'Hear from students who achieved their dreams with our guidance',
    successRate: 'Success Rate',
    ofStudentsAccepted: 'of students accepted',
    scholarshipsSecured: 'in scholarships secured',
    partnerUniversities: 'partner universities',
    videoTestimonials: 'Video Testimonials',
    watchStudentExperiences: 'Watch real student experiences and success stories',
    studentSuccessStory: 'Student Success Story',
    watchHowWeHelped: 'Watch how we helped students achieve their dreams',
    readyToWriteStory: 'Ready to Write Your Success Story?',
    joinThousandsOfStudents: 'Join thousands of students who have achieved their dreams with our guidance',
    freeConsultation: 'Free Consultation',
    bookThirtyMinuteCall: 'Book a 30-minute consultation call with our expert advisors',
    
    // Contact
    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch',
    
    // Footer
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All rights reserved.',
  },
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    services: 'Hizmetler',
    contact: 'İletişim',
    testimonials: 'Referanslar',
    universities: 'Üniversiteler',
    scholarships: 'Burslar',
    cities: 'Şehirler',
    economy: 'Ekonomi',
    
    // Auth
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    signOut: 'Çıkış Yap',
    account: 'Hesap',
    
    // Common
    getStarted: 'Başla',
    learnMore: 'Daha Fazla Öğren',
    readMore: 'Devamını Oku',
    viewAll: 'Tümünü Gör',
    apply: 'Başvur',
    applyNow: 'Şimdi Başvur',
    
    // Hero Section
    heroTitle: 'Küresel Eğitime Açılan Kapınız',
    heroSubtitle: 'Orta Doğu ve Kuzey Afrika öğrencilerinin yurtdışında eğitim görme hayallerini kişiselleştirilmiş rehberlik ve uzman desteği ile gerçekleştirmelerine yardımcı oluyoruz.',
    welcomeSubtitle: 'Türkiye\'de eğitim için eksiksiz rehberiniz - üniversitelerden burslara, şehirlerden yaşam maliyetlerine.',
    
    // About Section
    aboutTitle: 'EduConsult Hakkında',
    aboutDescription: 'EduConsult, MENA öğrencilerinin uluslararası eğitim yolculuklarında rehberlik etme konusunda uzmanlaşmış önde gelen bir eğitim danışmanlığıdır.',
    
    // Services
    servicesTitle: 'Hizmetlerimiz',
    universitySelection: 'Üniversite Seçimi',
    applicationSupport: 'Başvuru Desteği',
    visaAssistance: 'Vize Yardımı',
    scholarshipGuidance: 'Burs Rehberliği',
    universityAdmission: 'Üniversite Kabul',
    visaGuidance: 'Vize Rehberliği',
    accommodation: 'Konaklama',
    
    // Countries
    studyDestinations: 'Eğitim Destinasyonları',
    popularCountries: 'Popüler Ülkeler',
    
    // Testimonials
    studentSuccessStories: 'Öğrenci Başarı Hikayeleri',
    hearFromStudents: 'Rehberliğimizle hayallerine kavuşan öğrencilerden dinleyin',
    successRate: 'Başarı Oranı',
    ofStudentsAccepted: 'öğrenci kabul edildi',
    scholarshipsSecured: 'burs güvence altına alındı',
    partnerUniversities: 'partner üniversite',
    videoTestimonials: 'Video Referanslar',
    watchStudentExperiences: 'Gerçek öğrenci deneyimlerini ve başarı hikayelerini izleyin',
    studentSuccessStory: 'Öğrenci Başarı Hikayesi',
    watchHowWeHelped: 'Öğrencilerin hayallerine kavuşmalarına nasıl yardımcı olduğumuzu izleyin',
    readyToWriteStory: 'Başarı Hikayenizi Yazmaya Hazır mısınız?',
    joinThousandsOfStudents: 'Rehberliğimizle hayallerine kavuşan binlerce öğrenciye katılın',
    freeConsultation: 'Ücretsiz Danışmanlık',
    bookThirtyMinuteCall: 'Uzman danışmanlarımızla 30 dakikalık danışmanlık görüşmesi ayarlayın',
    
    // Contact
    contactUs: 'Bizimle İletişime Geçin',
    getInTouch: 'İletişim Kurun',
    
    // Footer
    quickLinks: 'Hızlı Bağlantılar',
    followUs: 'Bizi Takip Edin',
    allRightsReserved: 'Tüm hakları saklıdır.',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    contact: 'Contact',
    testimonials: 'Témoignages',
    universities: 'Universités',
    scholarships: 'Bourses',
    cities: 'Villes',
    economy: 'Économie',
    
    // Auth
    signIn: 'Se Connecter',
    signUp: 'S\'inscrire',
    signOut: 'Se Déconnecter',
    account: 'Compte',
    
    // Common
    getStarted: 'Commencer',
    learnMore: 'En Savoir Plus',
    readMore: 'Lire Plus',
    viewAll: 'Voir Tout',
    apply: 'Postuler',
    applyNow: 'Postuler Maintenant',
    
    // Hero Section
    heroTitle: 'Votre Passerelle vers l\'Éducation Mondiale',
    heroSubtitle: 'Nous aidons les étudiants du Moyen-Orient et d\'Afrique du Nord à réaliser leurs rêves d\'étudier à l\'étranger avec des conseils personnalisés et un soutien expert.',
    welcomeSubtitle: 'Votre guide complet pour étudier en Turquie - des universités aux bourses, des villes aux coûts de la vie.',
    
    // About Section
    aboutTitle: 'À Propos d\'EduConsult',
    aboutDescription: 'EduConsult est un cabinet de conseil éducatif de premier plan spécialisé dans l\'aide aux étudiants MENA pour naviguer dans leur parcours vers l\'éducation internationale.',
    
    // Services
    servicesTitle: 'Nos Services',
    universitySelection: 'Sélection d\'Université',
    applicationSupport: 'Support de Candidature',
    visaAssistance: 'Assistance Visa',
    scholarshipGuidance: 'Orientation Bourses',
    universityAdmission: 'Admission Universitaire',
    visaGuidance: 'Orientation Visa',
    accommodation: 'Hébergement',
    
    // Countries
    studyDestinations: 'Destinations d\'Études',
    popularCountries: 'Pays Populaires',
    
    // Testimonials
    studentSuccessStories: 'Histoires de Réussite des Étudiants',
    hearFromStudents: 'Écoutez les étudiants qui ont réalisé leurs rêves grâce à nos conseils',
    successRate: 'Taux de Réussite',
    ofStudentsAccepted: 'des étudiants acceptés',
    scholarshipsSecured: 'de bourses sécurisées',
    partnerUniversities: 'universités partenaires',
    videoTestimonials: 'Témoignages Vidéo',
    watchStudentExperiences: 'Regardez de vraies expériences d\'étudiants et des histoires de réussite',
    studentSuccessStory: 'Histoire de Réussite d\'Étudiant',
    watchHowWeHelped: 'Regardez comment nous avons aidé les étudiants à réaliser leurs rêves',
    readyToWriteStory: 'Prêt à Écrire Votre Histoire de Réussite?',
    joinThousandsOfStudents: 'Rejoignez des milliers d\'étudiants qui ont réalisé leurs rêves grâce à nos conseils',
    freeConsultation: 'Consultation Gratuite',
    bookThirtyMinuteCall: 'Réservez un appel de consultation de 30 minutes avec nos conseillers experts',
    
    // Contact
    contactUs: 'Contactez-Nous',
    getInTouch: 'Entrer en Contact',
    
    // Footer
    quickLinks: 'Liens Rapides',
    followUs: 'Suivez-Nous',
    allRightsReserved: 'Tous droits réservés.',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'حولنا',
    services: 'الخدمات',
    contact: 'اتصل بنا',
    testimonials: 'الشهادات',
    universities: 'الجامعات',
    scholarships: 'المنح الدراسية',
    cities: 'المدن',
    economy: 'الاقتصاد',
    
    // Auth
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    account: 'الحساب',
    
    // Common
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    readMore: 'اقرأ المزيد',
    viewAll: 'عرض الكل',
    apply: 'تقديم طلب',
    applyNow: 'تقدم الآن',
    
    // Hero Section
    heroTitle: 'بوابتك إلى التعليم العالمي',
    heroSubtitle: 'نساعد الطلاب من الشرق الأوسط وشمال أفريقيا على تحقيق أحلامهم في الدراسة بالخارج من خلال التوجيه الشخصي والدعم المتخصص.',
    welcomeSubtitle: 'دليلك الشامل للدراسة في تركيا - من الجامعات إلى المنح الدراسية، من المدن إلى تكاليف المعيشة.',
    
    // About Section
    aboutTitle: 'حول EduConsult',
    aboutDescription: 'EduConsult هي شركة استشارات تعليمية رائدة متخصصة في مساعدة طلاب منطقة الشرق الأوسط وشمال أفريقيا في رحلتهم نحو التعليم الدولي.',
    
    // Services
    servicesTitle: 'خدماتنا',
    universitySelection: 'اختيار الجامعة',
    applicationSupport: 'دعم التطبيق',
    visaAssistance: 'مساعدة التأشيرة',
    scholarshipGuidance: 'إرشاد المنح الدراسية',
    universityAdmission: 'قبول الجامعة',
    visaGuidance: 'إرشاد التأشيرة',
    accommodation: 'السكن',
    
    // Countries
    studyDestinations: 'وجهات الدراسة',
    popularCountries: 'البلدان الشعبية',
    
    // Testimonials
    studentSuccessStories: 'قصص نجاح الطلاب',
    hearFromStudents: 'استمع إلى الطلاب الذين حققوا أحلامهم بتوجيهنا',
    successRate: 'معدل النجاح',
    ofStudentsAccepted: 'من الطلاب المقبولين',
    scholarshipsSecured: 'من المنح الدراسية المضمونة',
    partnerUniversities: 'الجامعات الشريكة',
    videoTestimonials: 'شهادات فيديو',
    watchStudentExperiences: 'شاهد تجارب الطلاب الحقيقية وقصص النجاح',
    studentSuccessStory: 'قصة نجاح طالب',
    watchHowWeHelped: 'شاهد كيف ساعدنا الطلاب في تحقيق أحلامهم',
    readyToWriteStory: 'مستعد لكتابة قصة نجاحك؟',
    joinThousandsOfStudents: 'انضم إلى آلاف الطلاب الذين حققوا أحلامهم بتوجيهنا',
    freeConsultation: 'استشارة مجانية',
    bookThirtyMinuteCall: 'احجز مكالمة استشارية لمدة 30 دقيقة مع مستشارينا الخبراء',
    
    // Contact
    contactUs: 'اتصل بنا',
    getInTouch: 'تواصل معنا',
    
    // Footer
    quickLinks: 'روابط سريعة',
    followUs: 'تابعنا',
    allRightsReserved: 'جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
