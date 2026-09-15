import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: string;
}

export const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles: Article[] = [
    {
      slug: "comportamiento-social-mono-zocay",
      title: "Comportamiento social del mono zocay en parches fragmentados",
      date: "12 abr 2025",
      category: "Comportamiento Animal",
      readTime: "6 min de lectura",
      excerpt: "Observaciones focales sobre las rutinas de forrajeo matutino, duetos territoriales y la cohesión de parejas monógamas de Plecturocebus ornatus en remanentes boscosos de San Martín, Meta.",
      author: "Dra. Xyomara Carretero-Pinzón"
    },
    {
      slug: "cercas-vivas-autopistas-mono-zocay",
      title: "Cercas vivas: autopistas en el dosel para el mono zocay",
      date: "03 mar 2025",
      category: "Ecología del Paisaje",
      readTime: "8 min de lectura",
      excerpt: "Cómo las hileras de árboles nativos reducen el aislamiento genético entre parches de bosque y permiten el tránsito seguro de tropas familiares de mono zocay en paisajes ganaderos.",
      author: "Equipo Zocay Project"
    },
    {
      slug: "demografia-viabilidad-zocay-meta",
      title: "Censos demográficos y viabilidad de tropas de mono zocay en el Meta",
      date: "18 feb 2025",
      category: "Monitoreo Biológico",
      readTime: "7 min de lectura",
      excerpt: "Análisis longitudinal de 20 años sobre las tasas de natalidad, supervivencia de infantes y densidad poblacional de Plecturocebus ornatus en fragmentos menores a 10 hectáreas.",
      author: "Dra. Xyomara Carretero-Pinzón"
    }
  ];

  return (
    <div className="w-full bg-[#060a08] text-[#e8e2d8] pt-24 pb-28">
      {/* Editorial Header Banner */}
      <div className="relative py-20 px-6 md:px-12 border-b border-emerald-950/40 bg-gradient-to-b from-[#0a130f] via-[#060a08] to-[#060a08]">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              BITÁCORA DE CAMPO & DIVULGACIÓN CIENTÍFICA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            Notas de Campo y Publicaciones del <span className="text-emerald-400">Mono Zocay</span>
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Historias, avances investigativos y reflexiones desde el corazón de los Llanos Orientales para dar visibilidad a la conservación de <em className="italic">Plecturocebus ornatus</em>.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-8">
        <div className="space-y-6">
          {articles.map((item) => (
            <article 
              key={item.slug}
              className="p-8 rounded-2xl border border-white/5 bg-[#090f0c] hover:border-emerald-500/30 transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6"
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
                  Leer nota completa →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
