
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, MapPin, DollarSign, Users, Building, Plane, Heart, Globe } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      title: 'Universities & Programs',
      description: 'Explore 200+ world-class universities and programs',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      link: '/universities'
    },
    {
      title: 'Scholarships & Funding',
      description: 'Turkish Scholarships and other funding opportunities',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      link: '/scholarships'
    },
    {
      title: 'Cities & Lifestyle',
      description: 'Discover Turkey\'s student-friendly cities',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      link: '/cities'
    },
    {
      title: 'Economy & Living Costs',
      description: 'Current economic situation and living expenses',
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      link: '/economy'
    }
  ];

  const whyTurkey = [
    {
      icon: Globe,
      title: 'Strategic Location',
      description: 'Bridge between Europe and Asia with strategic positioning'
    },
    {
      icon: Users,
      title: 'Cultural Richness',
      description: 'Thousands of years of history and multicultural environment'
    },
    {
      icon: Heart,
      title: 'Hospitality',
      description: 'World-famous Turkish hospitality and warmth'
    },
    {
      icon: Plane,
      title: 'Easy Access',
      description: 'Gateway to the world with excellent transportation links'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-3xl animate-float" style={{
            animationDelay: '1s'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="text-gradient">EDUPASS</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in max-w-4xl mx-auto" style={{
            animationDelay: '0.2s'
          }}>
            {t('welcomeSubtitle')}
          </p>

          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center" style={{
            animationDelay: '0.4s'
          }}>
            <Link to="/country/turkey">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg">
                {t('startJourney')}
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 px-8 py-4 text-lg">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-300">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">250K+</div>
              <div className="text-gray-600 dark:text-gray-300">International Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">81</div>
              <div className="text-gray-600 dark:text-gray-300">Provinces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">4</div>
              <div className="text-gray-600 dark:text-gray-300">Seasons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything About Turkey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              All the information you need from planning your education to graduation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.link} className="group block" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-red-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Turkey */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Turkey?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyTurkey.map((item, index) => (
              <div key={item.title} className="text-center" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
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
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start Your Educational Journey in Turkey Today
          </h2>
          <p className="text-xl text-red-100 mb-8">
            We guide you from application process to graduation
          </p>
          <div className="space-x-4">
            <Link to="/country/turkey">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
