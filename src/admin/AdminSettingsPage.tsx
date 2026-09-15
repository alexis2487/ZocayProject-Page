import React, { useState } from 'react';
import { 
  Database, 
  Check, 
  Copy, 
  RefreshCw, 
  AlertCircle, 
  Key, 
  Server,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { testSupabaseConnection, supabaseUrl } from '../lib/supabase';

export const AdminSettingsPage: React.FC = () => {
  const { isConfigured, isDemoMode } = useAuth();
  const { syncFromSupabase, resetToDefaults, isSyncing } = useContent();

  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const runConnectionTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);
  };

  const handleCopySql = () => {
    const sqlText = `-- ==============================================================================
-- SCHEMA SQL PARA ZOCAY PROJECT — BASE DE DATOS SUPABASE
-- ==============================================================================

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

CREATE POLICY "Permitir lectura publica de informes" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de productos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Permitir lectura publica de contenidos" ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Permitir gestion total a usuarios autenticados en informes" ON public.articles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir gestion total a usuarios autenticados en productos" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir gestion total a usuarios autenticados en contenidos" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
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
          <span>Infraestructura & Datos</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white">
          Configuración de Supabase & Sincronización
        </h1>
        <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
          Verifica el estado de conexión con la base de datos Supabase, copia el script SQL y gestiona la sincronización.
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#080d0a] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0e1713] border border-emerald-500/30 flex items-center justify-center">
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-serif text-white">Estado de la Base de Datos</div>
              <div className="text-xs text-emerald-400/80 font-mono truncate max-w-xs sm:max-w-md">
                URL: {supabaseUrl}
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

        {/* Test connection & Sync buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={runConnectionTest}
            disabled={isTesting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Probando conexión...' : 'Probar Conexión Supabase'}</span>
          </button>

          <button
            onClick={syncFromSupabase}
            disabled={isSyncing || !isConfigured}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 text-xs text-emerald-300 border border-emerald-500/30 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Datos con Cloud'}</span>
          </button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
            testResult.ok 
              ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-200' 
              : 'bg-red-950/30 border border-red-800/40 text-red-200'
          }`}>
            {testResult.ok ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed">{testResult.message}</div>
          </div>
        )}
      </div>

      {/* SQL Script Viewer */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#080d0a] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-serif text-white">
              Script SQL para Crear las Tablas en Supabase
            </h2>
          </div>

          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 text-emerald-950 hover:bg-emerald-300 text-xs font-medium transition-colors"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSql ? 'Copiado' : 'Copiar SQL'}</span>
          </button>
        </div>

        <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed">
          Copia este código y pégalo en la consola de Supabase (<strong className="text-white">SQL Editor → New Query → Run</strong>) para crear automáticamente las tablas de <code className="text-emerald-300">articles</code>, <code className="text-emerald-300">products</code> y <code className="text-emerald-300">site_content</code> con sus políticas RLS de seguridad.
        </p>

        <div className="p-4 rounded-xl bg-[#040705] border border-white/5 font-mono text-[11px] text-emerald-300/80 overflow-x-auto max-h-60 leading-relaxed">
          <pre>{`-- 1. TABLA INFORMES (BLOG)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT DEFAULT 'Dra. Xyomara Carretero-Pinzón',
  excerpt TEXT NOT NULL,
  content TEXT DEFAULT '',
  status TEXT DEFAULT 'published'
);

-- 2. TABLA PRODUCTOS TIENDA
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cop TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  image TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true
);

-- 3. TABLA CONTENIDOS DINÁMICOS
CREATE TABLE IF NOT EXISTS public.site_content (
  section_key TEXT PRIMARY KEY,
  data JSONB NOT NULL
);`}</pre>
        </div>
      </div>

      {/* Reset Data Section */}
      <div className="p-6 rounded-3xl border border-red-900/30 bg-red-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-serif text-white">Restablecer Contenidos a Valores Iniciales</div>
          <div className="text-[11px] text-[#e8e2d8]/60 font-light">
            Restaura los 3 informes, los 3 productos y las métricas científicas originales.
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
