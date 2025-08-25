-- Create RLS policies for Form Submissions table

-- Allow anonymous users to insert form submissions (public contact form)
CREATE POLICY "Anyone can submit forms" 
ON public."Form Submissions" 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view form submissions (admin access)
CREATE POLICY "Authenticated users can view submissions" 
ON public."Form Submissions" 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to update form submissions (admin management)
CREATE POLICY "Authenticated users can update submissions" 
ON public."Form Submissions" 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete form submissions (admin management)  
CREATE POLICY "Authenticated users can delete submissions" 
ON public."Form Submissions" 
FOR DELETE 
USING (auth.role() = 'authenticated');