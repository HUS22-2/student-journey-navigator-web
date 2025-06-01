
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
      description: 'Complete guidance through the university application process',
      features: [
        'University selection based on your profile',
        'Application document preparation',
        'Personal statement writing assistance',
        'Interview preparation',
        'Application submission and tracking'
      ],
      color: 'from-edu-blue-500 to-edu-blue-600'
    },
    {
      icon: DollarSign,
      title: t('scholarships'),
      description: 'Find and secure funding for your education',
      features: [
        'Scholarship database access',
        'Eligibility assessment',
        'Application assistance',
        'Essay writing support',
        'Financial aid counseling'
      ],
      color: 'from-edu-purple-500 to-edu-purple-600'
    },
    {
      icon: FileText,
      title: t('visaGuidance'),
      description: 'Expert support for visa and immigration processes',
      features: [
        'Visa type consultation',
        'Document checklist and preparation',
        'Embassy appointment booking',
        'Interview preparation',
        'Post-arrival support'
      ],
      color: 'from-edu-teal-500 to-edu-teal-600'
    },
    {
      icon: Home,
      title: t('accommodation'),
      description: 'Help finding suitable housing options',
      features: [
        'University dormitory applications',
        'Private housing search',
        'Rental agreement assistance',
        'Area recommendations',
        'Move-in support'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'Free 30-minute consultation to understand your goals and assess your profile.'
    },
    {
      step: '02',
      title: 'Personalized Plan',
      description: 'Receive a customized roadmap with timelines and required documents.'
    },
    {
      step: '03',
      title: 'Application Support',
      description: 'Expert guidance throughout the application and visa process.'
    },
    {
      step: '04',
      title: 'Success & Beyond',
      description: 'Continued support until you successfully start your studies abroad.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-edu-blue-50 to-edu-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our {t('services')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive support for your international education journey
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
                      Learn More
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
              Our Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A simple, step-by-step approach to achieve your goals
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and take the first step towards your international education goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-edu-blue-600 hover:bg-gray-50">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-edu-blue-600">
              View Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
