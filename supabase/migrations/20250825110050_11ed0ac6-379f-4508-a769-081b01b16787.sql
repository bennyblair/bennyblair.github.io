-- Drop existing policies on the old table
DROP POLICY IF EXISTS "Anyone can submit forms" ON public."Form Submissions";
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public."Form Submissions";
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public."Form Submissions";
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON public."Form Submissions";

-- Rename table and columns to follow PostgreSQL conventions
ALTER TABLE public."Form Submissions" RENAME TO form_submissions;

-- Rename columns to use underscores instead of spaces
ALTER TABLE public.form_submissions 
  RENAME COLUMN "Full Name" TO full_name;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Email Address" TO email_address;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Phone Number" TO phone_number;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Business Name" TO business_name;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Loan Type" TO loan_type;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Aproximate Loan Amount" TO approximate_loan_amount;

ALTER TABLE public.form_submissions 
  RENAME COLUMN "Tell us about your financing needs" TO financing_needs;

-- Re-enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for the renamed table
CREATE POLICY "Anyone can submit forms" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions" 
ON public.form_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can update submissions" 
ON public.form_submissions 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can delete submissions" 
ON public.form_submissions 
FOR DELETE 
USING (auth.role() = 'authenticated'::text);