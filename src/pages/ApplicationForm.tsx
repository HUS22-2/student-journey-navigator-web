
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
        title: "Missing Information",
        description: "Please fill in all required fields.",
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
            title: "Upload Failed",
            description: "Failed to upload profile picture. Please try again.",
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
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Application Submitted Successfully!",
          description: "We'll review your application and contact you within 48 hours via WhatsApp.",
        });
        
        // Navigate back to country page
        navigate(`/country/${countryName}`);
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
      setUploadingFiles(false);
    }
  };

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
              <span>Back to {currentCountry.name}</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{currentCountry.flag}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Application Form
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Complete Your Application for {currentCountry.name}
            </CardTitle>
            <CardDescription className="text-center">
              Please fill out all the required information to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <User className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
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
                    <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="profilePicture">Profile Picture</Label>
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
                  <h3 className="text-lg font-semibold">Academic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="educationLevel">Current Education Level *</Label>
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
                    <Label htmlFor="studyField">Field of Study *</Label>
                    <Input
                      id="studyField"
                      value={formData.studyField}
                      onChange={(e) => handleInputChange('studyField', e.target.value)}
                      placeholder="e.g., Computer Science, Medicine, Engineering"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="academicGpa">Academic GPA</Label>
                    <Input
                      id="academicGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.academicGpa}
                      onChange={(e) => handleInputChange('academicGpa', e.target.value)}
                      placeholder="e.g., 3.75"
                    />
                  </div>

                  <div>
                    <Label htmlFor="previousDegree">Previous Degree</Label>
                    <Input
                      id="previousDegree"
                      value={formData.previousDegree}
                      onChange={(e) => handleInputChange('previousDegree', e.target.value)}
                      placeholder="e.g., Bachelor of Science in Physics"
                    />
                  </div>

                  <div>
                    <Label htmlFor="languageOfInstruction">Language of Instruction *</Label>
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

                  <div>
                    <Label htmlFor="englishProficiency">English Proficiency</Label>
                    <Select value={formData.englishProficiency} onValueChange={(value) => handleInputChange('englishProficiency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">Native Speaker</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="toefl">TOEFL Certified</SelectItem>
                        <SelectItem value="ielts">IELTS Certified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivationLetter">Motivation Letter</Label>
                  <Textarea
                    id="motivationLetter"
                    value={formData.motivationLetter}
                    onChange={(e) => handleInputChange('motivationLetter', e.target.value)}
                    placeholder="Tell us why you want to study in this country and how it aligns with your goals..."
                    rows={6}
                  />
                </div>
              </div>

              {/* Emergency Contact & Support */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <Phone className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">Emergency Contact & Support</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder="Full name of emergency contact"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
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
                    <Label htmlFor="financialSupport">I need financial support for my studies</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scholarshipInterest"
                      checked={formData.scholarshipInterest}
                      onCheckedChange={(checked) => handleInputChange('scholarshipInterest', checked)}
                    />
                    <Label htmlFor="scholarshipInterest">I am interested in scholarship opportunities</Label>
                  </div>
                </div>
              </div>

              {/* Documents Upload */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b pb-2">
                  <FileText className="h-5 w-5 text-edu-blue-600" />
                  <h3 className="text-lg font-semibold">Documents Upload</h3>
                </div>

                <div>
                  <Label htmlFor="documents">Supporting Documents</Label>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles(prev => ({ ...prev, documents: Array.from(e.target.files || []) }))}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload academic transcripts, certificates, passport copy, etc. (PDF, DOC, or Image files)
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
                    Uploading Files...
                  </>
                ) : isSubmitting ? (
                  'Submitting Application...'
                ) : (
                  'Submit Application'
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
