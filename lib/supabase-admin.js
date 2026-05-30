import { createClient } from '@supabase/supabase-js'

// Client ini hanya boleh dipakai di server (API routes)
// Service role BYPASS semua RLS — tidak perlu auth check
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)