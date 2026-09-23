-- 845 Sites: project submissions schema
-- Run this once in your Supabase project's SQL Editor
-- (Supabase dashboard > SQL Editor > New query > paste this file > Run).

create extension if not exists "pgcrypto";

create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  status text not null default 'not_received'
    check (status in ('not_received', 'received', 'in_progress', 'completed')),

  service_type text not null default 'new_site'
    check (service_type in ('new_site', 'maintenance')),

  business_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  industry text,

  website_goal text,
  design_direction text
    check (design_direction in ('specific_vision', 'guidance', 'agency_decides')),
  vision_description text,
  inspiration_links text,
  style_preference text
    check (style_preference in ('refined_editorial', 'bold_distinctive', 'clean_minimal')),
  special_features text,
  inspiration_image_urls text[] not null default '{}'::text[]
);

create index if not exists project_submissions_user_id_idx
  on public.project_submissions (user_id);
create index if not exists project_submissions_status_idx
  on public.project_submissions (status);

-- Keep updated_at current on every change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_project_submissions_updated_at on public.project_submissions;
create trigger trg_project_submissions_updated_at
before update on public.project_submissions
for each row execute function public.set_updated_at();

alter table public.project_submissions enable row level security;

-- Clients can see and create only their own submissions.
drop policy if exists "Users can view their own submissions" on public.project_submissions;
create policy "Users can view their own submissions"
on public.project_submissions for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own submissions" on public.project_submissions;
create policy "Users can insert their own submissions"
on public.project_submissions for insert
with check (auth.uid() = user_id);

-- The admin account (identified by email in the JWT) can see and update every submission.
-- Update the email below if you ever change which account is the admin account.
drop policy if exists "Admin can view all submissions" on public.project_submissions;
create policy "Admin can view all submissions"
on public.project_submissions for select
using (auth.jwt() ->> 'email' = 'jasonf8080@gmail.com');

drop policy if exists "Admin can update all submissions" on public.project_submissions;
create policy "Admin can update all submissions"
on public.project_submissions for update
using (auth.jwt() ->> 'email' = 'jasonf8080@gmail.com');

-- Storage bucket for inspiration images uploaded from the project form.
insert into storage.buckets (id, name, public)
values ('inspiration-images', 'inspiration-images', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated users can upload inspiration images" on storage.objects;
create policy "Authenticated users can upload inspiration images"
on storage.objects for insert
with check (bucket_id = 'inspiration-images' and auth.role() = 'authenticated');

drop policy if exists "Anyone can view inspiration images" on storage.objects;
create policy "Anyone can view inspiration images"
on storage.objects for select
using (bucket_id = 'inspiration-images');
