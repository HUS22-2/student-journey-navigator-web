
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
import { User, LogOut, Camera, GraduationCap, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

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
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Beklemede</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Onaylandı</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Reddedildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hesap Yönetimi</h1>
          <p className="text-gray-600 dark:text-gray-300">Profilinizi yönetin ve başvurularınızı takip edin</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="universities">Açık Üniversiteler</TabsTrigger>
            <TabsTrigger value="applications">Başvurularım</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{universities.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Açık Üniversite</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{applications.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Toplam Başvuru</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {applications.filter(app => app.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Onaylanan</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Son Başvurular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.slice(0, 3).map((application) => (
                    <div key={application.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{application.country}</p>
                        <p className="text-sm text-gray-500">{formatDate(application.created_at)}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Henüz başvuru yok</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Öne Çıkan Üniversiteler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {universities.slice(0, 3).map((university, index) => (
                    <div key={`${university.name}-${index}`} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{university.name}</p>
                        <p className="text-sm text-gray-500">{university.country}</p>
                      </div>
                      <Link to={`/apply/${university.country.toLowerCase()}`}>
                        <Button size="sm" variant="outline">
                          Başvur
                        </Button>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profil Bilgileri
                </CardTitle>
                <CardDescription>
                  Kişisel bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateProfile} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.profile_picture_url || undefined} />
                      <AvatarFallback className="text-lg">
                        {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Fotoğraf Değiştir
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                      <p className="text-sm text-gray-500">E-posta değiştirilemez</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Ad Soyad</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Adınızı ve soyadınızı girin"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Uyruk</Label>
                      <Input
                        id="nationality"
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder="Uyruğunuzu girin"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon Numarası</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefon numaranızı girin"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    disabled={updating}
                  >
                    {updating ? 'Güncelleniyor...' : 'Profili Güncelle'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Açık Üniversiteler
                </CardTitle>
                <CardDescription>
                  Başvuru yapabileceğiniz üniversiteler
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p>Üniversiteler yükleniyor...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {universities.map((university, index) => (
                      <Card key={`${university.name}-${index}`} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{university.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">🇹🇷 {university.country}</p>
                          {university.ranking && (
                            <p className="text-sm text-gray-600 mb-1">Sıralama: {university.ranking}</p>
                          )}
                          {university.tuition && (
                            <p className="text-sm text-green-600 mb-3">Ücret: {university.tuition}</p>
                          )}
                          <Link to={`/apply/${university.country.toLowerCase()}`}>
                            <Button className="w-full" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Başvurularım
                </CardTitle>
                <CardDescription>
                  Yaptığınız başvuruları takip edin
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">Henüz başvuru yapmadınız</p>
                    <Link to="/universities">
                      <Button>Üniversiteleri İncele</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <Card key={application.id} className="border-l-4 border-l-red-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg">{application.country} Başvurusu</h3>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p><strong>Eğitim Seviyesi:</strong> {application.education_level}</p>
                              <p><strong>Çalışma Alanı:</strong> {application.study_field}</p>
                            </div>
                            <div>
                              <p><strong>Öğretim Dili:</strong> {application.language_of_instruction}</p>
                              <p><strong>Başvuru Tarihi:</strong> {formatDate(application.created_at)}</p>
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
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Hesap İşlemleri</CardTitle>
            <CardDescription>
              Hesap ayarlarınızı yönetin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="flex items-center gap-2"
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
