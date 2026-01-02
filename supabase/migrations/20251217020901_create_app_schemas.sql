-- Create app schemas
create schema if not exists app;
 

-- Ownership
alter schema app owner to postgres; 

-- Permissions
grant usage on schema app to anon, authenticated; 

-- Default privileges (IMPORTANT)
alter default privileges in schema app
grant select, insert, update, delete on tables
to authenticated;

alter default privileges in schema app
grant usage, select on sequences
to authenticated;
 