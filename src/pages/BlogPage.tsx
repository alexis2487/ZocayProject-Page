import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User, X, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Article } from '../types/content';

export const BlogPage: React.FC = () => {
  const { articles } = useContent();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const publicArticles = articles.filter(a => a.status !== 'draft');

  return (
    <div className="w-full bg-[#060a08] text-[#e8e2d8] pt-20 sm:pt-24 pb-20 sm:pb-28">
      {/* Editorial Header Banner */}
      <div className="relative py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 border-b border-emerald-950/40 bg-gradient-to-b from-[#0a130f] via-[#060a08] to-[#060a08]">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              BITÁCORA DE CAMPO & DIVULGACIÓN CIENTÍFICA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight font-normal mb-4 sm:mb-6">
            Notas de Campo y Publicaciones del <span className="text-emerald-400">Mono Zocay</span>
          </h1>

          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Historias, avances investigativos y reflexiones desde el corazón de los Llanos Orientales para dar visibilidad a la conservación de <em className="italic">Plecturocebus ornatus</em>.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 space-y-8">
        <div className="space-y-6">
          {publicArticles.map((item) => (
            <article 
              key={item.slug}
              onClick={() => setSelectedArticle(item)}
              className="p-5 sm:p-8 rounded-2xl border border-white/5 bg-[#090f0c] hover:border-emerald-500/40 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
            >
              <div className="max-w-2xl space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px] uppercase">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="inline-flex items-center gap-1 text-[#e8e2d8]/60 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#e8e2d8]/50 text-[11px] font-mono">{item.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#e8e2d8]/75 font-light leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs text-[#e8e2d8]/60">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Por {item.author}</span>
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                  Leer informe completo →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Footer info for scientists / administrators */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e8e2d8]/50">
          <span>Publicaciones revisadas por la Dra. Xyomara Carretero-Pinzón (Zocay Project)</span>
          <Link
            to="/admin/informes"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso al CMS para subir nuevos informes</span>
          </Link>
        </div>
      </div>

      {/* MODAL: Full Article Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#090f0c] border border-emerald-900/50 rounded-3xl p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Cerrar informe"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#e8e2d8]/60 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedArticle.date}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#e8e2d8]/50 font-mono">{selectedArticle.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400/90 font-medium">
                <User className="w-4 h-4" />
                <span>{selectedArticle.author}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#060a08] border-l-2 border-emerald-400 text-xs sm:text-sm text-[#e8e2d8]/85 font-light leading-relaxed italic">
              {selectedArticle.excerpt}
            </div>

            <div className="pt-4 border-t border-white/10 text-sm sm:text-base text-[#e8e2d8]/90 font-light leading-relaxed whitespace-pre-line space-y-4">
              {selectedArticle.content || selectedArticle.excerpt}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-[#e8e2d8]/50 font-mono">
                Zocay Project · Meta, Colombia
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full bg-emerald-400 text-emerald-950 text-xs uppercase tracking-wider font-semibold hover:bg-emerald-300 transition-colors"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
