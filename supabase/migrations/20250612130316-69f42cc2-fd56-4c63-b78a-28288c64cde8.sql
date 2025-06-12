
-- Create a table to store university information
CREATE TABLE public.universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  ranking TEXT,
  tuition TEXT,
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read universities (public data)
CREATE POLICY "Anyone can view universities" 
  ON public.universities 
  FOR SELECT 
  USING (true);

-- Create policy to allow anyone to insert universities (for admin purposes)
CREATE POLICY "Anyone can insert universities" 
  ON public.universities 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to update universities (for admin purposes)
CREATE POLICY "Anyone can update universities" 
  ON public.universities 
  FOR UPDATE 
  USING (true);

-- Create policy to allow anyone to delete universities (for admin purposes)
CREATE POLICY "Anyone can delete universities" 
  ON public.universities 
  FOR DELETE 
  USING (true);

-- Insert sample data for Turkey
INSERT INTO public.universities (name, country, ranking, tuition, deadline, status) VALUES
('Istanbul University', 'Turkey', '#500-550', '$2,000-$4,000', '2024-07-15', 'Open'),
('Middle East Technical University', 'Turkey', '#400-450', '$3,000-$5,000', '2024-06-30', 'Open'),
('Bogazici University', 'Turkey', '#300-350', '$4,000-$6,000', '2024-06-15', 'Open'),
('Hacettepe University', 'Turkey', '#450-500', '$2,500-$4,500', '2024-07-01', 'Open'),
('Sabanci University', 'Turkey', '#400-450', '$15,000-$20,000', '2024-07-20', 'Open'),
('Bilkent University', 'Turkey', '#350-400', '$12,000-$18,000', '2024-06-25', 'Open');

-- Insert sample data for France
INSERT INTO public.universities (name, country, ranking, tuition, deadline, status) VALUES
('Sorbonne University', 'France', '#72', '€170-€3,770', '2024-03-15', 'Open'),
('École Normale Supérieure', 'France', '#45', '€170-€3,770', '2024-01-31', 'Closed'),
('Sciences Po', 'France', '#150', '€13,000-€15,000', '2024-02-28', 'Open'),
('HEC Paris', 'France', '#12 (Business)', '€39,000-€42,000', '2024-04-15', 'Open');

-- Insert sample data for Russia
INSERT INTO public.universities (name, country, ranking, tuition, deadline, status) VALUES
('Moscow State University', 'Russia', '#78', '$3,000-$6,000', '2024-07-01', 'Open'),
('Saint Petersburg State University', 'Russia', '#250', '$2,500-$5,000', '2024-06-15', 'Open'),
('Bauman Moscow State Technical University', 'Russia', '#350', '$3,500-$7,000', '2024-07-15', 'Open'),
('ITMO University', 'Russia', '#300', '$4,000-$8,000', '2024-06-30', 'Open');
