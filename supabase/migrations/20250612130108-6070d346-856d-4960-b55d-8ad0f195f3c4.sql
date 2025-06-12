
-- Create a table to store student applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  education_level TEXT NOT NULL,
  study_field TEXT NOT NULL,
  language_of_instruction TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert applications (since this is a public form)
CREATE POLICY "Anyone can submit applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading applications (for admin purposes)
CREATE POLICY "Anyone can view applications" 
  ON public.applications 
  FOR SELECT 
  USING (true);
