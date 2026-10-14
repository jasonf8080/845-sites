import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.SUPABASE_ANON_KEY

const invalidPlaceholder = /your-project-ref|your-anon-key-here|your_publishable_key_here|your-actual-project/i
export const hasSupabaseConfig = Boolean(
  supabaseUrl && supabaseAnonKey && !invalidPlaceholder.test(`${supabaseUrl}${supabaseAnonKey}`)
)

if (!hasSupabaseConfig) {
  console.warn(
    'Supabase is not configured. Add a valid VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) before enabling auth.'
  )
}

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

export const requireSupabase = () => {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured yet. Add a valid project URL and publishable key to your .env file.'
    )
  }

  return supabase
}
