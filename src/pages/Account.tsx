
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, LogOut, Camera, GraduationCap, Clock, CheckCircle, XCircle, ExternalLink, BarChart3, TrendingUp, Award } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  nationality: string | null;
  phone: string | null;
  profile_picture_url: string | null;
}

interface University {
  name: string;
  country: string;
  ranking: string | null;
  tuition: string | null;
  deadline: string | null;
  status: string;
}

interface Application {
  id: string;
  country: string;
  full_name: string;
  nationality: string;
  whatsapp: string;
  education_level: string;
  study_field: string;
  language_of_instruction: string;
  status: string;
  created_at: string;
}

const Account = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [updating, setUpdating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOpenUniversities();
      fetchUserApplications();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      toast.error('Profil bilgileri yüklenirken hata oluştu');
      return;
    }

    if (data) {
      setProfile(data);
      setFullName(data.full_name || '');
      setNationality(data.nationality || '');
      setPhone(data.phone || '');
    }
  };

  const fetchOpenUniversities = async () => {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('status', 'Open')
      .order('name');

    if (error) {
      console.error('Error fetching universities:', error);
    } else {
      setUniversities(data || []);
    }
    setLoadingData(false);
  };

  const fetchUserApplications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
    } else {
      setApplications(data || []);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        nationality: nationality,
        phone: phone,
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast.error('Profil güncellenirken hata oluştu');
    } else {
      toast.success('Profil başarıyla güncellendi!');
      fetchProfile();
    }

    setUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Başarıyla çıkış yapıldı');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"><Clock className="h-3 w-3 mr-1" />Beklemede</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"><CheckCircle className="h-3 w-3 mr-1" />Onaylandı</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"><XCircle className="h-3 w-3 mr-1" />Reddedildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-edu-blue-600 mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20 ring-4 ring-edu-blue-100">
              <AvatarImage src={profile?.profile_picture_url || undefined} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 text-white">
                {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{fullName || 'Kullanıcı'}</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <Badge variant="outline" className="bg-edu-blue-50 text-edu-blue-700 border-edu-blue-200">
                  {nationality || 'Uyruk belirtilmemiş'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="universities" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <GraduationCap className="h-4 w-4 mr-2" />
              Üniversiteler
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <Award className="h-4 w-4 mr-2" />
              Başvurularım
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-edu-blue-500 to-edu-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Açık Üniversite</p>
                      <p className="text-3xl font-bold">{universities.length}</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Toplam Başvuru</p>
                      <p className="text-3xl font-bold">{applications.length}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Onaylanan</p>
                      <p className="text-3xl font-bold">
                        {applications.filter(app => app.status === 'approved').length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Clock className="h-5 w-5 text-edu-blue-600" />
                    Son Başvurular
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{application.country}</p>
                          <p className="text-sm text-gray-500">{formatDate(application.created_at)}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Henüz başvuru yok</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <GraduationCap className="h-5 w-5 text-edu-blue-600" />
                    Öne Çıkan Üniversiteler
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {universities.slice(0, 3).map((university, index) => (
                      <div key={`${university.name}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-900">{university.name}</p>
                          <p className="text-sm text-gray-500">🇹🇷 {university.country}</p>
                        </div>
                        <Link to={`/apply/${university.country.toLowerCase()}`}>
                          <Button size="sm" className="bg-edu-blue-600 hover:bg-edu-blue-700">
                            Başvur
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <User className="h-5 w-5 text-edu-blue-600" />
                  Profil Bilgileri
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Kişisel bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={updateProfile} className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24 ring-4 ring-edu-blue-100">
                      <AvatarImage src={profile?.profile_picture_url || undefined} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 text-white">
                        {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2 border-edu-blue-200 text-edu-blue-700 hover:bg-edu-blue-50">
                      <Camera className="h-4 w-4" />
                      Fotoğraf Değiştir
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="bg-gray-50 border-gray-200"
                      />
                      <p className="text-sm text-gray-500">E-posta değiştirilemez</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700 font-medium">Ad Soyad</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Adınızı ve soyadınızı girin"
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality" className="text-gray-700 font-medium">Uyruk</Label>
                      <Input
                        id="nationality"
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Uyruğunuzu girin"
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Telefon Numarası</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefon numaranızı girin"
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-edu-blue-600 to-edu-purple-600 hover:from-edu-blue-700 hover:to-edu-purple-700 text-white px-8"
                    disabled={updating}
                  >
                    {updating ? 'Güncelleniyor...' : 'Profili Güncelle'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <GraduationCap className="h-5 w-5 text-edu-blue-600" />
                  Açık Üniversiteler
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Başvuru yapabileceğiniz üniversiteler
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {loadingData ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edu-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Üniversiteler yükleniyor...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universities.map((university, index) => (
                      <Card key={`${university.name}-${index}`} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-edu-blue-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 rounded-lg flex items-center justify-center">
                              <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Açık
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-edu-blue-700 transition-colors">
                            {university.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1 flex items-center">
                            <span className="mr-2">🇹🇷</span>
                            {university.country}
                          </p>
                          {university.ranking && (
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Sıralama:</span> {university.ranking}
                            </p>
                          )}
                          {university.tuition && (
                            <p className="text-sm text-emerald-600 mb-4 font-medium">
                              {university.tuition}
                            </p>
                          )}
                          <Link to={`/apply/${university.country.toLowerCase()}`} className="block">
                            <Button className="w-full bg-gradient-to-r from-edu-blue-600 to-edu-purple-600 hover:from-edu-blue-700 hover:to-edu-purple-700 text-white group-hover:shadow-lg transition-all duration-300">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Başvur
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Award className="h-5 w-5 text-edu-blue-600" />
                  Başvurularım
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Yaptığınız başvuruları takip edin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-edu-blue-100 to-edu-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="h-10 w-10 text-edu-blue-600" />
                    </div>
                    <p className="text-gray-500 text-lg mb-4">Henüz başvuru yapmadınız</p>
                    <p className="text-gray-400 mb-6">Üniversiteleri inceleyerek başvuru sürecinizi başlatabilirsiniz</p>
                    <Link to="/universities">
                      <Button className="bg-gradient-to-r from-edu-blue-600 to-edu-purple-600 hover:from-edu-blue-700 hover:to-edu-purple-700 text-white px-8">
                        Üniversiteleri İncele
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((application) => (
                      <Card key={application.id} className="border-l-4 border-l-edu-blue-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 rounded-lg flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="font-bold text-lg text-gray-900">{application.country} Başvurusu</h3>
                            </div>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">Eğitim Seviyesi:</span>
                                <span className="text-gray-600">{application.education_level}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">Çalışma Alanı:</span>
                                <span className="text-gray-600">{application.study_field}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">Öğretim Dili:</span>
                                <span className="text-gray-600">{application.language_of_instruction}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">Başvuru Tarihi:</span>
                                <span className="text-gray-600">{formatDate(application.created_at)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Account Actions */}
        <Card className="shadow-lg border-0 bg-white mt-8">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-gray-800">Hesap İşlemleri</CardTitle>
            <CardDescription className="text-gray-600">
              Hesap ayarlarınızı yönetin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
