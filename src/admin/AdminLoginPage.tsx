import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, enableDemoMode, isConfigured } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Error al iniciar sesión.');
    }
  };

  const handleDemoAccess = () => {
    enableDemoMode();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#060a08] text-[#e8e2d8] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-[#0d1512] flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-1">
            Zocay Project CMS
          </h1>
          <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">
            Panel de Administración & Contenidos
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl border border-emerald-900/40 bg-[#0a110d]/90 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5 text-xs text-[#e8e2d8]/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Acceso exclusivo para la dirección científica</span>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/40 flex items-start gap-3 text-xs text-red-200 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-emerald-300 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#e8e2d8]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="xyomara@zocayproject.org"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-[#070c09] text-white text-xs placeholder-[#e8e2d8]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-emerald-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#e8e2d8]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-[#070c09] text-white text-xs placeholder-[#e8e2d8]/30 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Validando credenciales...</span>
              ) : (
                <>
                  <span>Ingresar al CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-emerald-300/80 bg-emerald-950/30 border border-emerald-500/20 hover:bg-emerald-950/60 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ingresar como Dra. Xyomara (Modo Acceso Rápido)</span>
            </button>
            <div className="text-[11px] text-[#e8e2d8]/50">
              {isConfigured
                ? 'Conectado a la base de datos Supabase.'
                : 'Claves Supabase en modo local/desarrollo.'}
            </div>
          </div>
        </div>

        {/* Back to main site link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-[#e8e2d8]/60 hover:text-emerald-400 transition-colors"
          >
            ← Volver a la página principal del Zocay Project
          </Link>
        </div>
      </div>
    </div>
  );
};
