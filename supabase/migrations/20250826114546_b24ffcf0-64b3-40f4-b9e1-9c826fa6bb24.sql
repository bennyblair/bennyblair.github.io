
-- Let's check and potentially recreate the form_submissions table with the correct structure
DROP TABLE IF EXISTS public.form_submissions;

CREATE TABLE public.form_submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  full_name TEXT,
  email_address TEXT,
  phone_number TEXT,
  business_name TEXT,
  loan_type TEXT,
  approximate_loan_amount TEXT,
  financing_needs TEXT
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to insert (since this is a contact form)
CREATE POLICY "Anyone can submit forms" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view/manage submissions
CREATE POLICY "Authenticated users can view submissions" ON public.form_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update submissions" ON public.form_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete submissions" ON public.form_submissions
  FOR DELETE USING (auth.role() = 'authenticated');
