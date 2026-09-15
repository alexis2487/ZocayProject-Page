import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShoppingBag, 
  Microscope, 
  Heart, 
  Plus, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Database
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { articles, products, researchLines, donationTiers } = useContent();
  const { isConfigured } = useAuth();

  const publishedCount = articles.filter(a => a.status !== 'draft').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Welcome banner */}
      <div className="p-8 rounded-3xl border border-emerald-900/40 bg-gradient-to-r from-[#0b1510] via-[#09120e] to-[#060a08] relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-black/40 text-xs text-emerald-300 font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panel de Gestión Integral Zocay Project</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-3">
            Bienvenida, Dra. Xyomara Carretero-Pinzón
          </h1>
          <p className="text-sm text-[#e8e2d8]/80 max-w-2xl font-light leading-relaxed">
            Desde este panel puedes publicar nuevos informes de campo, actualizar las líneas de investigación, editar los productos con causa de la tienda y administrar los textos de todo el sitio web.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to="/admin/informes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Nuevo Informe</span>
            </Link>

            <Link
              to="/admin/configuracion"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-wider font-medium text-white border border-white/15 bg-white/5 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Ver Estado de Supabase</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Database status banner if in demo */}
      {!isConfigured && (
        <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <strong className="text-amber-300 font-medium">Modo Local Activo:</strong> Todos los cambios se guardan en tiempo real en la memoria del navegador. Para sincronizar con Supabase Cloud, conecta tus claves en el archivo <code className="text-amber-200">.env</code>.
            </div>
          </div>
          <Link
            to="/admin/configuracion"
            className="shrink-0 text-amber-300 hover:underline font-mono text-[11px]"
          >
            Instrucciones SQL →
          </Link>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl border border-white/5 bg-[#090f0c] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#e8e2d8]/60 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Informes de Campo</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {articles.length}
          </div>
          <div className="text-[11px] text-[#e8e2d8]/50">
            {publishedCount} publicados · {draftCount} borradores
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-[#090f0c] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#e8e2d8]/60 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Productos Tienda</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {products.length}
          </div>
          <div className="text-[11px] text-[#e8e2d8]/50">
            {products.filter(p => p.inStock).length} en stock activo
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-[#090f0c] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#e8e2d8]/60 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Líneas Científicas</span>
            <Microscope className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {researchLines.length}
          </div>
          <div className="text-[11px] text-[#e8e2d8]/50">
            Foco exclusivo: Mono Zocay
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-[#090f0c] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#e8e2d8]/60 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Niveles de Aporte</span>
            <Heart className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif text-white font-medium mb-1">
            {donationTiers.length}
          </div>
          <div className="text-[11px] text-[#e8e2d8]/50">
            Desde $50.000 COP
          </div>
        </div>
      </div>

      {/* Recent Reports / Informes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-serif text-white">
            Últimos Informes y Publicaciones de Campo
          </h2>
          <Link
            to="/admin/informes"
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Gestionar todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {articles.slice(0, 3).map((art) => (
            <div
              key={art.slug}
              className="p-5 rounded-2xl border border-white/5 bg-[#080e0b] hover:border-emerald-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px]">
                    {art.category}
                  </span>
                  <span className="text-[#e8e2d8]/40">•</span>
                  <span className="text-[#e8e2d8]/60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.date}
                  </span>
                  <span className="text-[#e8e2d8]/40">•</span>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase">
                    {art.status === 'draft' ? 'Borrador' : 'Publicado'}
                  </span>
                </div>
                <h3 className="text-base font-serif text-white">{art.title}</h3>
                <p className="text-xs text-[#e8e2d8]/70 line-clamp-1 font-light">
                  {art.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/admin/informes?edit=${art.slug}`}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-xs transition-colors"
                >
                  Editar
                </Link>
                <Link
                  to={`/blog`}
                  target="_blank"
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#e8e2d8]/60 hover:text-white transition-colors"
                >
                  Ver
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
