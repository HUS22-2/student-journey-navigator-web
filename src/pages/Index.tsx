
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  const countries = [
    {
      name: t('turkey'),
      slug: 'turkey',
      flag: '🇹🇷',
      color: 'from-red-500 to-red-600',
      description: 'Modern universities, rich culture, affordable education',
      image: 'bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20'
    },
    {
      name: t('france'),
      slug: 'france',
      flag: '🇫🇷',
      color: 'from-blue-500 to-blue-600',
      description: 'World-class education, cultural heritage, EU benefits',
      image: 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      name: t('tunisia'),
      slug: 'tunisia',
      flag: '🇹🇳',
      color: 'from-green-500 to-green-600',
      description: 'Bilingual education, Mediterranean lifestyle, low costs',
      image: 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      name: t('canada'),
      slug: 'canada',
      flag: '🇨🇦',
      color: 'from-red-600 to-red-700',
      description: 'Top universities, immigration opportunities, quality life',
      image: 'bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20'
    },
    {
      name: t('morocco'),
      slug: 'morocco',
      flag: '🇲🇦',
      color: 'from-orange-500 to-orange-600',
      description: 'French-Arabic education, diverse culture, strategic location',
      image: 'bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-edu-blue-50 via-white to-edu-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-edu-blue-200/30 dark:bg-edu-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-edu-purple-200/30 dark:bg-edu-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-edu-teal-200/20 dark:bg-edu-teal-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="text-gradient">{t('welcomeTitle')}</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('welcomeSubtitle')}
          </p>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
              {t('chooseCountry')}
            </h2>
            
            <div className="flex justify-center mb-8">
              <ArrowDown className="h-6 w-6 text-edu-blue-500 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Country Selection */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <Link
                key={country.slug}
                to={`/country/${country.slug}`}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="country-card group-hover:scale-105 transition-all duration-500">
                  <div className={`${country.image} h-32 rounded-lg mb-6 flex items-center justify-center`}>
                    <span className="text-6xl filter drop-shadow-lg">{country.flag}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-edu-blue-600 transition-colors">
                    {country.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {country.description}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${country.color} hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}
                  >
                    {t('startJourney')}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose EduConsult?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide comprehensive support throughout your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: t('universityAdmission'),
                description: 'Expert guidance for university applications',
                icon: '🎓',
                color: 'from-edu-blue-500 to-edu-blue-600'
              },
              {
                title: t('scholarships'),
                description: 'Find and apply for funding opportunities',
                icon: '💰',
                color: 'from-edu-purple-500 to-edu-purple-600'
              },
              {
                title: t('visaGuidance'),
                description: 'Complete visa and residence permit support',
                icon: '📋',
                color: 'from-edu-teal-500 to-edu-teal-600'
              },
              {
                title: t('accommodation'),
                description: 'Help finding suitable housing options',
                icon: '🏠',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
