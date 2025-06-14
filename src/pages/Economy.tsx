
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, DollarSign, PieChart, Building, Briefcase, GraduationCap } from 'lucide-react';

const Economy = () => {
  const economicIndicators = [
    {
      title: 'GSYİH',
      value: '$815 Milyar',
      description: 'Türkiye\'nin yıllık gayri safi yurtiçi hasılası',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Döviz Kuru',
      value: '₺30.5 / $1',
      description: 'USD/TRY güncel kuru (değişken)',
      trend: 'neutral',
      icon: DollarSign
    },
    {
      title: 'Enflasyon',
      value: '%65',
      description: 'Yıllık tüketici enflasyonu',
      trend: 'down',
      icon: PieChart
    },
    {
      title: 'İşsizlik',
      value: '%10.4',
      description: 'Genel işsizlik oranı',
      trend: 'down',
      icon: Briefcase
    }
  ];

  const studentEconomy = [
    {
      category: 'Barınma',
      studentHousing: '1500-2500 TL',
      privateHousing: '3000-6000 TL',
      description: 'Öğrenci yurtları çok daha ekonomik'
    },
    {
      category: 'Yemek',
      studentHousing: '15-25 TL',
      privateHousing: '40-80 TL',
      description: 'Üniversite kantinleri ve öğrenci menüleri'
    },
    {
      category: 'Ulaşım',
      studentHousing: '60-120 TL',
      privateHousing: '200-400 TL',
      description: 'Öğrenci kartlarıyla %50 indirim'
    },
    {
      category: 'Kitap/Malzeme',
      studentHousing: '300-600 TL',
      privateHousing: '500-1000 TL',
      description: 'İkinci el kitap pazarları mevcut'
    }
  ];

  const jobOpportunities = [
    {
      sector: 'Teknoloji',
      averageSalary: '25,000-50,000 TL',
      demand: 'Yüksek',
      description: 'Yazılım, veri analizi, siber güvenlik'
    },
    {
      sector: 'Mühendislik',
      averageSalary: '20,000-40,000 TL',
      demand: 'Yüksek',
      description: 'İnşaat, makine, elektrik mühendisliği'
    },
    {
      sector: 'Sağlık',
      averageSalary: '18,000-35,000 TL',
      demand: 'Çok Yüksek',
      description: 'Doktor, hemşire, tıbbi teknoloji'
    },
    {
      sector: 'Finans',
      averageSalary: '22,000-45,000 TL',
      demand: 'Orta',
      description: 'Bankacılık, muhasebe, fintech'
    },
    {
      sector: 'Turizm',
      averageSalary: '15,000-30,000 TL',
      demand: 'Yüksek',
      description: 'Otel yönetimi, rehberlik, gastronomi'
    },
    {
      sector: 'Eğitim',
      averageSalary: '16,000-28,000 TL',
      demand: 'Orta',
      description: 'Öğretmenlik, akademisyenlik'
    }
  ];

  const tips = [
    {
      title: 'Bütçe Yönetimi',
      description: 'Aylık giderlerinizi takip edin ve bir bütçe planı yapın.',
      icon: '💰'
    },
    {
      title: 'Öğrenci İndirimleri',
      description: 'Ulaşım, sinema, tiyatro gibi alanlarda öğrenci indirimlerini kullanın.',
      icon: '🎓'
    },
    {
      title: 'Part-time İş',
      description: 'Öğrenim sürenizde yasal olarak part-time çalışabilirsiniz.',
      icon: '💼'
    },
    {
      title: 'Döviz Takibi',
      description: 'Ailenizdeki döviz transferleri için uygun zamanları takip edin.',
      icon: '📈'
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
              <Building className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Türkiye Ekonomisi
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Economic Indicators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ekonomik Göstergeler</CardTitle>
            <CardDescription>
              Türkiye'nin güncel ekonomik durumu (2024)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {economicIndicators.map((indicator, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <indicator.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {indicator.value}
                  </div>
                  <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {indicator.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {indicator.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Economy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Öğrenci Ekonomisi</span>
            </CardTitle>
            <CardDescription>
              Öğrenci olarak Türkiye'de yaşam maliyetleri karşılaştırması
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Kategori</th>
                    <th className="text-left py-3 px-4">Öğrenci Seçenekleri</th>
                    <th className="text-left py-3 px-4">Genel Fiyatlar</th>
                    <th className="text-left py-3 px-4">Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {studentEconomy.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4 font-semibold">{item.category}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">{item.studentHousing}</td>
                      <td className="py-3 px-4 text-gray-600">{item.privateHousing}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Job Market */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>İş Piyasası ve Mezuniyet Sonrası</CardTitle>
            <CardDescription>
              Türkiye'de mezun olduktan sonra iş fırsatları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpportunities.map((job, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{job.sector}</h4>
                    <Badge 
                      variant={job.demand === 'Çok Yüksek' ? 'default' : job.demand === 'Yüksek' ? 'secondary' : 'outline'}
                    >
                      {job.demand}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-green-600 mb-2">
                    {job.averageSalary}
                  </div>
                  <div className="text-sm text-gray-500">
                    {job.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Ekonomik İpuçları</CardTitle>
            <CardDescription>
              Türkiye'de öğrenci olarak finansal başarı için öneriler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Economy;
