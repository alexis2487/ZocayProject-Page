import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Trees, Sparkles } from 'lucide-react';

export const HomeResearch: React.FC = () => {
  return (
    <section 
      id="seccion-investigacion"
      className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-[#060a08]"
    >
      {/* Background Image: Authentic Primate Field Research ban.jpeg */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/investigacion-campo.jpg"
          alt="Dra. Xyomara Carretero-Pinzón en trabajo de campo e investigación con primates en Colombia"
          className="w-full h-full object-cover object-[25%_center] sm:object-[28%_center] lg:object-[20%_center]"
          loading="lazy"
        />
        {/* Cinematic Vignettes and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#060a08]/95 via-[#060a08]/75 to-transparent lg:w-[60%] lg:left-auto lg:right-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a08] via-transparent to-[#060a08] h-full" />
      </div>

      {/* Main Content: Right-Aligned Asymmetrical Editorial Composition with Frosted Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-28 flex justify-end">
        <div className="max-w-xl lg:ml-auto p-8 sm:p-10 rounded-3xl bg-[#060a08]/75 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Chapter Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/80 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              02 — INVESTIGACIÓN CIENTÍFICA
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#e8e2d8] leading-[1.15] tracking-tight font-normal mb-5">
            Ciencia y monitoreo para comprender y proteger al <span className="italic text-emerald-400">Mono Socai</span>.
          </h2>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-[#e8e2d8]/85 font-sans font-light leading-relaxed mb-6">
            Más de dos décadas de estudios etológicos y demográficos sobre el <strong className="text-white font-medium">mono socai (Plecturocebus ornatus)</strong>. Investigamos el impacto de la fragmentación del hábitat en sus grupos familiares y el papel vital de las cercas vivas como autopistas en el dosel.
          </p>

          {/* Clean Scientific Focus Badges */}
          <div className="grid grid-cols-3 gap-2.5 mb-8 text-xs">
            <div className="p-3 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1">
              <Microscope className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium text-[11px] sm:text-xs">Monitoreo</span>
              <span className="text-[10px] text-[#e8e2d8]/60">Demografía</span>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1">
              <Trees className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium text-[11px] sm:text-xs">Cercas Vivas</span>
              <span className="text-[10px] text-[#e8e2d8]/60">Corredores</span>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium text-[11px] sm:text-xs">Preservación</span>
              <span className="text-[10px] text-[#e8e2d8]/60">Dosel llanero</span>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div>
            <Link
              to="/investigacion"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
            >
              <span>Ver investigaciones</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
