
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, DollarSign, Calendar, Users, GraduationCap, ExternalLink } from 'lucide-react';

const Scholarships = () => {
  const scholarships = [
    {
      name: 'Türkiye Bursları',
      description: 'T.C. Cumhurbaşkanlığı tarafından sunulan kapsamlı burs programı',
      coverage: 'Tam burs + 1500 TL aylık ödenek + barınma',
      deadline: '2024-02-20',
      requirements: 'Akademik başarı, liderlik becerileri',
      type: 'Devlet Bursu',
      level: 'Lisans, Yüksek Lisans, Doktora',
      status: 'Açık',
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'YÖK Bursu',
      description: 'Yükseköğretim Kurulu tarafından sunulan burs programları',
      coverage: 'Tam veya kısmi öğrenim ücreti',
      deadline: '2024-03-15',
      requirements: 'Akademik mükemmellik',
      type: 'Devlet Bursu',
      level: 'Yüksek Lisans, Doktora',
      status: 'Açık',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'İbn Haldun Bursu',
      description: 'Gelişmekte olan ülke öğrencileri için özel burs',
      coverage: 'Tam öğrenim + yaşam giderleri',
      deadline: '2024-04-01',
      requirements: 'Mali durum, akademik başarı',
      type: 'Özel Burs',
      level: 'Lisans, Yüksek Lisans',
      status: 'Açık',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Üniversite Merit Bursları',
      description: 'Üniversitelerin kendi sundukları başarı bursları',
      coverage: '%25-%75 öğrenim ücreti indirimi',
      deadline: 'Üniversiteye göre değişir',
      requirements: 'Yüksek akademik performans',
      type: 'Üniversite Bursu',
      level: 'Tüm Seviyeler',
      status: 'Sürekli',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'TÜBİTAK Bursları',
      description: 'Bilim ve teknoloji alanında araştırma bursları',
      coverage: 'Araştırma desteği + aylık ödenek',
      deadline: '2024-05-01',
      requirements: 'STEM alanları, araştırma projesi',
      type: 'Araştırma Bursu',
      level: 'Yüksek Lisans, Doktora',
      status: 'Açık',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Erasmus+ Bursu',
      description: 'Avrupa Birliği değişim programı bursu',
      coverage: 'Aylık yaşam ödeneği + seyahat desteği',
      deadline: '2024-03-31',
      requirements: 'AB üniversitelerinde değişim',
      type: 'Değişim Bursu',
      level: 'Lisans, Yüksek Lisans',
      status: 'Açık',
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const tips = [
    {
      title: 'Erken Başvuru',
      description: 'Burs başvurularını son tarihe bırakmayın. Erken başvuru şansınızı artırır.'
    },
    {
      title: 'Gerekli Belgeler',
      description: 'Tüm belgeleri eksiksiz ve zamanında hazırlayın. Eksik belge başvurunuzu geçersiz kılabilir.'
    },
    {
      title: 'Motivasyon Mektubu',
      description: 'Güçlü bir motivasyon mektubu yazın. Bu, sizi diğer adaylardan ayıran en önemli faktördür.'
    },
    {
      title: 'Referans Mektupları',
      description: 'Akademik ve profesyonel referanslarınızı önceden ayarlayın.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-red-600 hover:text-red-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Ana Sayfa</span>
            </Link>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Türkiye'de Burslar
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Yıllık Burs Sayısı</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Burs Programı</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tam Burs Oranı</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">180+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ülkeden Öğrenci</div>
            </CardContent>
          </Card>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {scholarships.map((scholarship, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-red-900 dark:text-red-100">
                    {scholarship.name}
                  </CardTitle>
                  <Badge className={scholarship.color}>
                    {scholarship.type}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {scholarship.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-green-600 dark:text-green-400">Kapsam: </span>
                      <span className="text-gray-700 dark:text-gray-300">{scholarship.coverage}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">Seviye: </span>
                      <span className="text-gray-700 dark:text-gray-300">{scholarship.level}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{scholarship.deadline}</span>
                    </div>
                    <div>
                      <Badge variant={scholarship.status === 'Açık' ? 'default' : 'secondary'}>
                        {scholarship.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-purple-600 dark:text-purple-400">Şartlar: </span>
                    <span className="text-gray-700 dark:text-gray-300">{scholarship.requirements}</span>
                  </div>

                  <Button className="w-full" disabled={scholarship.status === 'Kapalı'}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Başvuru Yap
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Burs Başvuru İpuçları</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scholarships;
