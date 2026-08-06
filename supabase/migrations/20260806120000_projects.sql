-- PROJECTS TABLE ----------------------------------------------------------------
-- Stores portfolio projects with metadata, images, and display ordering.
CREATE TABLE IF NOT EXISTS public.projects (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           timestamptz NOT NULL DEFAULT now(),
  slug                 text NOT NULL UNIQUE,
  title                text NOT NULL,
  description          text NOT NULL,
  detailed_description text,
  technologies         text[] NOT NULL DEFAULT '{}',
  featured             boolean NOT NULL DEFAULT false,
  accent_color         text,
  url                  text,
  github_url           text,
  agency_name          text,
  agency_url           text,
  cover_image          text NOT NULL,
  images               text[] NOT NULL DEFAULT '{}',
  order_index          integer NOT NULL DEFAULT 0
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.projects
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users full access" ON public.projects
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS projects_slug_idx ON public.projects(slug);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON public.projects(featured);
CREATE INDEX IF NOT EXISTS projects_order_idx ON public.projects(order_index);

COMMENT ON TABLE public.projects IS 'Stores portfolio projects with metadata and images';
COMMENT ON COLUMN public.projects.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN public.projects.technologies IS 'Array of technology names';
COMMENT ON COLUMN public.projects.featured IS 'Whether the project is shown on the home page';
COMMENT ON COLUMN public.projects.cover_image IS 'URL to the cover image';
COMMENT ON COLUMN public.projects.images IS 'Array of image URLs';
COMMENT ON COLUMN public.projects.order_index IS 'Display order (lower numbers first)';
