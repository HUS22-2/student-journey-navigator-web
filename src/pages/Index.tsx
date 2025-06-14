import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, MapPin, DollarSign, Users, Building, Plane, Heart, Globe } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  const turkeyFeatures = [
    {
      title: 'Türkiye\'de Üniversiteler',
      description: 'Dünya standartlarında eğitim veren 200+ üniversite',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      link: '/universities'
    },
    {
      title: 'Burslar ve Finansman',
      description: 'Türkiye Bursları ve diğer finansman olanakları',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      link: '/scholarships'
    },
    {
      title: 'Şehirler ve Yaşam',
      description: 'Türkiye\'nin öğrenci dostu şehirleri keşfedin',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      link: '/cities'
    },
    {
      title: 'Ekonomi ve Yaşam Maliyeti',
      description: 'Güncel ekonomik durum ve yaşam masrafları',
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      link: '/economy'
    }
  ];

  const whyTurkey = [
    {
      icon: Globe,
      title: 'Coğrafi Konum',
      description: 'Avrupa ve Asya\'yı birleştiren stratejik konum'
    },
    {
      icon: Users,
      title: 'Kültürel Zenginlik',
      description: 'Binlerce yıllık tarih ve çok kültürlü yapı'
    },
    {
      icon: Heart,
      title: 'Misafirperverlik',
      description: 'Dünyaca ünlü Türk misafirperverliği'
    },
    {
      icon: Plane,
      title: 'Ulaşım',
      description: 'Dünyaya açılan kapı, kolay ulaşım imkanları'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <span className="text-8xl animate-bounce">🇹🇷</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="text-gradient">EDUPASS</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Doğu ile Batı'nın buluştuğu noktada, dünya standartlarında eğitim. 
            Zengin kültür, modern üniversiteler ve benzersiz fırsatlarla dolu bir yolculuk.
          </p>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/country/turkey">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg">
                Eğitim Yolculuğunu Başlat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-300">Üniversite</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">250K+</div>
              <div className="text-gray-600 dark:text-gray-300">Uluslararası Öğrenci</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">81</div>
              <div className="text-gray-600 dark:text-gray-300">İl</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">4</div>
              <div className="text-gray-600 dark:text-gray-300">Mevsim</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Türkiye Hakkında Her Şey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Eğitim hayatınızı planlama aşamasından mezuniyetinize kadar ihtiyacınız olan tüm bilgiler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {turkeyFeatures.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
              Neden Türkiye?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyTurkey.map((item, index) => (
              <div
                key={item.title}
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
            Türkiye'de Eğitim Yolculuğunuza Bugün Başlayın
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Başvuru sürecinden mezuniyetinize kadar size rehberlik ediyoruz
          </p>
          <div className="space-x-4">
            <Link to="/country/turkey">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Başvuru Yap
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                Daha Fazla Bilgi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
