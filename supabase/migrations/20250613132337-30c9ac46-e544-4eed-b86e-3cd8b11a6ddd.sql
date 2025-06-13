
-- Add new columns to the applications table for enhanced application data
ALTER TABLE public.applications 
ADD COLUMN academic_gpa DECIMAL(3,2),
ADD COLUMN academic_level TEXT,
ADD COLUMN previous_degree TEXT,
ADD COLUMN english_proficiency TEXT,
ADD COLUMN motivation_letter TEXT,
ADD COLUMN profile_picture_url TEXT,
ADD COLUMN documents_urls JSONB DEFAULT '[]'::jsonb,
ADD COLUMN preferred_start_date DATE,
ADD COLUMN financial_support_needed BOOLEAN DEFAULT false,
ADD COLUMN scholarship_interest BOOLEAN DEFAULT false,
ADD COLUMN emergency_contact_name TEXT,
ADD COLUMN emergency_contact_phone TEXT,
ADD COLUMN status TEXT DEFAULT 'pending';

-- Create a storage bucket for application documents and photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-documents', 'application-documents', true);

-- Create RLS policies for the storage bucket
CREATE POLICY "Users can upload their application documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Users can view application documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'application-documents');

CREATE POLICY "Users can update their application documents" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'application-documents');

CREATE POLICY "Users can delete their application documents" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'application-documents');
