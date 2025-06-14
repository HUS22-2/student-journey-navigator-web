import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, MapPin, DollarSign, GraduationCap, Users, Calendar, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface University {
  name: string;
  country: string;
  ranking: string | null;
  tuition: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const CountryPage = () => {
  const { countryName } = useParams();
  const { t, language } = useLanguage();
  const applicationFormRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    whatsapp: '',
    educationLevel: '',
    studyField: '',
    languageOfInstruction: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(true);

  // Map URL country names to database country names
  const getDbCountryName = (urlCountryName: string) => {
    const countryMapping: { [key: string]: string } = {
      'turkey': 'Turkey',
      'france': 'France',
      'russia': 'Russia'
    };
    return countryMapping[urlCountryName] || 'Turkey';
  };

  const countryData = {
    turkey: {
      name: t('turkey'),
      flag: '🇹🇷',
      capital: 'Ankara',
      language: 'Turkish',
      currency: 'Turkish Lira',
      dbName: 'Turkey', // Database country name
      requirements: [
        t('highSchoolDiploma'),
        t('englishProficiency'),
        t('passportCopy'),
        t('motivationLetter'),
        t('academicTranscripts'),
        t('healthInsurance'),
        t('proofFinancialSupport')
      ],
      scholarships: [
        {
          name: t('turkishGovernmentScholarship'),
          description: t('fullScholarshipCovering'),
          coverage: t('fullTuitionStipend'),
          deadline: '2024-02-20',
          requirements: t('gpaRequirement')
        },
        {
          name: t('ytbScholarship'),
          description: t('partialScholarshipUndergrad'),
          coverage: t('tuitionAccommodation'),
          deadline: '2024-03-15',
          requirements: t('academicExcellenceLeadership')
        },
        {
          name: t('universityMeritScholarships'),
          description: t('institutionSpecificScholarships'),
          coverage: t('tuitionReduction'),
          deadline: t('variesByUniversity'),
          requirements: t('highAcademicPerformance')
        },
        {
          name: t('ibnKhaldunScholarship'),
          description: t('specialScholarshipDeveloping'),
          coverage: t('fullTuitionLiving'),
          deadline: '2024-04-01',
          requirements: t('financialNeedMerit')
        }
      ],
      cost: '$8,000-$12,000 per year (including accommodation)'
    },
    france: {
      name: t('france'),
      flag: '🇫🇷',
      capital: 'Paris',
      language: 'French',
      currency: 'Euro',
      dbName: 'France',
      requirements: [
        'Baccalauréat or equivalent',
        'French proficiency (DELF/DALF) or English (TOEFL/IELTS)',
        t('passportCopy'),
        'Motivation letter in French',
        t('academicTranscripts')
      ],
      scholarships: [
        {
          name: 'Eiffel Excellence Scholarship',
          description: 'Prestigious scholarship for international students',
          coverage: '€1,181/month + tuition',
          deadline: '2024-01-09',
          requirements: t('excellenceUnder30')
        }
      ],
      cost: '€15,000-€25,000 per year (including accommodation)'
    },
    russia: {
      name: t('russia'),
      flag: '🇷🇺',
      capital: 'Moscow',
      language: 'Russian',
      currency: 'Russian Ruble',
      dbName: 'Russia',
      requirements: [
        'Secondary education certificate',
        'Russian language proficiency or English for English programs',
        'Medical certificate',
        'Passport and visa documents',
        'Academic transcripts with apostille'
      ],
      scholarships: [
        {
          name: 'Russian Government Scholarship',
          description: 'Full scholarship for international students',
          coverage: 'Full tuition + monthly stipend',
          deadline: '2024-02-15',
          requirements: t('academicExcellenceUnder35')
        }
      ],
      cost: '$4,000-$8,000 per year (including accommodation)'
    }
  };

  const currentCountry = countryData[countryName as keyof typeof countryData];

  useEffect(() => {
    const fetchUniversities = async () => {
      if (!currentCountry) return;
      
      setIsLoadingUniversities(true);
      
      // Use the database country name instead of the translated name
      const dbCountryName = currentCountry.dbName;
      console.log('Fetching universities for database country:', dbCountryName);
      
      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .eq('country', dbCountryName)
          .order('name');

        if (error) {
          console.error('Error fetching universities:', error);
          toast({
            title: "Error",
            description: "Failed to load universities. Please try again later.",
            variant: "destructive"
          });
          setUniversities([]);
        } else {
          console.log('Universities fetched:', data);
          // Clean up the data by removing newline characters
          const cleanedData = data?.map(university => ({
            ...university,
            name: university.name?.replace(/\n/g, '').trim() || university.name,
            ranking: university.ranking?.replace(/\n/g, '').trim() || university.ranking
          })) || [];
          setUniversities(cleanedData);
          
          if (cleanedData.length > 0) {
            toast({
              title: t('success'),
              description: `${cleanedData.length} ${t('universitiesLoaded')}`,
            });
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching universities:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while loading universities.",
          variant: "destructive"
        });
        setUniversities([]);
      } finally {
        setIsLoadingUniversities(false);
      }
    };

    fetchUniversities();
  }, [currentCountry?.dbName, t]); // Use dbName instead of name

  const scrollToApplicationForm = () => {
    if (applicationFormRef.current) {
      applicationFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Add a small delay and highlight the form
      setTimeout(() => {
        if (applicationFormRef.current) {
          applicationFormRef.current.style.border = '2px solid #3b82f6';
          setTimeout(() => {
            if (applicationFormRef.current) {
              applicationFormRef.current.style.border = '';
            }
          }, 2000);
        }
      }, 500);
    }
  };

  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('countryNotFound')}</h1>
          <Link to="/">
            <Button>{t('returnToHome')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.fullName || !formData.nationality || !formData.whatsapp || 
        !formData.educationLevel || !formData.studyField || !formData.languageOfInstruction) {
      toast({
        title: t('missingInformation'),
        description: t('fillAllRequired'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting application:', { ...formData, country: currentCountry.dbName });

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.fullName,
            nationality: formData.nationality,
            whatsapp: formData.whatsapp,
            education_level: formData.educationLevel,
            study_field: formData.studyField,
            language_of_instruction: formData.languageOfInstruction,
            country: currentCountry.dbName // Use dbName for consistency
          }
        ]);

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: t('submissionFailed'),
          description: t('errorSubmittingApplication'),
          variant: "destructive"
        });
      } else {
        console.log('Application submitted successfully:', data);
        toast({
          title: t('applicationSubmitted'),
          description: t('contactWithin24Hours'),
        });
        
        // Reset the form
        setFormData({
          fullName: '',
          nationality: '',
          whatsapp: '',
          educationLevel: '',
          studyField: '',
          languageOfInstruction: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: t('submissionFailed'),
        description: t('unexpectedError'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return 'N/A';
    try {
      return new Date(deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-edu-blue-600 hover:text-edu-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>{t('backToCountries')}</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentCountry.flag}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('studyIn')} {currentCountry.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="universities" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="universities">{t('universities')}</TabsTrigger>
                <TabsTrigger value="scholarships">{t('scholarships')}</TabsTrigger>
                <TabsTrigger value="requirements">{t('requirements')}</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="universities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>{t('openUniversities')}</span>
                    </CardTitle>
                    <CardDescription>
                      {t('currentApplicationDeadlines')} {currentCountry.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingUniversities ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edu-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">{t('loadingUniversities')}</p>
                        </div>
                      </div>
                    ) : universities.length === 0 ? (
                      <div className="text-center py-12">
                        <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          {t('noUniversitiesFound')} {currentCountry.name}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                          {t('checkBackLater')}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="min-w-[200px]">{t('university')}</TableHead>
                              <TableHead className="min-w-[100px]">{t('ranking')}</TableHead>
                              <TableHead className="min-w-[120px]">{t('tuition')}</TableHead>
                              <TableHead className="min-w-[120px]">{t('deadline')}</TableHead>
                              <TableHead className="min-w-[80px]">{t('status')}</TableHead>
                              <TableHead className="min-w-[100px]">{t('action')}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {universities.map((university, index) => (
                              <TableRow key={`${university.name}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <TableCell className="font-medium">
                                  {university.name}
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {university.ranking || 'N/A'}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                    {university.tuition || 'N/A'}
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
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    university.status === 'Open' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                  }`}>
                                    {university.status === 'Open' ? t('apply') : t('closed')}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Link to={`/apply/${countryName}`}>
                                    <Button 
                                      size="sm" 
                                      variant={university.status === 'Open' ? 'default' : 'secondary'}
                                      disabled={university.status === 'Closed'}
                                      className="flex items-center space-x-1 w-full"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      <span>{university.status === 'Open' ? t('apply') : t('closed')}</span>
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
              </TabsContent>

              <TabsContent value="scholarships" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>{t('availableScholarships')}</span>
                    </CardTitle>
                    <CardDescription>
                      {t('fundingOpportunities')} {currentCountry.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentCountry.scholarships.map((scholarship, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-edu-blue-900 dark:text-edu-blue-100">
                              {scholarship.name}
                            </h4>
                            <span className="text-sm text-gray-500 flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{scholarship.deadline}</span>
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {scholarship.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-green-600 dark:text-green-400">{t('coverage')}: </span>
                              <span className="text-gray-700 dark:text-gray-300">{scholarship.coverage}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-600 dark:text-blue-400">{t('requirements')}: </span>
                              <span className="text-gray-700 dark:text-gray-300">{scholarship.requirements}</span>
                            </div>
                          </div>
                          <Button className="mt-4 w-full md:w-auto">
                            {t('applyForScholarship')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('admissionRequirements')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentCountry.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-edu-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('frequentlyAskedQuestions')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">{t('costOfLiving')}</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {currentCountry.cost}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('needLocalLanguage')}</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('manyProgramsEnglish')} {currentCountry.language} {t('beneficialForLife')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('whenToApply')}</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('deadlinesVary')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24" ref={applicationFormRef}>
              <CardHeader>
                <CardTitle className="text-center">{t('startApplication')}</CardTitle>
                <CardDescription className="text-center">
                  {t('fillFormBelow')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">{t('fullName')}</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">{t('nationality')}</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">{t('whatsapp')}</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="educationLevel">{t('educationLevel')}</Label>
                    <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="studyField">{t('studyField')}</Label>
                    <Input
                      id="studyField"
                      value={formData.studyField}
                      onChange={(e) => handleInputChange('studyField', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="languageOfInstruction">{t('languageOfInstruction')}</Label>
                    <Select value={formData.languageOfInstruction} onValueChange={(value) => handleInputChange('languageOfInstruction', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="arabic">العربية</SelectItem>
                        <SelectItem value="local">Local Language</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-edu-blue-500 to-edu-purple-500 hover:from-edu-blue-600 hover:to-edu-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('submitting') : t('submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
