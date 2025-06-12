import { useState } from 'react';
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

const CountryPage = () => {
  const { countryName } = useParams();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    whatsapp: '',
    educationLevel: '',
    studyField: '',
    languageOfInstruction: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryData = {
    turkey: {
      name: 'Turkey',
      flag: '🇹🇷',
      capital: 'Ankara',
      language: 'Turkish',
      currency: 'Turkish Lira',
      universities: [
        { name: 'Istanbul University', ranking: '#500-550', tuition: '$2,000-$4,000', deadline: '2024-07-15', status: 'Open' },
        { name: 'Middle East Technical University', ranking: '#400-450', tuition: '$3,000-$5,000', deadline: '2024-06-30', status: 'Open' },
        { name: 'Bogazici University', ranking: '#300-350', tuition: '$4,000-$6,000', deadline: '2024-06-15', status: 'Open' },
        { name: 'Hacettepe University', ranking: '#450-500', tuition: '$2,500-$4,500', deadline: '2024-07-01', status: 'Open' },
        { name: 'Sabanci University', ranking: '#400-450', tuition: '$15,000-$20,000', deadline: '2024-07-20', status: 'Open' },
        { name: 'Bilkent University', ranking: '#350-400', tuition: '$12,000-$18,000', deadline: '2024-06-25', status: 'Open' }
      ],
      requirements: [
        'High school diploma with minimum 70% average',
        'English proficiency test (TOEFL/IELTS)',
        'Passport copy',
        'Motivation letter',
        'Academic transcripts',
        'Health insurance',
        'Proof of financial support'
      ],
      scholarships: [
        {
          name: 'Turkish Government Scholarship (Türkiye Bursları)',
          description: 'Full scholarship covering tuition, accommodation, and monthly stipend',
          coverage: '100% tuition + $400/month stipend',
          deadline: '2024-02-20',
          requirements: 'GPA ≥ 70%, TOEFL ≥ 79'
        },
        {
          name: 'YTB Scholarship',
          description: 'Partial scholarship for undergraduate and graduate students',
          coverage: 'Tuition + accommodation',
          deadline: '2024-03-15',
          requirements: 'Academic excellence, leadership skills'
        },
        {
          name: 'University Merit Scholarships',
          description: 'Institution-specific scholarships based on academic merit',
          coverage: '25%-75% tuition reduction',
          deadline: 'Varies by university',
          requirements: 'High academic performance'
        },
        {
          name: 'Ibn Khaldun Scholarship',
          description: 'Special scholarship for students from developing countries',
          coverage: 'Full tuition + living expenses',
          deadline: '2024-04-01',
          requirements: 'Financial need, academic merit'
        }
      ],
      cost: '$8,000-$12,000 per year (including accommodation)'
    },
    france: {
      name: 'France',
      flag: '🇫🇷',
      capital: 'Paris',
      language: 'French',
      currency: 'Euro',
      universities: [
        { name: 'Sorbonne University', ranking: '#72', tuition: '€170-€3,770', deadline: '2024-03-15', status: 'Open' },
        { name: 'École Normale Supérieure', ranking: '#45', tuition: '€170-€3,770', deadline: '2024-01-31', status: 'Closed' },
        { name: 'Sciences Po', ranking: '#150', tuition: '€13,000-€15,000', deadline: '2024-02-28', status: 'Open' },
        { name: 'HEC Paris', ranking: '#12 (Business)', tuition: '€39,000-€42,000', deadline: '2024-04-15', status: 'Open' }
      ],
      requirements: [
        'Baccalauréat or equivalent',
        'French proficiency (DELF/DALF) or English (TOEFL/IELTS)',
        'Passport copy',
        'Motivation letter in French',
        'Academic transcripts'
      ],
      scholarships: [
        {
          name: 'Eiffel Excellence Scholarship',
          description: 'Prestigious scholarship for international students',
          coverage: '€1,181/month + tuition',
          deadline: '2024-01-09',
          requirements: 'Excellence in academics, under 30 years old'
        }
      ],
      cost: '€15,000-€25,000 per year (including accommodation)'
    },
    russia: {
      name: 'Russia',
      flag: '🇷🇺',
      capital: 'Moscow',
      language: 'Russian',
      currency: 'Russian Ruble',
      universities: [
        { name: 'Moscow State University', ranking: '#78', tuition: '$3,000-$6,000', deadline: '2024-07-01', status: 'Open' },
        { name: 'Saint Petersburg State University', ranking: '#250', tuition: '$2,500-$5,000', deadline: '2024-06-15', status: 'Open' },
        { name: 'Bauman Moscow State Technical University', ranking: '#350', tuition: '$3,500-$7,000', deadline: '2024-07-15', status: 'Open' },
        { name: 'ITMO University', ranking: '#300', tuition: '$4,000-$8,000', deadline: '2024-06-30', status: 'Open' }
      ],
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
          requirements: 'Academic excellence, age under 35'
        }
      ],
      cost: '$4,000-$8,000 per year (including accommodation)'
    }
  };

  const currentCountry = countryData[countryName as keyof typeof countryData];

  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
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
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting application:', { ...formData, country: currentCountry.name });

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
            country: currentCountry.name
          }
        ]);

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      } else {
        console.log('Application submitted successfully:', data);
        toast({
          title: "Application Submitted!",
          description: "We'll contact you within 24 hours via WhatsApp.",
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
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-edu-blue-600 hover:text-edu-blue-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Countries</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentCountry.flag}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Study in {currentCountry.name}
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
                <TabsTrigger value="universities">Universities</TabsTrigger>
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="universities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Open Universities for Application</span>
                    </CardTitle>
                    <CardDescription>
                      Current application deadlines and status for {currentCountry.name} universities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>University</TableHead>
                          <TableHead>Ranking</TableHead>
                          <TableHead>Tuition</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCountry.universities.map((university, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{university.name}</TableCell>
                            <TableCell>{university.ranking}</TableCell>
                            <TableCell>{university.tuition}</TableCell>
                            <TableCell className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{university.deadline}</span>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                university.status === 'Open' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                              }`}>
                                {university.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant={university.status === 'Open' ? 'default' : 'secondary'}
                                disabled={university.status === 'Closed'}
                                className="flex items-center space-x-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>Apply</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scholarships" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Available Scholarships</span>
                    </CardTitle>
                    <CardDescription>
                      Funding opportunities for international students in {currentCountry.name}
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
                              <span className="font-medium text-green-600 dark:text-green-400">Coverage: </span>
                              <span className="text-gray-700 dark:text-gray-300">{scholarship.coverage}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-600 dark:text-blue-400">Requirements: </span>
                              <span className="text-gray-700 dark:text-gray-300">{scholarship.requirements}</span>
                            </div>
                          </div>
                          <Button className="mt-4 w-full md:w-auto">
                            Apply for Scholarship
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
                    <CardTitle>Admission Requirements</CardTitle>
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
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">What is the cost of living?</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {currentCountry.cost}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Do I need to speak the local language?</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Many programs are offered in English, but learning {currentCountry.language} is beneficial for daily life and integration.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">When should I apply?</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Application deadlines vary by university and program. Check the universities table for specific deadlines.
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
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">{t('startApplication')}</CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below to begin your application process
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
                    {isSubmitting ? 'Submitting...' : t('submit')}
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
