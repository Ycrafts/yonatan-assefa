-- BLOGS TABLE -------------------------------------------------------------------
-- Stores blog posts with content and metadata.
CREATE TABLE IF NOT EXISTS public.blogs (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title          text NOT NULL,
  slug           text NOT NULL UNIQUE,
  excerpt        text NOT NULL,
  body           text NOT NULL,
  published_date text NOT NULL,
  read_time      text NOT NULL,
  is_featured    boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.blogs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users full access" ON public.blogs
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_featured_idx ON public.blogs(is_featured);
CREATE INDEX IF NOT EXISTS blogs_published_date_idx ON public.blogs(published_date);

COMMENT ON TABLE public.blogs IS 'Stores blog posts with content and metadata';
COMMENT ON COLUMN public.blogs.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN public.blogs.excerpt IS 'Short summary for listing page';
COMMENT ON COLUMN public.blogs.body IS 'Full blog post content in markdown';
COMMENT ON COLUMN public.blogs.published_date IS 'Publication date';
COMMENT ON COLUMN public.blogs.read_time IS 'Estimated reading time (e.g. "5 min read")';
COMMENT ON COLUMN public.blogs.is_featured IS 'Whether the blog post is featured on the home page';
