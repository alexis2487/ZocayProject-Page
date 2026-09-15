import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShoppingBag, 
  Microscope, 
  Compass, 
  Heart, 
  Settings, 
  LogOut, 
  ExternalLink, 
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, signOut, isConfigured } = useAuth();
  const { lastUpdated } = useContent();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Resumen', path: '/admin', icon: LayoutDashboard },
    { label: 'Informes & Blog', path: '/admin/informes', icon: FileText },
    { label: 'Investigación', path: '/admin/investigacion', icon: Microscope },
    { label: 'El Proyecto', path: '/admin/el-proyecto', icon: Compass },
    { label: 'Tienda Oficial', path: '/admin/tienda', icon: ShoppingBag },
    { label: 'Donaciones', path: '/admin/donaciones', icon: Heart },
    { label: 'Configuración / Supabase', path: '/admin/configuracion', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#060a08] text-[#e8e2d8] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#080e0b] border-r border-emerald-950/40 flex flex-col justify-between shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zocay Admin</span>
          </div>
          <h2 className="text-lg font-serif text-white">
            Panel de Gestión
          </h2>

          {/* Connection status badge */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-[#e8e2d8]/60 flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Base de Datos</span>
            </span>
            {isConfigured ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                Supabase Conectado
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                Sin Conexión Cloud
              </span>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-[#e8e2d8]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-[#e8e2d8]/50'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-emerald-950/40 bg-[#050806]">
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="truncate">
                <div className="text-xs font-medium text-white truncate">
                  {user?.user_metadata?.full_name || 'Dra. Xyomara Carretero'}
                </div>
                <div className="text-[10px] text-emerald-400/80 truncate font-mono">
                  {user?.email || 'admin@zocayproject.org'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#e8e2d8]/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-xs text-red-300 border border-red-900/30 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar header */}
        <header className="h-16 border-b border-emerald-950/40 bg-[#060a08]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#e8e2d8]/70 font-sans">
            <span>Panel de Gestión</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">
              {navItems.find((n) => n.path === location.pathname)?.label || 'Admin'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {lastUpdated && (
              <span className="hidden sm:inline text-[11px] text-[#e8e2d8]/40 font-mono">
                Último guardado: {new Date(lastUpdated).toLocaleTimeString('es-CO')}
              </span>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
            >
              <span>Ir al sitio público</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
