import { createClient } from '@supabase/supabase-js';

// Supabase credentials based on project setup
// Project ID: ohvhombvnrnvykxonrzd
const DEFAULT_SUPABASE_URL = 'https://ohvhombvnrnvykxonrzd.supabase.co';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key-placeholder';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'tu_supabase_anon_key_aqui' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'public-anon-key-placeholder'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
