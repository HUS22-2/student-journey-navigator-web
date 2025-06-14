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
    ourServices: "Our Services",
    comprehensiveSupport: "Comprehensive support for your international education journey",
    universityAdmission: "University Admission",
    universityAdmissionDesc: "Complete guidance through the university application process",
    scholarships: "Scholarships",
    scholarshipsDesc: "Find and secure funding for your education",
    visaGuidance: "Visa Guidance",
    visaGuidanceDesc: "Expert support for visa and immigration processes",
    accommodation: "Accommodation",
    accommodationDesc: "Help finding suitable housing options",
    universitySelection: "University selection based on your profile",
    applicationDocuments: "Application document preparation",
    personalStatement: "Personal statement writing assistance",
    interviewPrep: "Interview preparation",
    applicationSubmission: "Application submission and tracking",
    scholarshipDatabase: "Scholarship database access",
    eligibilityAssessment: "Eligibility assessment",
    applicationAssistance: "Application assistance",
    essayWriting: "Essay writing support",
    financialAid: "Financial aid counseling",
    visaConsultation: "Visa type consultation",
    documentChecklist: "Document checklist and preparation",
    embassyAppointment: "Embassy appointment booking",
    postArrival: "Post-arrival support",
    universityDorms: "University dormitory applications",
    privateHousing: "Private housing search",
    rentalAgreement: "Rental agreement assistance",
    areaRecommendations: "Area recommendations",
    moveInSupport: "Move-in support",
    learnMore: "Learn More",
    ourProcess: "Our Process",
    simpleStepByStep: "A simple, step-by-step approach to achieve your goals",
    initialConsultation: "Initial Consultation",
    initialConsultationDesc: "Free 30-minute consultation to understand your goals and assess your profile.",
    personalizedPlan: "Personalized Plan",
    personalizedPlanDesc: "Receive a customized roadmap with timelines and required documents.",
    applicationSupport: "Application Support",
    applicationSupportDesc: "Expert guidance throughout the application and visa process.",
    successBeyond: "Success & Beyond",
    successBeyondDesc: "Continued support until you successfully start your studies abroad.",
    readyToStart: "Ready to Start Your Journey?",
    contactToday: "Contact us today for a free consultation and take the first step towards your international education goals.",
    scheduleConsultation: "Schedule Consultation",
    viewSuccessStories: "View Success Stories",
    
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
    ourMission: "Our Mission",
    missionDescription1: "We believe that education should be accessible to everyone, regardless of their background or location. Our mission is to bridge the gap between talented students and world-class educational opportunities.",
    missionDescription2: "Through personalized guidance, expert advice, and comprehensive support, we help students navigate the complex process of international education and achieve their academic dreams.",
    ourVision: "Our Vision",
    visionDescription: "To become the leading global platform connecting students with their dream universities worldwide.",
    meetOurTeam: "Meet Our Expert Team",
    teamDescription: "Experienced professionals dedicated to your educational success",
    studentsHelped: "Students Helped",
    successRate: "Success Rate",
    countries: "Countries",
    yearsExperience: "Years Experience",
    ourCoreValues: "Our Core Values",
    trustIntegrity: "Trust & Integrity",
    trustDescription: "We build lasting relationships based on honesty and transparency.",
    excellence: "Excellence",
    excellenceDescription: "We strive for the highest standards in everything we do.",
    studentCentered: "Student-Centered",
    studentCenteredDescription: "Every decision we make is focused on student success and satisfaction.",
    
    // Contact
    contactTitle: "Get in Touch",
    email: "Email",
    phone: "Phone",
    address: "Address",
    sendMessage: "Send us a Message",
    subject: "Subject",
    message: "Message",
    sendMessageBtn: "Send Message",
    quickContact: "Quick Contact",
    chatWhatsApp: "💬 Chat on WhatsApp",
    ourOffices: "Our Offices",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    emergencyConsultations: "* Emergency consultations available 24/7",
    available24Hours: "Available 24/7 via WhatsApp",
    
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "Student Success Stories",
    hearFromStudents: "Hear from our students who are now studying at top universities around the world",
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
    bookThirtyMinuteCall: "Book a 30-minute call to discuss your goals",
    
    // Country Page specific translations
    backToCountries: "Back to Countries",
    studyIn: "Study in",
    openUniversities: "Open Universities for Application",
    currentApplicationDeadlines: "Current application deadlines and status for universities",
    loadingUniversities: "Loading universities...",
    noUniversitiesFound: "No universities found for",
    checkBackLater: "Please check back later or contact support.",
    university: "University",
    ranking: "Ranking",
    tuition: "Tuition",
    deadline: "Deadline",
    status: "Status",
    action: "Action",
    apply: "Apply",
    closed: "Closed",
    availableScholarships: "Available Scholarships",
    fundingOpportunities: "Funding opportunities for international students in",
    coverage: "Coverage",
    requirements: "Requirements",
    applyForScholarship: "Apply for Scholarship",
    admissionRequirements: "Admission Requirements",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    costOfLiving: "What is the cost of living?",
    needLocalLanguage: "Do I need to speak the local language?",
    manyProgramsEnglish: "Many programs are offered in English, but learning",
    beneficialForLife: "is beneficial for daily life and integration.",
    whenToApply: "When should I apply?",
    deadlinesVary: "Application deadlines vary by university and program. Check the universities table for specific deadlines.",
    fillFormBelow: "Fill out the form below to begin your application process",
    countryNotFound: "Country not found",
    returnToHome: "Return to Home",
    
    // Form validation
    missingInformation: "Missing Information",
    fillAllRequired: "Please fill in all required fields.",
    submissionFailed: "Submission Failed",
    errorSubmittingApplication: "There was an error submitting your application. Please try again.",
    applicationSubmitted: "Application Submitted!",
    contactWithin24Hours: "We'll contact you within 24 hours via WhatsApp.",
    unexpectedError: "An unexpected error occurred. Please try again.",
    submitting: "Submitting...",
    
    // Countries data
    highSchoolDiploma: "High school diploma with minimum 70% average",
    englishProficiency: "English proficiency test (TOEFL/IELTS)",
    passportCopy: "Passport copy",
    motivationLetter: "Motivation letter",
    academicTranscripts: "Academic transcripts",
    healthInsurance: "Health insurance",
    proofFinancialSupport: "Proof of financial support",
    
    // Turkish scholarships
    turkishGovernmentScholarship: "Turkish Government Scholarship (Türkiye Bursları)",
    fullScholarshipCovering: "Full scholarship covering tuition, accommodation, and monthly stipend",
    ytbScholarship: "YTB Scholarship",
    partialScholarshipUndergrad: "Partial scholarship for undergraduate and graduate students",
    universityMeritScholarships: "University Merit Scholarships",
    institutionSpecificScholarships: "Institution-specific scholarships based on academic merit",
    ibnKhaldunScholarship: "Ibn Khaldun Scholarship",
    specialScholarshipDeveloping: "Special scholarship for students from developing countries",
    
    // Coverage and requirements
    fullTuitionStipend: "100% tuition + $400/month stipend",
    tuitionAccommodation: "Tuition + accommodation",
    tuitionReduction: "25%-75% tuition reduction",
    fullTuitionLiving: "Full tuition + living expenses",
    variesByUniversity: "Varies by university",
    gpaRequirement: "GPA ≥ 70%, TOEFL ≥ 79",
    academicExcellenceLeadership: "Academic excellence, leadership skills",
    highAcademicPerformance: "High academic performance",
    financialNeedMerit: "Financial need, academic merit",
    excellenceUnder30: "Excellence in academics, under 30 years old",
    academicExcellenceUnder35: "Academic excellence, age under 35"
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
    ourServices: "خدماتنا",
    comprehensiveSupport: "دعم شامل لرحلة تعليمك الدولي",
    universityAdmission: "القبول الجامعي",
    universityAdmissionDesc: "توجيه كامل خلال عملية التقديم للجامعة",
    scholarships: "المنح الدراسية",
    scholarshipsDesc: "العثور على التمويل وتأمينه لتعليمك",
    visaGuidance: "إرشادات التأشيرة",
    visaGuidanceDesc: "دعم متخصص لعمليات التأشيرة والهجرة",
    accommodation: "السكن",
    accommodationDesc: "المساعدة في العثور على خيارات السكن المناسبة",
    universitySelection: "اختيار الجامعة بناءً على ملفك الشخصي",
    applicationDocuments: "إعداد وثائق التطبيق",
    personalStatement: "المساعدة في كتابة البيان الشخصي",
    interviewPrep: "إعداد المقابلة",
    applicationSubmission: "تقديم الطلب ومتابعته",
    scholarshipDatabase: "الوصول لقاعدة بيانات المنح الدراسية",
    eligibilityAssessment: "تقييم الأهلية",
    applicationAssistance: "مساعدة التطبيق",
    essayWriting: "دعم كتابة المقال",
    financialAid: "استشارات المساعدة المالية",
    visaConsultation: "استشارة نوع التأشيرة",
    documentChecklist: "قائمة مراجعة الوثائق وإعدادها",
    embassyAppointment: "حجز موعد السفارة",
    postArrival: "دعم ما بعد الوصول",
    universityDorms: "طلبات السكن الجامعي",
    privateHousing: "البحث عن السكن الخاص",
    rentalAgreement: "مساعدة اتفاقية الإيجار",
    areaRecommendations: "توصيات المنطقة",
    moveInSupport: "دعم الانتقال",
    learnMore: "اعرف أكثر",
    ourProcess: "عمليتنا",
    simpleStepByStep: "نهج بسيط خطوة بخطوة لتحقيق أهدافك",
    initialConsultation: "الاستشارة الأولية",
    initialConsultationDesc: "استشارة مجانية لمدة 30 دقيقة لفهم أهدافك وتقييم ملفك الشخصي.",
    personalizedPlan: "خطة شخصية",
    personalizedPlanDesc: "احصل على خارطة طريق مخصصة مع الجداول الزمنية والوثائق المطلوبة.",
    applicationSupport: "دعم التطبيق",
    applicationSupportDesc: "إرشاد متخصص طوال عملية التطبيق والتأشيرة.",
    successBeyond: "النجاح وما بعده",
    successBeyondDesc: "دعم مستمر حتى تبدأ دراستك بالخارج بنجاح.",
    readyToStart: "مستعد لبدء رحلتك؟",
    contactToday: "اتصل بنا اليوم للحصول على استشارة مجانية واتخذ الخطوة الأولى نحو أهداف تعليمك الدولي.",
    scheduleConsultation: "جدولة استشارة",
    viewSuccessStories: "عرض قصص النجاح",
    
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
    ourMission: "مهمتنا",
    missionDescription1: "نؤمن بأن التعليم يجب أن يكون متاحاً للجميع، بغض النظر عن خلفيتهم أو موقعهم. مهمتنا هي سد الفجوة بين الطلاب الموهوبين والفرص التعليمية العالمية.",
    missionDescription2: "من خلال التوجيه الشخصي والنصائح المتخصصة والدعم الشامل، نساعد الطلاب على التنقل في العملية المعقدة للتعليم الدولي وتحقيق أحلامهم الأكاديمية.",
    ourVision: "رؤيتنا",
    visionDescription: "أن نصبح المنصة العالمية الرائدة في ربط الطلاب بجامعات أحلامهم حول العالم.",
    meetOurTeam: "تعرف على فريقنا المتخصص",
    teamDescription: "محترفون ذوو خبرة مكرسون لنجاحك التعليمي",
    studentsHelped: "طالب تم مساعدته",
    successRate: "معدل النجاح",
    countries: "دولة",
    yearsExperience: "سنوات خبرة",
    ourCoreValues: "قيمنا الأساسية",
    trustIntegrity: "الثقة والنزاهة",
    trustDescription: "نبني علاقات دائمة قائمة على الصدق والشفافية.",
    excellence: "التميز",
    excellenceDescription: "نسعى للحصول على أعلى المعايير في كل ما نقوم به.",
    studentCentered: "محورها الطالب",
    studentCenteredDescription: "كل قرار نتخذه يركز على نجاح الطلاب ورضاهم.",
    
    // Contact
    contactTitle: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    address: "العنوان",
    sendMessage: "أرسل لنا رسالة",
    subject: "الموضوع",
    message: "الرسالة",
    sendMessageBtn: "إرسال الرسالة",
    quickContact: "تواصل سريع",
    chatWhatsApp: "💬 تحدث على الواتساب",
    ourOffices: "مكاتبنا",
    businessHours: "ساعات العمل",
    mondayFriday: "الاثنين - الجمعة",
    saturday: "السبت",
    sunday: "الأحد",
    closed: "مغلق",
    emergencyConsultations: "* استشارات طوارئ متاحة 24/7",
    available24Hours: "متاح 24/7 عبر الواتساب",
    
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    
    // Additional Testimonials Page Translations
    studentSuccessStories: "قصص نجاح الطلاب",
    hearFromStudents: "استمع لطلابنا الذين يدرسون الآن في أفضل الجامعات حول العالم",
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
    bookThirtyMinuteCall: "احجز مكالمة مدتها 30 دقيقة لمناقشة أهدافك",
    
    // Country Page specific translations
    backToCountries: "العودة للدول",
    studyIn: "الدراسة في",
    openUniversities: "الجامعات المفتوحة للتقديم",
    currentApplicationDeadlines: "مواعيد التقديم الحالية وحالة الجامعات",
    loadingUniversities: "تحميل الجامعات...",
    noUniversitiesFound: "لم يتم العثور على جامعات في",
    checkBackLater: "يرجى المراجعة لاحقاً أو الاتصال بالدعم.",
    university: "الجامعة",
    ranking: "الترتيب",
    tuition: "الرسوم الدراسية",
    deadline: "الموعد النهائي",
    status: "الحالة",
    action: "الإجراء",
    apply: "قدم طلب",
    closed: "مغلق",
    availableScholarships: "المنح الدراسية المتاحة",
    fundingOpportunities: "فرص التمويل للطلاب الدوليين في",
    coverage: "التغطية",
    requirements: "المتطلبات",
    applyForScholarship: "تقدم للمنحة",
    admissionRequirements: "متطلبات القبول",
    frequentlyAskedQuestions: "الأسئلة الشائعة",
    costOfLiving: "ما هي تكلفة المعيشة؟",
    needLocalLanguage: "هل أحتاج للتحدث باللغة المحلية؟",
    manyProgramsEnglish: "العديد من البرامج تُدرس باللغة الإنجليزية، لكن تعلم",
    beneficialForLife: "مفيد للحياة اليومية والاندماج.",
    whenToApply: "متى يجب أن أقدم؟",
    deadlinesVary: "تختلف مواعيد التقديم حسب الجامعة والبرنامج. راجع جدول الجامعات للمواعيد المحددة.",
    fillFormBelow: "املأ النموذج أدناه لبدء عملية التقديم",
    countryNotFound: "الدولة غير موجودة",
    returnToHome: "العودة للرئيسية",
    
    // Form validation
    missingInformation: "معلومات مفقودة",
    fillAllRequired: "يرجى ملء جميع الحقول المطلوبة.",
    submissionFailed: "فشل التقديم",
    errorSubmittingApplication: "حدث خطأ في إرسال طلبك. يرجى المحاولة مرة أخرى.",
    applicationSubmitted: "تم إرسال الطلب!",
    contactWithin24Hours: "سنتواصل معك خلال 24 ساعة عبر الواتساب.",
    unexpectedError: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    submitting: "جاري الإرسال...",
    
    // Countries data
    highSchoolDiploma: "شهادة الثانوية العامة بمعدل 70% كحد أدنى",
    englishProficiency: "اختبار إجادة اللغة الإنجليزية (TOEFL/IELTS)",
    passportCopy: "نسخة من جواز السفر",
    motivationLetter: "خطاب الدافع",
    academicTranscripts: "كشوف الدرجات الأكاديمية",
    healthInsurance: "التأمين الصحي",
    proofFinancialSupport: "إثبات الدعم المالي",
    
    // Turkish scholarships
    turkishGovernmentScholarship: "منحة الحكومة التركية (تركيا بورسلاري)",
    fullScholarshipCovering: "منحة كاملة تغطي الرسوم الدراسية والسكن والراتب الشهري",
    ytbScholarship: "منحة YTB",
    partialScholarshipUndergrad: "منحة جزئية لطلاب البكالوريوس والدراسات العليا",
    universityMeritScholarships: "منح الجامعات للتفوق",
    institutionSpecificScholarships: "منح خاصة بالمؤسسات حسب التفوق الأكاديمي",
    ibnKhaldunScholarship: "منحة ابن خلدون",
    specialScholarshipDeveloping: "منحة خاصة للطلاب من البلدان النامية",
    
    // Coverage and requirements
    fullTuitionStipend: "رسوم دراسية كاملة + راتب شهري 400 دولار",
    tuitionAccommodation: "الرسوم الدراسية + السكن",
    tuitionReduction: "تخفيض 25%-75% من الرسوم الدراسية",
    fullTuitionLiving: "الرسوم الدراسية الكاملة + نفقات المعيشة",
    variesByUniversity: "يختلف حسب الجامعة",
    gpaRequirement: "معدل ≥ 70%، TOEFL ≥ 79",
    academicExcellenceLeadership: "التفوق الأكاديمي، مهارات القيادة",
    highAcademicPerformance: "الأداء الأكاديمي المرتفع",
    financialNeedMerit: "الحاجة المالية، الجدارة الأكاديمية",
    excellenceUnder30: "التفوق الأكاديمي، العمر أقل من 30 سنة",
    academicExcellenceUnder35: "التفوق الأكاديمي،年龄 أقل من 35 سنة"
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
