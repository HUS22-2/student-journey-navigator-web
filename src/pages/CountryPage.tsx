
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, DollarSign, GraduationCap, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

  const countryData = {
    turkey: {
      name: 'Turkey',
      flag: '🇹🇷',
      capital: 'Ankara',
      language: 'Turkish',
      currency: 'Turkish Lira',
      universities: [
        { name: 'Istanbul University', ranking: '#500-550', tuition: '$2,000-$4,000' },
        { name: 'Middle East Technical University', ranking: '#400-450', tuition: '$3,000-$5,000' },
        { name: 'Bogazici University', ranking: '#300-350', tuition: '$4,000-$6,000' },
        { name: 'Hacettepe University', ranking: '#450-500', tuition: '$2,500-$4,500' }
      ],
      requirements: [
        'High school diploma with minimum 70% average',
        'English proficiency test (TOEFL/IELTS)',
        'Passport copy',
        'Motivation letter',
        'Academic transcripts'
      ],
      scholarships: [
        'Turkish Government Scholarship (Türkiye Bursları)',
        'University-specific scholarships',
        'Private foundation scholarships'
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
        { name: 'Sorbonne University', ranking: '#72', tuition: '€170-€3,770' },
        { name: 'École Normale Supérieure', ranking: '#45', tuition: '€170-€3,770' },
        { name: 'Sciences Po', ranking: '#150', tuition: '€13,000-€15,000' },
        { name: 'HEC Paris', ranking: '#12 (Business)', tuition: '€39,000-€42,000' }
      ],
      requirements: [
        'Baccalauréat or equivalent',
        'French proficiency (DELF/DALF) or English (TOEFL/IELTS)',
        'Passport copy',
        'Motivation letter in French',
        'Academic transcripts'
      ],
      scholarships: [
        'Eiffel Excellence Scholarship',
        'Charpak Scholarship',
        'Regional scholarships',
        'Campus France scholarships'
      ],
      cost: '€15,000-€25,000 per year (including accommodation)'
    },
    // Add other countries...
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24 hours via WhatsApp.",
    });
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
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="universities" className="space-y-6">
                <div className="grid gap-6">
                  {currentCountry.universities.map((university, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {university.name}
                          <span className="text-sm font-normal text-gray-500">
                            {university.ranking}
                          </span>
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{university.tuition}</span>
                          </span>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
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

              <TabsContent value="scholarships" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentCountry.scholarships.map((scholarship, index) => (
                        <div key={index} className="p-4 bg-edu-blue-50 dark:bg-edu-blue-900/20 rounded-lg">
                          <h4 className="font-semibold text-edu-blue-900 dark:text-edu-blue-100">
                            {scholarship}
                          </h4>
                        </div>
                      ))}
                    </div>
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
                    <Select onValueChange={(value) => handleInputChange('educationLevel', value)}>
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
                    <Select onValueChange={(value) => handleInputChange('languageOfInstruction', value)}>
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

                  <Button type="submit" className="w-full bg-gradient-to-r from-edu-blue-500 to-edu-purple-500 hover:from-edu-blue-600 hover:to-edu-purple-600">
                    {t('submit')}
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
