import React, { useState } from 'react';
import { 
  Database, 
  RefreshCw, 
  Key, 
  Server,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Save
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
          Diagnóstico de conexión en tiempo real y sincronización de contenidos con la base de datos PostgreSQL.
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
              <div className="text-sm font-serif text-white">Estado de la Base de Datos Supabase</div>
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
