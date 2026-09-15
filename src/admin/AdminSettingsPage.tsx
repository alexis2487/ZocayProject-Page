import React, { useState } from 'react';
import { 
  Database, 
  Check, 
  Copy, 
  RefreshCw, 
  Key, 
  Server,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { 
  testSupabaseConnection, 
  supabaseUrl, 
  supabaseAnonKey, 
  saveCustomSupabaseCredentials, 
  clearCustomSupabaseCredentials 
} from '../lib/supabase';

const RLS_FIX_SQL = `-- ==============================================================================
-- CORRECCIÓN INMEDIATA DE POLÍTICAS RLS EN SUPABASE PARA ZOCAY PROJECT
-- ==============================================================================
-- Copia este código, ve a tu panel de Supabase:
-- SQL Editor -> New Query -> Pega esto y haz clic en "RUN"
-- ==============================================================================

-- 1. HABILITAR RLS EN TODAS LAS TABLAS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 2. POLÍTICAS DE LECTURA PÚBLICA (Para visitantes de la web)
DROP POLICY IF EXISTS "Permitir lectura publica de informes" ON public.articles;
CREATE POLICY "Permitir lectura publica de informes"
  ON public.articles FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos"
  ON public.products FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de contenidos" ON public.site_content;
CREATE POLICY "Permitir lectura publica de contenidos"
  ON public.site_content FOR SELECT
  TO public
  USING (true);

-- 3. POLÍTICAS DE GESTIÓN TOTAL (INSERT, UPDATE, DELETE) PARA EL CMS
DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en informes" ON public.articles;
DROP POLICY IF EXISTS "Permitir gestion total en informes" ON public.articles;
CREATE POLICY "Permitir gestion total en informes"
  ON public.articles FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en productos" ON public.products;
DROP POLICY IF EXISTS "Permitir gestion total en productos" ON public.products;
CREATE POLICY "Permitir gestion total en productos"
  ON public.products FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en contenidos" ON public.site_content;
DROP POLICY IF EXISTS "Permitir gestion total en contenidos" ON public.site_content;
CREATE POLICY "Permitir gestion total en contenidos"
  ON public.site_content FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);`;

const FULL_SCHEMA_SQL = `-- SCHEMA COMPLETO ZOCAY PROJECT
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min de lectura',
  author TEXT DEFAULT 'Dra. Xyomara Carretero-Pinzón',
  excerpt TEXT NOT NULL,
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cop TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  image TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.site_content (
  section_key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura publica de informes" ON public.articles;
CREATE POLICY "Permitir lectura publica de informes" ON public.articles FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos" ON public.products FOR SELECT TO public USING (true);
DROP POLICY IF EXISTS "Permitir lectura publica de contenidos" ON public.site_content;
CREATE POLICY "Permitir lectura publica de contenidos" ON public.site_content FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Permitir gestion total en informes" ON public.articles;
CREATE POLICY "Permitir gestion total en informes" ON public.articles FOR ALL TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir gestion total en productos" ON public.products;
CREATE POLICY "Permitir gestion total en productos" ON public.products FOR ALL TO public USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Permitir gestion total en contenidos" ON public.site_content;
CREATE POLICY "Permitir gestion total en contenidos" ON public.site_content FOR ALL TO public USING (true) WITH CHECK (true);`;

export const AdminSettingsPage: React.FC = () => {
  const { isConfigured, isDemoMode } = useAuth();
  const { syncFromSupabase, resetToDefaults, isSyncing } = useContent();

  const [testResult, setTestResult] = useState<{ 
    ok: boolean; 
    message: string; 
    canRead?: boolean; 
    canWrite?: boolean 
  } | null>(null);

  const [isTesting, setIsTesting] = useState(false);
  const [copiedRls, setCopiedRls] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Custom key form state
  const [customKeyInput, setCustomKeyInput] = useState('');
  const [showKeyForm, setShowKeyForm] = useState(false);

  const runConnectionTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);
  };

  const handleCopyRls = () => {
    navigator.clipboard.writeText(RLS_FIX_SQL);
    setCopiedRls(true);
    setTimeout(() => setCopiedRls(false), 2500);
  };

  const handleCopyFull = () => {
    navigator.clipboard.writeText(FULL_SCHEMA_SQL);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2500);
  };

  const handleSaveCustomKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (customKeyInput.trim()) {
      saveCustomSupabaseCredentials(customKeyInput.trim());
    }
  };

  const handleResetData = () => {
    resetToDefaults();
    setResetConfirm(false);
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
          <Database className="w-3.5 h-3.5" />
          <span>Infraestructura & Datos Cloud</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white">
          Configuración de Supabase & Persistencia Cloud
        </h1>
        <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
          Diagnóstico en vivo de lectura/escritura, corrección de políticas RLS y sincronización inteligente sin pérdida de datos.
        </p>
      </div>

      {/* Connection & Diagnostics Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#080d0a] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0e1713] border border-emerald-500/30 flex items-center justify-center">
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-serif text-white">Estado de la Conexión Supabase</div>
              <div className="text-xs text-emerald-400/80 font-mono truncate max-w-xs sm:max-w-md">
                {supabaseUrl}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isConfigured ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase Conectado</span>
              </span>
            ) : isDemoMode ? (
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Modo Local / Demo</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 font-mono text-xs">
                Clave no configurada
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={runConnectionTest}
            disabled={isTesting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs text-emerald-300 border border-emerald-500/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Verificando lectura y escritura...' : 'Probar Conexión Completa (Lectura + Escritura)'}</span>
          </button>

          <button
            onClick={syncFromSupabase}
            disabled={isSyncing || !isConfigured}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Datos con Cloud'}</span>
          </button>

          <button
            onClick={() => setShowKeyForm(!showKeyForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#e8e2d8]/70 border border-white/10 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showKeyForm ? 'Ocultar Clave API' : 'Gestionar Clave Anon Key'}</span>
          </button>
        </div>

        {/* Test Result Feedback Box */}
        {testResult && (
          <div className={`p-4 sm:p-5 rounded-2xl text-xs space-y-2.5 border ${
            testResult.ok 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
              : testResult.canRead && !testResult.canWrite
              ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
              : 'bg-red-950/30 border-red-800/40 text-red-200'
          }`}>
            <div className="flex items-start gap-2.5">
              {testResult.ok ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed font-medium">
                {testResult.message}
              </div>
            </div>

            {/* If write is blocked, highlight solution */}
            {testResult.canRead && !testResult.canWrite && (
              <div className="pl-7 pt-2 border-t border-amber-500/20 text-xs text-amber-100/90 leading-relaxed">
                <strong>¿Por qué ocurre esto?</strong> La base de datos está conectada y permite leer, pero las políticas de seguridad (RLS) bloquean las inserciones desde el cliente anónimo. Para resolverlo, simplemente copia el script <strong>"Corrección RLS"</strong> de abajo y ejecútalo en el <strong>SQL Editor</strong> de tu panel de Supabase.
              </div>
            )}
          </div>
        )}

        {/* Custom Anon Key Form */}
        {showKeyForm && (
          <form onSubmit={handleSaveCustomKey} className="p-5 rounded-2xl bg-[#050806] border border-white/10 space-y-4">
            <div className="text-xs font-serif text-white flex items-center justify-between">
              <span>Configurar Supabase Anon Key en este navegador</span>
              {supabaseAnonKey !== 'public-anon-key-placeholder' && (
                <button
                  type="button"
                  onClick={clearCustomSupabaseCredentials}
                  className="text-[11px] text-red-400 hover:text-red-300 underline"
                >
                  Restablecer clave
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#e8e2d8]/60 leading-relaxed">
              Si tu clave no fue inyectada en Vercel, puedes ingresarla aquí directamente. Se guardará de manera segura en tu navegador y conectará el CMS de inmediato:
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Pega aquí tu anon public key de Supabase (eyJhbGci...)"
                value={customKeyInput}
                onChange={(e) => setCustomKeyInput(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-white/10 bg-[#0a110d] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-emerald-950 font-semibold text-xs hover:bg-emerald-300 transition-colors shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* SOLUTION CARD: RLS Quick Fix SQL Script */}
      <div className="p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-[#070e0a] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-sm font-serif text-white">
                Solución Inmediata: Script de Corrección de Permisos RLS
              </h2>
              <p className="text-[11px] text-emerald-400/80 font-mono">
                Permite que el CMS guarde, actualice y publique informes en la nube
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyRls}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-emerald-950 hover:bg-emerald-300 text-xs font-semibold transition-colors shrink-0 shadow-lg shadow-emerald-500/20"
          >
            {copiedRls ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRls ? '¡Copiado al Portapapeles!' : 'Copiar Script RLS'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#040705] border border-white/5 font-mono text-[11px] text-emerald-300/90 overflow-x-auto max-h-56 leading-relaxed">
          <pre>{RLS_FIX_SQL}</pre>
        </div>

        <div className="text-[11px] text-[#e8e2d8]/70 leading-relaxed space-y-1">
          <p>
            <strong>Instrucciones de aplicación (toma 10 segundos):</strong>
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-[#e8e2d8]/80">
            <li>Haz clic en el botón verde <strong>"Copiar Script RLS"</strong> arriba.</li>
            <li>Abre tu consola de Supabase y ve a la sección <strong className="text-white">SQL Editor</strong> en el menú izquierdo.</li>
            <li>Haz clic en <strong className="text-white">"New Query"</strong>, pega el código copiado y presiona <strong className="text-emerald-400">"Run"</strong>.</li>
            <li>Regresa aquí y haz clic en <strong>"Probar Conexión Completa"</strong> para verificar que la escritura esté 100% activa.</li>
          </ol>
        </div>
      </div>

      {/* FULL SCHEMA SQL */}
      <div className="p-6 rounded-3xl border border-white/5 bg-[#080d0a] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#e8e2d8]/50" />
            <h2 className="text-xs font-serif text-white">
              Script SQL Completo (Tablas + Políticas + Estructura Inicial)
            </h2>
          </div>

          <button
            onClick={handleCopyFull}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#e8e2d8]/80 transition-colors"
          >
            {copiedFull ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFull ? 'Copiado' : 'Copiar Esquema Completo'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#040705] border border-white/5 font-mono text-[11px] text-[#e8e2d8]/60 overflow-x-auto max-h-40 leading-relaxed">
          <pre>{FULL_SCHEMA_SQL}</pre>
        </div>
      </div>

      {/* Reset Data Section */}
      <div className="p-6 rounded-3xl border border-red-900/30 bg-red-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-serif text-white">Restablecer Contenidos a Valores Iniciales</div>
          <div className="text-[11px] text-[#e8e2d8]/60 font-light">
            Restaura los informes, productos y métricas de demostración iniciales en el almacenamiento local.
          </div>
        </div>

        {resetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[#e8e2d8]/60 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={handleResetData}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
            >
              Confirmar Restablecimiento
            </button>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/60 text-red-300 text-xs border border-red-800/40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>
        )}
      </div>
    </div>
  );
};
