import { createClient } from '@supabase/supabase-js';

// Supabase credentials based on project setup
// Project ID: ohvhombvnrnvykxonrzd
const DEFAULT_SUPABASE_URL = 'https://ohvhombvnrnvykxonrzd.supabase.co';
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key-placeholder';

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

/**
 * Test connectivity with Supabase
 */
export async function testSupabaseConnection(): Promise<{ ok: boolean; message: string }> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'La variable VITE_SUPABASE_ANON_KEY no está configurada aún en el entorno.',
    };
  }

  try {
    const { error } = await supabase.from('articles').select('count', { count: 'exact', head: true });
    if (error) {
      // If table does not exist, credentials might still be valid
      if (error.code === '42P01' || error.message.includes('relation "articles" does not exist')) {
        return {
          ok: true,
          message: 'Conectado a Supabase exitosamente. Nota: Ejecuta el script SQL en Supabase para crear las tablas.',
        };
      }
      return {
        ok: false,
        message: `Error de Supabase: ${error.message} (${error.code || 'Desconocido'})`,
      };
    }
    return {
      ok: true,
      message: 'Conexión a Supabase establecida y tablas verificadas correctamente.',
    };
  } catch (err: any) {
    return {
      ok: false,
      message: `Fallo de red al contactar Supabase: ${err.message || err}`,
    };
  }
}
