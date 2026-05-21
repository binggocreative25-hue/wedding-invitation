import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || ''
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * SQL untuk membuat tabel RSVP di Supabase:
 *
 * create table rsvp (
 *   id          uuid default gen_random_uuid() primary key,
 *   name        text not null,
 *   attendance  text not null,   -- 'hadir' atau 'tidak_hadir'
 *   guests      integer default 1,
 *   message     text,
 *   created_at  timestamp with time zone default now()
 * );
 *
 * -- Aktifkan Row Level Security:
 * alter table rsvp enable row level security;
 * create policy "Allow insert" on rsvp for insert with check (true);
 * create policy "Allow select" on rsvp for select using (true);
 */
