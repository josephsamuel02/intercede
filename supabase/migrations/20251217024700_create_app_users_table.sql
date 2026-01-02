-- app.users table
create table if not exists app.users (
  id uuid primary key default gen_random_uuid(),

  email text not null unique,
  full_name text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table app.users enable row level security;

-- Automatically update updated_at
create or replace function app.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_users_updated_at
before update on app.users
for each row
execute function app.set_updated_at();


-- Users can read their own row
create policy "users can read own profile"
on app.users
for select
using (auth.uid() = id);

-- Users can update their own row
create policy "users can update own profile"
on app.users
for update
using (auth.uid() = id);

-- Users can insert their own row
create policy "users can insert own profile"
on app.users
for insert
with check (auth.uid() = id);

-- Users can delete their own row
create policy "users can delete own profile"
on app.users
for delete
using (auth.uid() = id);
