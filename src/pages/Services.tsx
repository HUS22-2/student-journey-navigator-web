
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, DollarSign, FileText, Home, CheckCircle } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: GraduationCap,
      title: t('universityAdmission'),
      description: t('universityAdmissionDesc'),
      features: [
        t('universitySelection'),
        t('applicationDocuments'),
        t('personalStatement'),
        t('interviewPrep'),
        t('applicationSubmission')
      ],
      color: 'from-edu-blue-500 to-edu-blue-600'
    },
    {
      icon: DollarSign,
      title: t('scholarships'),
      description: t('scholarshipsDesc'),
      features: [
        t('scholarshipDatabase'),
        t('eligibilityAssessment'),
        t('applicationAssistance'),
        t('essayWriting'),
        t('financialAid')
      ],
      color: 'from-edu-purple-500 to-edu-purple-600'
    },
    {
      icon: FileText,
      title: t('visaGuidance'),
      description: t('visaGuidanceDesc'),
      features: [
        t('visaConsultation'),
        t('documentChecklist'),
        t('embassyAppointment'),
        t('interviewPrep'),
        t('postArrival')
      ],
      color: 'from-edu-teal-500 to-edu-teal-600'
    },
    {
      icon: Home,
      title: t('accommodation'),
      description: t('accommodationDesc'),
      features: [
        t('universityDorms'),
        t('privateHousing'),
        t('rentalAgreement'),
        t('areaRecommendations'),
        t('moveInSupport')
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const process = [
    {
      step: '01',
      title: t('initialConsultation'),
      description: t('initialConsultationDesc')
    },
    {
      step: '02',
      title: t('personalizedPlan'),
      description: t('personalizedPlanDesc')
    },
    {
      step: '03',
      title: t('applicationSupport'),
      description: t('applicationSupportDesc')
    },
    {
      step: '04',
      title: t('successBeyond'),
      description: t('successBeyondDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-edu-blue-50 to-edu-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('ourServices')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('comprehensiveSupport')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 card-hover">
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300`}>
                      {t('learnMore')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('ourProcess')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('simpleStepByStep')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-edu-blue-500 to-edu-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-edu-blue-200 to-edu-purple-200 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-edu-blue-500 to-edu-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('readyToStart')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('contactToday')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-edu-blue-600 hover:bg-gray-50">
              {t('scheduleConsultation')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-edu-blue-600">
              {t('viewSuccessStories')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
