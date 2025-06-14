
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Users, Building, Plane, Heart, Coffee } from 'lucide-react';

const Cities = () => {
  const cities = [
    {
      name: 'İstanbul',
      region: 'Marmara',
      population: '15.8M',
      universities: 50,
      averageCost: '3000-5000 TL',
      description: 'Tarih ve modernliğin buluştuğu kültür başkenti',
      highlights: ['Boğaz manzarası', 'Zengin kültür', 'İş olanakları', 'Uluslararası havalimanı'],
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Ankara',
      region: 'İç Anadolu',
      population: '5.7M',
      universities: 25,
      averageCost: '2500-4000 TL',
      description: 'Türkiye\'nin başkenti ve siyasi merkezi',
      highlights: ['Devlet üniversiteleri', 'Politik merkez', 'Kültürel etkinlikler', 'Güvenli yaşam'],
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'İzmir',
      region: 'Ege',
      population: '4.4M',
      universities: 15,
      averageCost: '2800-4500 TL',
      description: 'Ege\'nin incisi, deniz kenarında yaşam',
      highlights: ['Deniz kenarı', 'Üniversite hayatı', 'Tarihî yerler', 'Sıcak iklim'],
      image: 'https://images.unsplash.com/photo-1564594985645-4427056de271?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-teal-600'
    },
    {
      name: 'Bursa',
      region: 'Marmara',
      population: '3.1M',
      universities: 12,
      averageCost: '2200-3500 TL',
      description: 'Yeşil Bursa, doğa ve tarihin buluşması',
      highlights: ['Uludağ', 'Tarihî dokular', 'Sanayi merkezi', 'Uygun yaşam'],
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Antalya',
      region: 'Akdeniz',
      population: '2.6M',
      universities: 8,
      averageCost: '2600-4000 TL',
      description: 'Türkiye\'nin turizm başkenti',
      highlights: ['Deniz ve güneş', 'Turizm', 'Antik şehirler', '12 ay güneş'],
      image: 'https://images.unsplash.com/photo-1604608113890-72b5ac0c36e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Eskişehir',
      region: 'İç Anadolu',
      population: '888K',
      universities: 6,
      averageCost: '2000-3200 TL',
      description: 'Türkiye\'nin en genç şehri',
      highlights: ['Üniversite şehri', 'Genç nüfus', 'Kültürel aktiviteler', 'Çağdaş yaşam'],
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const livingCosts = [
    { category: 'Barınma (Aylık)', range: '1500-3000 TL' },
    { category: 'Yemek (Aylık)', range: '800-1500 TL' },
    { category: 'Ulaşım (Aylık)', range: '200-400 TL' },
    { category: 'Kitap/Malzeme', range: '300-600 TL' },
    { category: 'Sosyal Aktiviteler', range: '400-800 TL' }
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
              <MapPin className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Türkiye'de Şehirler
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">81</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">İl</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Üniversite Şehri</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Coğrafi Bölge</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">84M</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Toplam Nüfus</div>
            </CardContent>
          </Card>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {cities.map((city, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                  <p className="text-gray-200">{city.region} Bölgesi</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">{city.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-sm font-semibold">{city.population}</div>
                    <div className="text-xs text-gray-500">Nüfus</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Building className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-sm font-semibold">{city.universities}</div>
                    <div className="text-xs text-gray-500">Üniversite</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="text-sm font-semibold">{city.averageCost}</div>
                    <div className="text-xs text-gray-500">Aylık Maliyet</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Öne Çıkan Özellikler:</h4>
                  <div className="flex flex-wrap gap-2">
                    {city.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Living Costs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coffee className="h-5 w-5" />
              <span>Yaşam Maliyetleri (Aylık Ortalama)</span>
            </CardTitle>
            <CardDescription>
              Türkiye'de öğrenci yaşamı için genel maliyet rehberi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livingCosts.map((cost, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {cost.category}
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {cost.range}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Tasarruf İpuçları
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Öğrenci yurtlarını tercih edin (daha ekonomik)</li>
                <li>• Öğrenci indirimleriyle ulaşım yapın</li>
                <li>• Üniversite kantinlerini kullanın</li>
                <li>• Grup halinde alışveriş yapın</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cities;
