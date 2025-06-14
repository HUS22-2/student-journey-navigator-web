
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, FileText, User, GraduationCap, Phone, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ApplicationForm = () => {
  const { countryName } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    whatsapp: '',
    educationLevel: '',
    studyField: '',
    languageOfInstruction: '',
    academicGpa: '',
    academicLevel: '',
    previousDegree: '',
    englishProficiency: '',
    motivationLetter: '',
    preferredStartDate: '',
    financialSupportNeeded: false,
    scholarshipInterest: false,
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  const [files, setFiles] = useState({
    profilePicture: null as File | null,
    documents: [] as File[]
  });

  const countryData = {
    turkey: { name: 'Turkey', flag: '🇹🇷' },
    france: { name: 'France', flag: '🇫🇷' },
    russia: { name: 'Russia', flag: '🇷🇺' }
  };

  const currentCountry = countryData[countryName as keyof typeof countryData];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('application-documents')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    setUploadingFiles(true);

    try {
      // Upload profile picture
      let profilePictureUrl = null;
      if (files.profilePicture) {
        profilePictureUrl = await handleFileUpload(files.profilePicture, 'profile-pictures');
        if (!profilePictureUrl) {
          toast({
            title: t('uploadFailed'),
            description: t('failedToUpload'),
            variant: "destructive"
          });
          setIsSubmitting(false);
          setUploadingFiles(false);
          return;
        }
      }

      // Upload documents
      const documentUrls = [];
      for (const document of files.documents) {
        const documentUrl = await handleFileUpload(document, 'documents');
        if (documentUrl) {
          documentUrls.push(documentUrl);
        }
      }

      setUploadingFiles(false);

      // Submit application data
      const applicationData = {
        full_name: formData.fullName,
        nationality: formData.nationality,
        whatsapp: formData.whatsapp,
        education_level: formData.educationLevel,
        study_field: formData.studyField,
        language_of_instruction: formData.languageOfInstruction,
        country: currentCountry?.name || '',
        academic_gpa: formData.academicGpa ? parseFloat(formData.academicGpa) : null,
        academic_level: formData.academicLevel || null,
        previous_degree: formData.previousDegree || null,
        english_proficiency: formData.englishProficiency || null,
        motivation_letter: formData.motivationLetter || null,
        profile_picture_url: profilePictureUrl,
        documents_urls: documentUrls,
        preferred_start_date: formData.preferredStartDate || null,
        financial_support_needed: formData.financialSupportNeeded,
        scholarship_interest: formData.scholarshipInterest,
        emergency_contact_name: formData.emergencyContactName || null,
        emergency_contact_phone: formData.emergencyContactPhone || null
      };

      const { error } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: t('submissionFailed'),
          description: t('errorSubmittingApplication'),
          variant: "destructive"
        });
      } else {
        toast({
          title: t('applicationSubmittedSuccessfully'),
          description: t('reviewAndContact'),
        });
        
        // Navigate back to country page
        navigate(`/country/${countryName}`);
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
      setUploadingFiles(false);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to={`/country/${countryName}`} 
              className="flex items-center space-x-2 text-edu-blue-600 hover:text-edu-blue-700"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('backTo')} {currentCountry.name}</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentCountry.flag}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('applicationForm')}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {t('completeApplication')} {currentCountry.name}
            </CardTitle>
            <CardDescription className="text-center">
              {t('fillOutAllRequired')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <User className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">{t('personalInformation')}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">{t('fullName')} *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nationality">{t('nationality')} *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">{t('whatsappNumber')} *</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="+1234567890"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredStartDate">{t('preferredStartDate')}</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="profilePicture">{t('profilePicture')}</Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFiles(prev => ({ ...prev, profilePicture: e.target.files?.[0] || null }))}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <GraduationCap className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">{t('academicInformation')}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="educationLevel">{t('currentEducationLevel')} *</Label>
                    <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectEducationLevel')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">{t('highSchool')}</SelectItem>
                        <SelectItem value="bachelor">{t('bachelorDegree')}</SelectItem>
                        <SelectItem value="master">{t('masterDegree')}</SelectItem>
                        <SelectItem value="phd">{t('phd')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="studyField">{t('fieldOfStudy')} *</Label>
                    <Input
                      id="studyField"
                      value={formData.studyField}
                      onChange={(e) => handleInputChange('studyField', e.target.value)}
                      placeholder={t('fieldOfStudyPlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="academicGpa">{t('academicGpa')}</Label>
                    <Input
                      id="academicGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.academicGpa}
                      onChange={(e) => handleInputChange('academicGpa', e.target.value)}
                      placeholder={t('gpaPlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="previousDegree">{t('previousDegree')}</Label>
                    <Input
                      id="previousDegree"
                      value={formData.previousDegree}
                      onChange={(e) => handleInputChange('previousDegree', e.target.value)}
                      placeholder={t('previousDegreePlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="languageOfInstruction">{t('languageOfInstruction')} *</Label>
                    <Select value={formData.languageOfInstruction} onValueChange={(value) => handleInputChange('languageOfInstruction', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectLanguage')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">{t('english')}</SelectItem>
                        <SelectItem value="french">{t('french')}</SelectItem>
                        <SelectItem value="arabic">{t('arabic')}</SelectItem>
                        <SelectItem value="local">{t('localLanguage')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="englishProficiency">{t('englishProficiency')}</Label>
                    <Select value={formData.englishProficiency} onValueChange={(value) => handleInputChange('englishProficiency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectProficiencyLevel')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">{t('nativeSpeaker')}</SelectItem>
                        <SelectItem value="fluent">{t('fluent')}</SelectItem>
                        <SelectItem value="advanced">{t('advanced')}</SelectItem>
                        <SelectItem value="intermediate">{t('intermediate')}</SelectItem>
                        <SelectItem value="beginner">{t('beginner')}</SelectItem>
                        <SelectItem value="toefl">{t('toeflCertified')}</SelectItem>
                        <SelectItem value="ielts">{t('ieltsCertified')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivationLetter">{t('motivationLetter')}</Label>
                  <Textarea
                    id="motivationLetter"
                    value={formData.motivationLetter}
                    onChange={(e) => handleInputChange('motivationLetter', e.target.value)}
                    placeholder={t('motivationLetterPlaceholder')}
                    rows={6}
                  />
                </div>
              </div>

              {/* Emergency Contact & Support */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Phone className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">{t('emergencyContactSupport')}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContactName">{t('emergencyContactName')}</Label>
                    <Input
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder={t('emergencyContactNamePlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergencyContactPhone">{t('emergencyContactPhone')}</Label>
                    <Input
                      id="emergencyContactPhone"
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="financialSupport"
                      checked={formData.financialSupportNeeded}
                      onCheckedChange={(checked) => handleInputChange('financialSupportNeeded', checked)}
                    />
                    <Label htmlFor="financialSupport">{t('financialSupportNeeded')}</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scholarshipInterest"
                      checked={formData.scholarshipInterest}
                      onCheckedChange={(checked) => handleInputChange('scholarshipInterest', checked)}
                    />
                    <Label htmlFor="scholarshipInterest">{t('scholarshipInterest')}</Label>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <FileText className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">{t('documentsUpload')}</h3>
                </div>

                <div>
                  <Label htmlFor="documents">{t('supportingDocuments')}</Label>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles(prev => ({ ...prev, documents: Array.from(e.target.files || []) }))}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t('documentsDescription')}
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-edu-blue-500 to-edu-purple-500 hover:from-edu-blue-600 hover:to-edu-purple-600 py-6 text-lg"
                disabled={isSubmitting}
              >
                {uploadingFiles ? (
                  <>
                    <Upload className="mr-2 h-5 w-5 animate-spin" />
                    {t('uploadingFiles')}
                  </>
                ) : isSubmitting ? (
                  t('submittingApplication')
                ) : (
                  t('submitApplication')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;
