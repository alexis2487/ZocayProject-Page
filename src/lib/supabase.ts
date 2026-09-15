import { createClient } from '@supabase/supabase-js';

// Supabase credentials based on project setup
// Project ID: ohvhombvnrnvykxonrzd
export const DEFAULT_SUPABASE_URL = 'https://ohvhombvnrnvykxonrzd.supabase.co';

const getStoredCredentials = () => {
  if (typeof window === 'undefined') return { url: '', key: '' };
  return {
    url: localStorage.getItem('zocay_supabase_custom_url') || '',
    key: localStorage.getItem('zocay_supabase_custom_key') || '',
  };
};

const stored = getStoredCredentials();

export const supabaseUrl = 
  stored.url || 
  import.meta.env.VITE_SUPABASE_URL || 
  DEFAULT_SUPABASE_URL;

export const supabaseAnonKey = 
  stored.key || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'public-anon-key-placeholder';

export const isSupabaseConfigured = Boolean(
  (stored.key && stored.key.length > 20) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY &&
   import.meta.env.VITE_SUPABASE_ANON_KEY !== 'tu_supabase_anon_key_aqui' &&
   import.meta.env.VITE_SUPABASE_ANON_KEY !== 'public-anon-key-placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export function saveCustomSupabaseCredentials(key: string, url?: string) {
  if (typeof window !== 'undefined') {
    if (key) localStorage.setItem('zocay_supabase_custom_key', key.trim());
    if (url) localStorage.setItem('zocay_supabase_custom_url', url.trim());
    window.location.reload();
  }
}

export function clearCustomSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('zocay_supabase_custom_key');
    localStorage.removeItem('zocay_supabase_custom_url');
    window.location.reload();
  }
}

/**
 * Test connectivity with Supabase (Validating both Read AND Write RLS permissions)
 */
export async function testSupabaseConnection(): Promise<{ 
  ok: boolean; 
  message: string; 
  canRead: boolean; 
  canWrite: boolean; 
}> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      canRead: false,
      canWrite: false,
      message: 'La clave VITE_SUPABASE_ANON_KEY no está configurada aún en el entorno ni en la app.',
    };
  }

  let canRead = false;
  let canWrite = false;

  try {
    // 1. Check Read Permission (SELECT)
    const { error: readError } = await supabase
      .from('articles')
      .select('count', { count: 'exact', head: true });

    if (readError) {
      if (readError.code === '42P01' || readError.message.includes('relation "articles" does not exist')) {
        return {
          ok: false,
          canRead: false,
          canWrite: false,
          message: 'Conexión con Supabase detectada, pero las tablas aún no existen en la base de datos. Ejecuta el script SQL en el SQL Editor de Supabase.',
        };
      }
      return {
        ok: false,
        canRead: false,
        canWrite: false,
        message: `Error al leer Supabase: ${readError.message} (${readError.code || 'Desconocido'})`,
      };
    }

    canRead = true;

    // 2. Check Write Permission (INSERT / UPSERT / RLS)
    const testKey = '__rls_test_ping__';
    const { error: writeError } = await supabase
      .from('site_content')
      .upsert({
        section_key: testKey,
        data: { ping: true, tested_at: new Date().toISOString() },
        updated_at: new Date().toISOString(),
      });

    if (writeError) {
      if (
        writeError.code === '42501' || 
        writeError.message.toLowerCase().includes('row-level security') || 
        writeError.message.toLowerCase().includes('policy')
      ) {
        return {
          ok: false,
          canRead: true,
          canWrite: false,
          message: '⚠️ Lectura activa, pero la ESCRITURA está bloqueada por la política RLS de Supabase. Copia y ejecuta el script "fix_rls_policies.sql" en el SQL Editor de Supabase para desbloquear el guardado.',
        };
      }
      return {
        ok: false,
        canRead: true,
        canWrite: false,
        message: `Error de escritura en Supabase: ${writeError.message}`,
      };
    }

    canWrite = true;

    // Clean up test key
    await supabase.from('site_content').delete().eq('section_key', testKey);

    return {
      ok: true,
      canRead: true,
      canWrite: true,
      message: '✅ Conexión a Supabase 100% operativa: Lectura y Escritura verificadas sin bloqueos de RLS.',
    };
  } catch (err: any) {
    return {
      ok: false,
      canRead,
      canWrite,
      message: `Fallo de red al contactar Supabase: ${err.message || err}`,
    };
  }
}
