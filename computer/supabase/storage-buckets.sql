-- Create Storage Buckets for Hanzo Computer

-- Create invoices bucket for PDF storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoices', 'invoices', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for invoices bucket

-- Allow authenticated users to view their own invoices
CREATE POLICY "Users can view own invoices"
ON storage.objects FOR SELECT
USING (
  auth.role() = 'authenticated' AND (
    -- User owns the invoice
    EXISTS (
      SELECT 1 FROM public.invoices
      WHERE pdf_url LIKE '%' || storage.filename(name) || '%'
      AND user_id = auth.uid()
    )
    -- Or user is admin
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
);

-- Allow admins to upload invoices
CREATE POLICY "Admins can upload invoices"
ON storage.objects FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND
  bucket_id = 'invoices' AND (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
    -- Or system/service role for API uploads
    OR auth.role() = 'service_role'
  )
);

-- Allow admins to update invoices
CREATE POLICY "Admins can update invoices"
ON storage.objects FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'invoices' AND
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Allow admins to delete invoices
CREATE POLICY "Admins can delete invoices"
ON storage.objects FOR DELETE
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'invoices' AND
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Create documents bucket for general documents (quotes, contracts, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for documents bucket

-- Allow authenticated users to view their own documents
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'documents' AND (
    -- Document path contains user ID
    name LIKE auth.uid()::text || '/%'
    -- Or user is admin
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
);

-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND
  bucket_id = 'documents' AND (
    -- Document path contains user ID
    name LIKE auth.uid()::text || '/%'
    -- Or user is admin
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
);

-- Allow users to update their own documents
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'documents' AND (
    -- Document path contains user ID
    name LIKE auth.uid()::text || '/%'
    -- Or user is admin
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
);

-- Allow users to delete their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
USING (
  auth.role() = 'authenticated' AND
  bucket_id = 'documents' AND (
    -- Document path contains user ID
    name LIKE auth.uid()::text || '/%'
    -- Or user is admin
    OR EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
);