import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, Clock } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Protección anti-fuerza bruta en cliente
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Si ya hay usuario autenticado, redirigir al panel
  useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  // Manejador del temporizador de bloqueo
  useEffect(() => {
    if (!lockoutUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setCountdown(0);
        setErrorMsg('');
        clearInterval(interval);
      } else {
        setCountdown(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si está bloqueado por intentos fallidos
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setErrorMsg(`Acceso bloqueado por seguridad. Espera ${countdown} segundos.`);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const res = await signIn(email, password);
    setIsSubmitting(false);

    if (res.success) {
      setFailedAttempts(0);
      setLockoutUntil(null);
      navigate('/admin');
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);

      if (attempts >= 5) {
        const lockTime = Date.now() + 60 * 1000; // 60 segundos de bloqueo
        setLockoutUntil(lockTime);
        setCountdown(60);
        setErrorMsg('Demasiados intentos fallidos consecutivos. Formulario bloqueado por 60 segundos.');
      } else {
        setErrorMsg(res.error || 'Credenciales no válidas.');
      }
    }
  };

  const isLocked = Boolean(lockoutUntil && countdown > 0);

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
            Acceso Seguro a la Administración
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl border border-emerald-900/40 bg-[#0a110d]/90 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-[#e8e2d8]/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Autenticación Cifrada Supabase</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Admin
            </span>
          </div>

          {/* Alerta de bloqueo o error */}
          {errorMsg && (
            <div className={`p-4 rounded-xl flex items-start gap-3 text-xs animate-fadeIn ${
              isLocked 
                ? 'bg-amber-950/40 border border-amber-500/40 text-amber-200' 
                : 'bg-red-950/40 border border-red-800/40 text-red-200'
            }`}>
              {isLocked ? (
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                <span>{errorMsg}</span>
                {isLocked && (
                  <div className="mt-1 font-mono font-semibold text-amber-300">
                    Tiempo restante: {countdown}s
                  </div>
                )}
              </div>
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
                  disabled={isLocked || isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zocayproject.org"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-[#070c09] text-white text-xs placeholder-[#e8e2d8]/30 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-40"
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLocked || isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-white/10 bg-[#070c09] text-white text-xs placeholder-[#e8e2d8]/30 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-40 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#e8e2d8]/40 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Validando sesión segura...</span>
              ) : isLocked ? (
                <span>Bloqueado temporalmente</span>
              ) : (
                <>
                  <span>Ingresar al CMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-3 border-t border-white/5 text-center text-[11px] text-[#e8e2d8]/40">
            Sesión protegida por políticas de autenticación y Row Level Security (RLS).
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
