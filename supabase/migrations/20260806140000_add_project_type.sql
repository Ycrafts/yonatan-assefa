-- Add project_type column to distinguish personal vs client projects
-- Default is 'personal' for all existing projects

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'personal'
  CHECK (project_type IN ('personal', 'client'));
