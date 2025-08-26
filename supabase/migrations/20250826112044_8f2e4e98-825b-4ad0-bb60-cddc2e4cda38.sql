-- Fix the default value for the id column to use the sequence
ALTER TABLE public.form_submissions 
ALTER COLUMN id SET DEFAULT nextval('public."Form Submissions_id_seq"'::regclass);