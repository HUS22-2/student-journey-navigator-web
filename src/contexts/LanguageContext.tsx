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
    startJourney: 'Start Your Journey',
    
    // Index Page Content
    everythingAboutTurkey: 'Everything About Turkey',
    allInformationNeeded: 'All the information you need to study in Turkey in one place',
    universitiesAndPrograms: 'Universities & Programs',
    exploreUniversities: 'Explore top Turkish universities and their programs',
    scholarshipsAndFunding: 'Scholarships & Funding',
    turkishScholarships: 'Discover Turkish government and university scholarships',
    citiesAndLifestyle: 'Cities & Lifestyle',
    discoverCities: 'Discover the best cities to live and study in Turkey',
    economyAndLivingCosts: 'Economy & Living Costs',
    currentEconomicSituation: 'Current economic situation and living expenses in Turkey',
    whyTurkey: 'Why Turkey?',
    strategicLocation: 'Strategic Location',
    strategicLocationDesc: 'Between Europe and Asia, connecting two continents',
    culturalRichness: 'Cultural Richness',
    culturalRichnessDesc: 'Rich history and diverse cultural heritage',
    hospitality: 'Turkish Hospitality',
    hospitalityDesc: 'Warm and welcoming people who embrace international students',
    easyAccess: 'Easy Access',
    easyAccessDesc: 'Well-connected to Europe, Asia, and the Middle East',
    internationalStudents: 'International Students',
    provinces: 'Provinces',
    seasons: 'Seasons',
    startEducationalJourney: 'Start Your Educational Journey in Turkey',
    guideFromApplication: 'We guide you from application to graduation with expert support',
    
    // About Section
    aboutTitle: 'About EduConsult',
    aboutDescription: 'EduConsult is a leading educational consultancy specializing in helping MENA students navigate their journey to international education.',
    
    // About Page Stats
    studentsHelped: 'Students Helped',
    successRate: 'Success Rate',
    countries: 'Countries',
    yearsExperience: 'Years Experience',
    
    // About Page Mission
    ourMission: 'Our Mission',
    missionDescription1: 'To bridge the gap between talented students from the MENA region and world-class educational opportunities abroad. We believe that every student deserves access to quality education, regardless of their geographical location or financial circumstances.',
    missionDescription2: 'Our team of experienced consultants works tirelessly to match students with programs that align with their academic goals, career aspirations, and personal values. We provide comprehensive support throughout the entire journey, from initial consultation to graduation.',
    ourVision: 'Our Vision',
    visionDescription: 'To become the most trusted educational consultancy in the MENA region, known for our commitment to student success and ethical practices.',
    
    // About Page Team
    meetOurTeam: 'Meet Our Team',
    teamDescription: 'Our diverse team of education experts, visa specialists, and student advisors are here to guide you every step of the way.',
    
    // About Page Values
    ourCoreValues: 'Our Core Values',
    trustIntegrity: 'Trust & Integrity',
    trustDescription: 'We maintain the highest standards of honesty and transparency in all our interactions with students and partner institutions.',
    excellence: 'Excellence',
    excellenceDescription: 'We strive for excellence in everything we do, from our consultation services to our ongoing support for students abroad.',
    studentCentered: 'Student-Centered',
    studentCenteredDescription: 'Every decision we make is guided by what is best for our students. Their success is our success.',
    
    // Services
    servicesTitle: 'Our Services',
    ourServices: 'Our Services',
    comprehensiveSupport: 'Comprehensive support for your educational journey from start to finish',
    universitySelection: 'University Selection',
    applicationSupport: 'Application Support',
    visaAssistance: 'Visa Assistance',
    scholarshipGuidance: 'Scholarship Guidance',
    universityAdmission: 'University Admission',
    universityAdmissionDesc: 'Complete guidance for university applications and admissions process',
    applicationDocuments: 'Application Documents Preparation',
    personalStatement: 'Personal Statement Writing',
    interviewPrep: 'Interview Preparation',
    applicationSubmission: 'Application Submission Support',
    scholarshipsDesc: 'Find and apply for scholarships to fund your education abroad',
    scholarshipDatabase: 'Scholarship Database Access',
    eligibilityAssessment: 'Eligibility Assessment',
    applicationAssistance: 'Application Assistance',
    essayWriting: 'Essay Writing Support',
    financialAid: 'Financial Aid Guidance',
    visaGuidance: 'Visa Guidance',
    visaGuidanceDesc: 'Complete visa application support and guidance',
    visaConsultation: 'Visa Consultation',
    documentChecklist: 'Document Checklist',
    embassyAppointment: 'Embassy Appointment Scheduling',
    postArrival: 'Post-Arrival Support',
    accommodation: 'Accommodation',
    accommodationDesc: 'Help finding suitable accommodation for your studies',
    universityDorms: 'University Dormitories',
    privateHousing: 'Private Housing Options',
    rentalAgreement: 'Rental Agreement Support',
    areaRecommendations: 'Area Recommendations',
    moveInSupport: 'Move-in Support',
    ourProcess: 'Our Process',
    simpleStepByStep: 'Simple step-by-step process to achieve your educational goals',
    initialConsultation: 'Initial Consultation',
    initialConsultationDesc: 'Free consultation to understand your goals and create a personalized plan',
    personalizedPlan: 'Personalized Plan',
    personalizedPlanDesc: 'Custom roadmap tailored to your academic and career objectives',
    applicationSupportDesc: 'Complete support throughout the application process',
    successBeyond: 'Success & Beyond',
    successBeyondDesc: 'Ongoing support even after you start your studies abroad',
    readyToStart: 'Ready to Start Your Journey?',
    contactToday: 'Contact us today for a free consultation and take the first step towards your dream education',
    scheduleConsultation: 'Schedule Consultation',
    viewSuccessStories: 'View Success Stories',
    
    // Countries
    studyDestinations: 'Study Destinations',
    popularCountries: 'Popular Countries',
    
    // Testimonials
    studentSuccessStories: 'Student Success Stories',
    hearFromStudents: 'Hear from students who achieved their dreams with our guidance',
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
    startJourney: 'Yolculuğunu Başlat',
    
    // Index Page Content
    everythingAboutTurkey: 'Türkiye Hakkında Her Şey',
    allInformationNeeded: 'Türkiye\'de eğitim görmek için ihtiyacınız olan tüm bilgiler tek yerde',
    universitiesAndPrograms: 'Üniversiteler ve Programlar',
    exploreUniversities: 'Türkiye\'nin en iyi üniversitelerini ve programlarını keşfedin',
    scholarshipsAndFunding: 'Burslar ve Finansman',
    turkishScholarships: 'Türk hükümeti ve üniversite burslarını keşfedin',
    citiesAndLifestyle: 'Şehirler ve Yaşam Tarzı',
    discoverCities: 'Türkiye\'de yaşamak ve okumak için en iyi şehirleri keşfedin',
    economyAndLivingCosts: 'Ekonomi ve Yaşam Maliyetleri',
    currentEconomicSituation: 'Türkiye\'deki mevcut ekonomik durum ve yaşam giderleri',
    whyTurkey: 'Neden Türkiye?',
    strategicLocation: 'Stratejik Konum',
    strategicLocationDesc: 'Avrupa ve Asya arasında, iki kıtayı birleştiren konum',
    culturalRichness: 'Kültürel Zenginlik',
    culturalRichnessDesc: 'Zengin tarih ve çeşitli kültürel miras',
    hospitality: 'Türk Misafirperverliği',
    hospitalityDesc: 'Uluslararası öğrencileri kucaklayan sıcak ve misafirperver insanlar',
    easyAccess: 'Kolay Erişim',
    easyAccessDesc: 'Avrupa, Asya ve Orta Doğu\'ya iyi bağlantılı',
    internationalStudents: 'Uluslararası Öğrenciler',
    provinces: 'İl',
    seasons: 'Mevsim',
    startEducationalJourney: 'Türkiye\'de Eğitim Yolculuğunuzu Başlatın',
    guideFromApplication: 'Başvurudan mezuniyete kadar uzman desteği ile size rehberlik ediyoruz',
    
    // About Section
    aboutTitle: 'EduConsult Hakkında',
    aboutDescription: 'EduConsult, MENA öğrencilerinin uluslararası eğitim yolculuklarında rehberlik etme konusunda uzmanlaşmış önde gelen bir eğitim danışmanlığıdır.',
    
    // About Page Stats
    studentsHelped: 'Yardım Edilen Öğrenciler',
    successRate: 'Başarı Oranı',
    countries: 'Ülkeler',
    yearsExperience: 'Yıllık Deneyim',
    
    // About Page Mission
    ourMission: 'Misyonumuz',
    missionDescription1: 'MENA bölgesindeki yetenekli öğrenciler ile yurtdışındaki dünya standartlarındaki eğitim fırsatları arasındaki köprüyü kurmak. Her öğrencinin coğrafi konumu veya mali durumu ne olursa olsun kaliteli eğitime erişim hakkı olduğuna inanıyoruz.',
    missionDescription2: 'Deneyimli danışmanlardan oluşan ekibimiz, öğrencileri akademik hedefleri, kariyer aspirasyonları ve kişisel değerleri ile uyumlu programlarla eşleştirmek için yorulmadan çalışmaktadır. İlk danışmanlıktan mezuniyete kadar tüm yolculuk boyunca kapsamlı destek sağlıyoruz.',
    ourVision: 'Vizyonumuz',
    visionDescription: 'MENA bölgesindeki en güvenilir eğitim danışmanlığı olmak, öğrenci başarısına olan bağlılığımız ve etik uygulamalarımızla tanınmak.',
    
    // About Page Team
    meetOurTeam: 'Ekibimizle Tanışın',
    teamDescription: 'Eğitim uzmanları, vize uzmanları ve öğrenci danışmanlarından oluşan çeşitli ekibimiz her adımda size rehberlik etmek için burada.',
    
    // About Page Values
    ourCoreValues: 'Temel Değerlerimiz',
    trustIntegrity: 'Güven ve Dürüstlük',
    trustDescription: 'Öğrenciler ve partner kurumlarla olan tüm etkileşimlerimizde en yüksek dürüstlük ve şeffaflık standartlarını koruyoruz.',
    excellence: 'Mükemmellik',
    excellenceDescription: 'Danışmanlık hizmetlerimizden yurtdışındaki öğrencilere sürekli desteğimize kadar yaptığımız her şeyde mükemmellik için çaba gösteriyoruz.',
    studentCentered: 'Öğrenci Odaklı',
    studentCenteredDescription: 'Aldığımız her karar öğrencilerimiz için en iyi olanla yönlendirilir. Onların başarısı bizim başarımızdır.',
    
    // Services
    servicesTitle: 'Hizmetlerimiz',
    ourServices: 'Hizmetlerimiz',
    comprehensiveSupport: 'Başlangıçtan bitişe kadar eğitim yolculuğunuz için kapsamlı destek',
    universitySelection: 'Üniversite Seçimi',
    applicationSupport: 'Başvuru Desteği',
    visaAssistance: 'Vize Yardımı',
    scholarshipGuidance: 'Burs Rehberliği',
    universityAdmission: 'Üniversite Kabul',
    universityAdmissionDesc: 'Üniversite başvuruları ve kabul süreci için eksiksiz rehberlik',
    applicationDocuments: 'Başvuru Belgelerinin Hazırlanması',
    personalStatement: 'Kişisel Açıklama Yazımı',
    interviewPrep: 'Mülakat Hazırlığı',
    applicationSubmission: 'Başvuru Gönderme Desteği',
    scholarshipsDesc: 'Yurtdışında eğitiminizi finanse etmek için burs bulun ve başvurun',
    scholarshipDatabase: 'Burs Veritabanı Erişimi',
    eligibilityAssessment: 'Uygunluk Değerlendirmesi',
    applicationAssistance: 'Başvuru Yardımı',
    essayWriting: 'Kompozisyon Yazma Desteği',
    financialAid: 'Mali Yardım Rehberliği',
    visaGuidance: 'Vize Rehberliği',
    visaGuidanceDesc: 'Eksiksiz vize başvuru desteği ve rehberlik',
    visaConsultation: 'Vize Danışmanlığı',
    documentChecklist: 'Belge Kontrol Listesi',
    embassyAppointment: 'Büyükelçilik Randevu Planlaması',
    postArrival: 'Varış Sonrası Destek',
    accommodation: 'Konaklama',
    accommodationDesc: 'Eğitiminiz için uygun konaklama bulma konusunda yardım',
    universityDorms: 'Üniversite Yurtları',
    privateHousing: 'Özel Konut Seçenekleri',
    rentalAgreement: 'Kira Sözleşmesi Desteği',
    areaRecommendations: 'Bölge Önerileri',
    moveInSupport: 'Taşınma Desteği',
    ourProcess: 'Sürecimiz',
    simpleStepByStep: 'Eğitim hedeflerinize ulaşmak için basit adım adım süreç',
    initialConsultation: 'İlk Danışmanlık',
    initialConsultationDesc: 'Hedeflerinizi anlamak ve kişiselleştirilmiş plan oluşturmak için ücretsiz danışmanlık',
    personalizedPlan: 'Kişiselleştirilmiş Plan',
    personalizedPlanDesc: 'Akademik ve kariyer hedeflerinize göre özelleştirilmiş yol haritası',
    applicationSupportDesc: 'Başvuru süreci boyunca eksiksiz destek',
    successBeyond: 'Başarı ve Ötesi',
    successBeyondDesc: 'Yurtdışında eğitiminizi başlattıktan sonra bile devam eden destek',
    readyToStart: 'Yolculuğunuzu Başlatmaya Hazır mısınız?',
    contactToday: 'Ücretsiz danışmanlık için bugün bizimle iletişime geçin ve hayalinizdeki eğitime doğru ilk adımı atın',
    scheduleConsultation: 'Danışmanlık Planlayın',
    viewSuccessStories: 'Başarı Hikayelerini Görüntüleyin',
    
    // Countries
    studyDestinations: 'Eğitim Destinasyonları',
    popularCountries: 'Popüler Ülkeler',
    
    // Testimonials
    studentSuccessStories: 'Öğrenci Başarı Hikayeleri',
    hearFromStudents: 'Rehberliğimizle hayallerine kavuşan öğrencilerden dinleyin',
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
    startJourney: 'Commencez Votre Voyage',
    
    // Index Page Content
    everythingAboutTurkey: 'Tout Sur La Turquie',
    allInformationNeeded: 'Toutes les informations dont vous avez besoin pour étudier en Turquie en un seul endroit',
    universitiesAndPrograms: 'Universités et Programmes',
    exploreUniversities: 'Explorez les meilleures universités turques et leurs programmes',
    scholarshipsAndFunding: 'Bourses et Financement',
    turkishScholarships: 'Découvrez les bourses du gouvernement turc et des universités',
    citiesAndLifestyle: 'Villes et Mode de Vie',
    discoverCities: 'Découvrez les meilleures villes pour vivre et étudier en Turquie',
    economyAndLivingCosts: 'Économie et Coûts de la Vie',
    currentEconomicSituation: 'Situation économique actuelle et frais de subsistance en Turquie',
    whyTurkey: 'Pourquoi la Turquie?',
    strategicLocation: 'Emplacement Stratégique',
    strategicLocationDesc: 'Entre l\'Europe et l\'Asie, reliant deux continents',
    culturalRichness: 'Richesse Culturelle',
    culturalRichnessDesc: 'Histoire riche et patrimoine culturel diversifié',
    hospitality: 'Hospitalité Turque',
    hospitalityDesc: 'Des gens chaleureux et accueillants qui embrassent les étudiants internationaux',
    easyAccess: 'Accès Facile',
    easyAccessDesc: 'Bien connecté à l\'Europe, l\'Asie et le Moyen-Orient',
    internationalStudents: 'Étudiants Internationaux',
    provinces: 'Provinces',
    seasons: 'Saisons',
    startEducationalJourney: 'Commencez Votre Parcours Éducatif en Turquie',
    guideFromApplication: 'Nous vous guidons de la candidature à la diplômation avec un soutien expert',
    
    // About Section
    aboutTitle: 'À Propos d\'EduConsult',
    aboutDescription: 'EduConsult est un cabinet de conseil éducatif de premier plan spécialisé dans l\'aide aux étudiants MENA pour naviguer dans leur parcours vers l\'éducation internationale.',
    
    // About Page Stats
    studentsHelped: 'Étudiants Aidés',
    successRate: 'Taux de Réussite',
    countries: 'Pays',
    yearsExperience: 'Années d\'Expérience',
    
    // About Page Mission
    ourMission: 'Notre Mission',
    missionDescription1: 'Combler le fossé entre les étudiants talentueux de la région MENA et les opportunités éducatives de classe mondiale à l\'étranger. Nous croyons que chaque étudiant mérite l\'accès à une éducation de qualité, indépendamment de sa localisation géographique ou de sa situation financière.',
    missionDescription2: 'Notre équipe de consultants expérimentés travaille sans relâche pour faire correspondre les étudiants avec des programmes qui s\'alignent sur leurs objectifs académiques, leurs aspirations professionnelles et leurs valeurs personnelles. Nous fournissons un soutien complet tout au long du parcours, de la consultation initiale à la diplomation.',
    ourVision: 'Notre Vision',
    visionDescription: 'Devenir le cabinet de conseil éducatif le plus fiable de la région MENA, connu pour notre engagement envers le succès des étudiants et nos pratiques éthiques.',
    
    // About Page Team
    meetOurTeam: 'Rencontrez Notre Équipe',
    teamDescription: 'Notre équipe diversifiée d\'experts en éducation, de spécialistes des visas et de conseillers étudiants sont là pour vous guider à chaque étape.',
    
    // About Page Values
    ourCoreValues: 'Nos Valeurs Fondamentales',
    trustIntegrity: 'Confiance et Intégrité',
    trustDescription: 'Nous maintenons les plus hauts standards d\'honnêteté et de transparence dans toutes nos interactions avec les étudiants et les institutions partenaires.',
    excellence: 'Excellence',
    excellenceDescription: 'Nous nous efforçons d\'atteindre l\'excellence dans tout ce que nous faisons, de nos services de consultation à notre soutien continu pour les étudiants à l\'étranger.',
    studentCentered: 'Centré sur l\'Étudiant',
    studentCenteredDescription: 'Chaque décision que nous prenons est guidée par ce qui est le mieux pour nos étudiants. Leur succès est notre succès.',
    
    // Services
    servicesTitle: 'Nos Services',
    ourServices: 'Nos Services',
    comprehensiveSupport: 'Soutien complet pour votre parcours éducatif du début à la fin',
    universitySelection: 'Sélection d\'Université',
    applicationSupport: 'Support de Candidature',
    visaAssistance: 'Assistance Visa',
    scholarshipGuidance: 'Orientation Bourses',
    universityAdmission: 'Admission Universitaire',
    universityAdmissionDesc: 'Orientation complète pour les candidatures et le processus d\'admission universitaire',
    applicationDocuments: 'Préparation des Documents de Candidature',
    personalStatement: 'Rédaction de Déclaration Personnelle',
    interviewPrep: 'Préparation aux Entretiens',
    applicationSubmission: 'Support de Soumission de Candidature',
    scholarshipsDesc: 'Trouvez et postulez pour des bourses pour financer vos études à l\'étranger',
    scholarshipDatabase: 'Accès à la Base de Données de Bourses',
    eligibilityAssessment: 'Évaluation d\'Éligibilité',
    applicationAssistance: 'Assistance à la Candidature',
    essayWriting: 'Support de Rédaction d\'Essai',
    financialAid: 'Orientation d\'Aide Financière',
    visaGuidance: 'Orientation Visa',
    visaGuidanceDesc: 'Support et orientation complète pour la demande de visa',
    visaConsultation: 'Consultation Visa',
    documentChecklist: 'Liste de Contrôle des Documents',
    embassyAppointment: 'Planification de Rendez-vous à l\'Ambassade',
    postArrival: 'Support Post-Arrivée',
    accommodation: 'Hébergement',
    accommodationDesc: 'Aide pour trouver un hébergement adapté à vos études',
    universityDorms: 'Dortoirs Universitaires',
    privateHousing: 'Options de Logement Privé',
    rentalAgreement: 'Support de Contrat de Location',
    areaRecommendations: 'Recommandations de Quartier',
    moveInSupport: 'Support d\'Emménagement',
    ourProcess: 'Notre Processus',
    simpleStepByStep: 'Processus simple étape par étape pour atteindre vos objectifs éducatifs',
    initialConsultation: 'Consultation Initiale',
    initialConsultationDesc: 'Consultation gratuite pour comprendre vos objectifs et créer un plan personnalisé',
    personalizedPlan: 'Plan Personnalisé',
    personalizedPlanDesc: 'Feuille de route personnalisée adaptée à vos objectifs académiques et professionnels',
    applicationSupportDesc: 'Support complet tout au long du processus de candidature',
    successBeyond: 'Succès et Au-delà',
    successBeyondDesc: 'Support continu même après avoir commencé vos études à l\'étranger',
    readyToStart: 'Prêt à Commencer Votre Voyage?',
    contactToday: 'Contactez-nous aujourd\'hui pour une consultation gratuite et faites le premier pas vers l\'éducation de vos rêves',
    scheduleConsultation: 'Programmer une Consultation',
    viewSuccessStories: 'Voir les Histoires de Réussite',
    
    // Countries
    studyDestinations: 'Destinations d\'Études',
    popularCountries: 'Pays Populaires',
    
    // Testimonials
    studentSuccessStories: 'Histoires de Réussite des Étudiants',
    hearFromStudents: 'Écoutez les étudiants qui ont réalisé leurs rêves grâce à nos conseils',
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
    startJourney: 'ابدأ رحلتك',
    
    // Index Page Content
    everythingAboutTurkey: 'كل شيء عن تركيا',
    allInformationNeeded: 'جميع المعلومات التي تحتاجها للدراسة في تركيا في مكان واحد',
    universitiesAndPrograms: 'الجامعات والبرامج',
    exploreUniversities: 'استكشف أفضل الجامعات التركية وبرامجها',
    scholarshipsAndFunding: 'المنح الدراسية والتمويل',
    turkishScholarships: 'اكتشف المنح الحكومية التركية ومنح الجامعات',
    citiesAndLifestyle: 'المدن وأسلوب الحياة',
    discoverCities: 'اكتشف أفضل المدن للعيش والدراسة في تركيا',
    economyAndLivingCosts: 'الاقتصاد وتكاليف المعيشة',
    currentEconomicSituation: 'الوضع الاقتصادي الحالي ومصروفات المعيشة في تركيا',
    whyTurkey: 'لماذا تركيا؟',
    strategicLocation: 'الموقع الاستراتيجي',
    strategicLocationDesc: 'بين أوروبا وآسيا، يربط بين قارتين',
    culturalRichness: 'الثراء الثقافي',
    culturalRichnessDesc: 'تاريخ غني وتراث ثقافي متنوع',
    hospitality: 'الضيافة التركية',
    hospitalityDesc: 'شعب دافئ ومرحب يحتضن الطلاب الدوليين',
    easyAccess: 'سهولة الوصول',
    easyAccessDesc: 'متصل جيداً بأوروبا وآسيا والشرق الأوسط',
    internationalStudents: 'الطلاب الدوليون',
    provinces: 'المحافظات',
    seasons: 'الفصول',
    startEducationalJourney: 'ابدأ رحلتك التعليمية في تركيا',
    guideFromApplication: 'نرشدك من التقديم حتى التخرج بدعم خبراء',
    
    // About Section
    aboutTitle: 'حول EduConsult',
    aboutDescription: 'EduConsult هي شركة استشارات تعليمية رائدة متخصصة في مساعدة طلاب منطقة الشرق الأوسط وشمال أفريقيا في رحلتهم نحو التعليم الدولي.',
    
    // About Page Stats
    studentsHelped: 'الطلاب الذين تم مساعدتهم',
    successRate: 'معدل النجاح',
    countries: 'البلدان',
    yearsExperience: 'سنوات الخبرة',
    
    // About Page Mission
    ourMission: 'مهمتنا',
    missionDescription1: 'سد الفجوة بين الطلاب الموهوبين من منطقة الشرق الأوسط وشمال أفريقيا والفرص التعليمية ذات المستوى العالمي في الخارج. نؤمن بأن كل طالب يستحق الوصول إلى تعليم عالي الجودة، بغض النظر عن موقعه الجغرافي أو ظروفه المالية.',
    missionDescription2: 'فريقنا من الاستشاريين ذوي الخبرة يعمل بلا كلل لمطابقة الطلاب مع البرامج التي تتماشى مع أهدافهم الأكاديمية وطموحاتهم المهنية وقيمهم الشخصية. نحن نقدم الدعم الشامل طوال الرحلة بأكملها، من الاستشارة الأولى حتى التخرج.',
    ourVision: 'رؤيتنا',
    visionDescription: 'أن نصبح شركة الاستشارات التعليمية الأكثر ثقة في منطقة الشرق الأوسط وشمال أفريقيا، والمعروفة بالتزامنا بنجاح الطلاب وممارساتنا الأخلاقية.',
    
    // About Page Team
    meetOurTeam: 'تعرف على فريقنا',
    teamDescription: 'فريقنا المتنوع من خبراء التعليم ومتخصصي التأشيرات ومستشاري الطلاب موجودون هنا لإرشادك في كل خطوة.',
    
    // About Page Values
    ourCoreValues: 'قيمنا الأساسية',
    trustIntegrity: 'الثقة والنزاهة',
    trustDescription: 'نحافظ على أعلى معايير الصدق والشفافية في جميع تفاعلاتنا مع الطلاب والمؤسسات الشريكة.',
    excellence: 'التميز',
    excellenceDescription: 'نسعى للتميز في كل ما نفعله، من خدمات الاستشارة إلى دعمنا المستمر للطلاب في الخارج.',
    studentCentered: 'محوره الطالب',
    studentCenteredDescription: 'كل قرار نتخذه يُوجه بما هو الأفضل لطلابنا. نجاحهم هو نجاحنا.',
    
    // Services
    servicesTitle: 'خدماتنا',
    ourServices: 'خدماتنا',
    comprehensiveSupport: 'دعم شامل لرحلتك التعليمية من البداية إلى النهاية',
    universitySelection: 'اختيار الجامعة',
    applicationSupport: 'دعم التطبيق',
    visaAssistance: 'مساعدة التأشيرة',
    scholarshipGuidance: 'إرشاد المنح الدراسية',
    universityAdmission: 'قبول الجامعة',
    universityAdmissionDesc: 'إرشاد كامل لطلبات الجامعة وعملية القبول',
    applicationDocuments: 'إعداد وثائق التقديم',
    personalStatement: 'كتابة البيان الشخصي',
    interviewPrep: 'إعداد المقابلة',
    applicationSubmission: 'دعم تقديم الطلب',
    scholarshipsDesc: 'ابحث وتقدم للمنح الدراسية لتمويل تعليمك في الخارج',
    scholarshipDatabase: 'الوصول إلى قاعدة بيانات المنح الدراسية',
    eligibilityAssessment: 'تقييم الأهلية',
    applicationAssistance: 'مساعدة التطبيق',
    essayWriting: 'دعم كتابة المقال',
    financialAid: 'إرشاد المساعدة المالية',
    visaGuidance: 'إرشاد التأشيرة',
    visaGuidanceDesc: 'دعم وإرشاد كامل لطلب التأشيرة',
    visaConsultation: 'استشارة التأشيرة',
    documentChecklist: 'قائمة مراجعة الوثائق',
    embassyAppointment: 'جدولة موعد السفارة',
    postArrival: 'دعم ما بعد الوصول',
    accommodation: 'السكن',
    accommodationDesc: 'مساعدة في العثور على سكن مناسب لدراستك',
    universityDorms: 'مساكن الجامعة',
    privateHousing: 'خيارات السكن الخاص',
    rentalAgreement: 'دعم اتفاقية الإيجار',
    areaRecommendations: 'توصيات المنطقة',
    moveInSupport: 'دعم الانتقال',
    ourProcess: 'عمليتنا',
    simpleStepByStep: 'عملية بسيطة خطوة بخطوة لتحقيق أهدافك التعليمية',
    initialConsultation: 'الاستشارة الأولية',
    initialConsultationDesc: 'استشارة مجانية لفهم أهدافك وإنشاء خطة شخصية',
    personalizedPlan: 'خطة شخصية',
    personalizedPlanDesc: 'خارطة طريق مخصصة مصممة وفقاً لأهدافك الأكاديمية والمهنية',
    applicationSupportDesc: 'دعم كامل طوال عملية التطبيق',
    successBeyond: 'النجاح وما بعده',
    successBeyondDesc: 'دعم مستمر حتى بعد بدء دراستك في الخارج',
    readyToStart: 'مستعد لبدء رحلتك؟',
    contactToday: 'اتصل بنا اليوم للحصول على استشارة مجانية واتخذ الخطوة الأولى نحو التعليم الذي تحلم به',
    scheduleConsultation: 'جدولة استشارة',
    viewSuccessStories: 'عرض قصص النجاح',
    
    // Countries
    studyDestinations: 'وجهات الدراسة',
    popularCountries: 'البلدان الشعبية',
    
    // Testimonials
    studentSuccessStories: 'قصص نجاح الطلاب',
    hearFromStudents: 'استمع إلى الطلاب الذين حققوا أحلامهم بتوجيهنا',
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
