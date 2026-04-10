# Portfolio

Personal portfolio site built with Next.js and Supabase.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- GSAP for animations

## Features

- Dynamic project showcase with detail pages
- Blog system with markdown support
- Responsive design
- Smooth scroll animations
- Contact form

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the SQL schema files in your Supabase project:
   - `supabase-schema.sql` for projects
   - `supabase-blog-schema.sql` for blogs

4. Start the dev server:
```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Project Structure

- `/app` - Next.js pages and routes
- `/components` - React components
- `/lib` - Database and utility functions
- `/types` - TypeScript type definitions
- `/public/images/projects` - Project screenshots and covers
