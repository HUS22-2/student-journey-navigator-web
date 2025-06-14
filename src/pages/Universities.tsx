import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, GraduationCap, MapPin, Calendar, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface University {
  id: string;
  name: string;
  country: string;
  ranking: string | null;
  tuition: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const Universities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 
    'Kayseri', 'Trabzon', 'Eskişehir', 'Denizli', 'Mersin', 'Samsun', 'Edirne'
  ];

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [universities, searchTerm, statusFilter, cityFilter]);

  const fetchUniversities = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching universities from Supabase...');
      
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('country', 'Turkey')
        .order('name');

      if (error) {
        console.error('Error fetching universities:', error);
        toast({
          title: "Hata",
          description: "Üniversiteler yüklenirken bir hata oluştu: " + error.message,
          variant: "destructive"
        });
      } else {
        console.log('Fetched universities:', data);
        setUniversities(data || []);
        
        if (!data || data.length === 0) {
          toast({
            title: "Bilgi",
            description: "Henüz üniversite verisi bulunmuyor.",
            variant: "default"
        });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterUniversities = () => {
    let filtered = universities;

    if (searchTerm) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(uni => uni.status === statusFilter);
    }

    setFilteredUniversities(filtered);
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return 'Belirtilmemiş';
    try {
      return new Date(deadline).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Belirtilmemiş';
    }
  };

  const openUniversitiesCount = universities.filter(uni => uni.status === 'Open').length;
  const totalUniversitiesCount = universities.length;

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
              <span className="text-4xl">🇹🇷</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Türkiye Üniversiteleri
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUniversities}
                disabled={isLoading}
                className="ml-4"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{totalUniversitiesCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Toplam Üniversite</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{openUniversitiesCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Açık Başvuru</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">81</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">İl</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">250K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uluslararası Öğrenci</div>
            </CardContent>
          </Card>
        </div>

        {/* Connection Status */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Supabase Bağlantısı Aktif</span>
              </div>
              <div className="text-sm text-gray-600">
                Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtreler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Üniversite ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Başvuru Durumu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="Open">Açık</SelectItem>
                  <SelectItem value="Closed">Kapalı</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Şehir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Şehirler</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Universities Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Üniversite Listesi</span>
              <Badge variant="secondary" className="ml-2">
                {filteredUniversities.length} sonuç
              </Badge>
            </CardTitle>
            <CardDescription>
              Türkiye'deki üniversiteler ve başvuru durumları (Supabase veritabanından)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Supabase'den üniversiteler yükleniyor...</p>
                </div>
              </div>
            ) : filteredUniversities.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {universities.length === 0 ? 
                    'Henüz üniversite verisi bulunmuyor. Supabase veritabanını kontrol edin.' :
                    'Arama kriterlerinize uygun üniversite bulunamadı'
                  }
                </p>
                {universities.length === 0 && (
                  <Button 
                    onClick={fetchUniversities} 
                    className="mt-4"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Yeniden Dene
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[250px]">Üniversite</TableHead>
                      <TableHead className="min-w-[100px]">Sıralama</TableHead>
                      <TableHead className="min-w-[120px]">Ücret</TableHead>
                      <TableHead className="min-w-[120px]">Son Başvuru</TableHead>
                      <TableHead className="min-w-[80px]">Durum</TableHead>
                      <TableHead className="min-w-[100px]">İşlem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUniversities.map((university) => (
                      <TableRow key={university.id || university.name}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span>{university.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {university.ranking || 'N/A'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {university.tuition || 'Belirtilmemiş'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              {formatDeadline(university.deadline)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={university.status === 'Open' ? 'default' : 'secondary'}
                            className={university.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          >
                            {university.status === 'Open' ? 'Açık' : 'Kapalı'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Link to="/apply/turkey">
                            <Button 
                              size="sm" 
                              variant={university.status === 'Open' ? 'default' : 'secondary'}
                              disabled={university.status === 'Closed'}
                              className="flex items-center space-x-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>{university.status === 'Open' ? 'Başvur' : 'Kapalı'}</span>
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Universities;
