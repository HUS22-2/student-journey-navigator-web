
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [updating, setUpdating] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      Promise.all([
        fetchProfile(),
        fetchOpenUniversities(),
        fetchUserApplications()
      ]).finally(() => {
        setLoadingData(false);
      });
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Profile fetch error:', error);
        setError(t('errorUpdatingProfile'));
        return;
      }

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setNationality(data.nationality || '');
        setPhone(data.phone || '');
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      setError(t('unexpectedErrorOccurred'));
    }
  };

  const fetchOpenUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('status', 'Open')
        .order('name');

      if (error) {
        console.error('Error fetching universities:', error);
        setError(t('loadingUniversities'));
      } else {
        setUniversities(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching universities:', err);
    }
  };

  const fetchUserApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        setError(t('errorSubmittingApplication'));
      } else {
        setApplications(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching applications:', err);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);

    try {
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
        toast.error(t('errorUpdatingProfile'));
      } else {
        toast.success(t('profileUpdatedSuccessfully'));
        await fetchProfile();
      }
    } catch (err) {
      console.error('Unexpected error updating profile:', err);
      toast.error(t('unexpectedErrorOccurred'));
    }

    setUpdating(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success(t('signOutSuccessfully'));
    } catch (err) {
      console.error('Sign out error:', err);
      toast.error(t('errorSigningOut'));
    }
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
        return <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"><Clock className="h-3 w-3 mr-1" />{t('pending')}</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"><CheckCircle className="h-3 w-3 mr-1" />{t('approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"><XCircle className="h-3 w-3 mr-1" />{t('rejected')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-edu-blue-600 mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              {t('tryAgain')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-20 w-20 ring-4 ring-edu-blue-100">
              <AvatarImage src={profile?.profile_picture_url || undefined} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 text-white">
                {fullName ? fullName.charAt(0).toUpperCase() : t('user').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{fullName || t('user')}</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Badge variant="outline" className="bg-edu-blue-50 text-edu-blue-700 border-edu-blue-200">
                  {nationality || t('nationalityNotSpecified')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t('dashboard')}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <User className="h-4 w-4 mr-2" />
              {t('profile')}
            </TabsTrigger>
            <TabsTrigger value="universities" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <GraduationCap className="h-4 w-4 mr-2" />
              {t('universities')}
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-edu-blue-50 data-[state=active]:text-edu-blue-700">
              <Award className="h-4 w-4 mr-2" />
              {t('applications')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-edu-blue-500 to-edu-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">{t('openUniversity')}</p>
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
                      <p className="text-emerald-100 text-sm font-medium">{t('totalApplications')}</p>
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
                      <p className="text-purple-100 text-sm font-medium">{t('approved')}</p>
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
                    {t('recentApplications')}
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
                        <p className="text-gray-500">{t('noApplicationsYet')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <GraduationCap className="h-5 w-5 text-edu-blue-600" />
                    {t('featuredUniversities')}
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
                            {t('apply')}
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {universities.length === 0 && (
                      <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">{t('noUniversitiesYet')}</p>
                      </div>
                    )}
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
                  {t('profileInformation')}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t('updatePersonalInfo')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={updateProfile} className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Avatar className="h-24 w-24 ring-4 ring-edu-blue-100">
                      <AvatarImage src={profile?.profile_picture_url || undefined} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 text-white">
                        {fullName ? fullName.charAt(0).toUpperCase() : t('user').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="flex items-center gap-2 border-edu-blue-200 text-edu-blue-700 hover:bg-edu-blue-50">
                      <Camera className="h-4 w-4" />
                      {t('photoChange')}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">{t('email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="bg-gray-50 border-gray-200"
                      />
                      <p className="text-sm text-gray-500">{t('emailCannotChange')}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700 font-medium">{t('fullName')}</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t('fullName')}
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality" className="text-gray-700 font-medium">{t('nationality')}</Label>
                      <Input
                        id="nationality"
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        placeholder={t('nationality')}
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">{t('phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t('phone')}
                        className="border-gray-200 focus:border-edu-blue-500 focus:ring-edu-blue-500"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-edu-blue-600 to-edu-purple-600 hover:from-edu-blue-700 hover:to-edu-purple-700 text-white px-8"
                    disabled={updating}
                  >
                    {updating ? t('updating') : t('updateProfile')}
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
                  {t('openUniversitiesForApplication')}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t('universitiesYouCanApply')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {universities.map((university, index) => (
                    <Card key={`${university.name}-${index}`} className="group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-edu-blue-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-white" />
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {t('openUniversities')}
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
                            <span className="font-medium">{t('ranking')}:</span> {university.ranking}
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
                            {t('apply')}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                  {universities.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">{t('noUniversitiesYet')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Award className="h-5 w-5 text-edu-blue-600" />
                  {t('myApplications')}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t('trackYourApplications')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-edu-blue-100 to-edu-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="h-10 w-10 text-edu-blue-600" />
                    </div>
                    <p className="text-gray-500 text-lg mb-4">{t('noApplicationsMade')}</p>
                    <p className="text-gray-400 mb-6">{t('exploreUniversitiesStart')}</p>
                    <Link to="/universities">
                      <Button className="bg-gradient-to-r from-edu-blue-600 to-edu-purple-600 hover:from-edu-blue-700 hover:to-edu-purple-700 text-white px-8">
                        {t('exploreUniversities')}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((application) => (
                      <Card key={application.id} className="border-l-4 border-l-edu-blue-500 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-edu-blue-500 to-edu-purple-500 rounded-lg flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="font-bold text-lg text-gray-900">{application.country} {t('apply')}</h3>
                            </div>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">{t('educationLevel')}:</span>
                                <span className="text-gray-600">{application.education_level}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">{t('studyField')}:</span>
                                <span className="text-gray-600">{application.study_field}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">{t('languageOfInstruction')}:</span>
                                <span className="text-gray-600">{application.language_of_instruction}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-semibold text-gray-700 w-32">{t('submit')}:</span>
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
            <CardTitle className="text-gray-800">{t('accountActions')}</CardTitle>
            <CardDescription className="text-gray-600">
              {t('manageAccountSettings')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              {t('signOut')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
