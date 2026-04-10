CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    tags TEXT[] NOT NULL DEFAULT '{}',
    read_time INTEGER NOT NULL,
    order_index INTEGER DEFAULT 0
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.blogs
    FOR SELECT
    USING (published = true);

CREATE POLICY "Allow authenticated users full access" ON public.blogs
    FOR ALL
    USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS blogs_published_idx ON public.blogs(published);
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_order_idx ON public.blogs(order_index);

COMMENT ON TABLE public.blogs IS 'Stores blog posts with content and metadata';
COMMENT ON COLUMN public.blogs.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN public.blogs.excerpt IS 'Short summary for listing page';
COMMENT ON COLUMN public.blogs.content IS 'Full blog post content in markdown';
COMMENT ON COLUMN public.blogs.published IS 'Whether the blog post is publicly visible';
COMMENT ON COLUMN public.blogs.published_at IS 'Publication date';
COMMENT ON COLUMN public.blogs.tags IS 'Array of tag names';
COMMENT ON COLUMN public.blogs.read_time IS 'Estimated reading time in minutes';
COMMENT ON COLUMN public.blogs.order_index IS 'Display order (lower numbers first)';
