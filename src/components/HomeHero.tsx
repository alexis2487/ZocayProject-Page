import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

export const HomeHero: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('seccion-investigacion');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="seccion-inicio"
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#060a08]"
    >
      {/* Dominant Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/hero-mono-zocay.jpg"
          alt="Mono Zocay (Plecturocebus ornatus), especie protagonista y única en conservación del Zocay Project en el Meta, Colombia"
          className="w-full h-full object-cover object-center lg:object-[68%_center] transform scale-100 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Cinematic Gradients for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a08]/95 via-[#060a08]/60 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-transparent to-[#060a08]/40 h-full" />
      </div>

      {/* Main Content: Left-Aligned Editorial Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-24">
        <div className="max-w-2xl">
          {/* Chapter & Status Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/70 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              01 — INICIO · PROYECTO DE PRESERVACIÓN
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#e8e2d8] leading-[1.1] tracking-tight font-normal mb-6">
            El Mono Zocay <br />
            <span className="italic font-light text-white">y su hogar en el</span>{' '}
            <span className="text-emerald-400 font-medium">Meta</span>
          </h1>

          {/* Short Subtitle / Brief Description: Mono Zocay focused */}
          <p className="text-base sm:text-lg text-[#e8e2d8]/85 font-sans font-light leading-relaxed max-w-xl mb-10">
            Ciencia, naturaleza y acción. Una iniciativa de investigación a largo plazo dedicada a dar visibilidad, estudiar y proteger al <strong className="text-white font-medium">mono zocay (Plecturocebus ornatus)</strong>, especie protagonista y endémica en los bosques fragmentados de los Llanos Orientales.
          </p>

          {/* Minimalist Elegant Action Button */}
          <div className="flex items-center gap-6">
            <Link
              to="/el-proyecto"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg shadow-emerald-950/30"
            >
              <span>Conoce el proyecto</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Species Scientific Meta Info */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#e8e2d8]/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tracking-wide">Meta, Colombia · {projectData.coordinates}</span>
            </div>
            <div className="hidden sm:inline-block text-white/30">•</div>
            <div className="flex items-center gap-1.5 italic font-serif text-emerald-300/90">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Especie Protagonista: Plecturocebus ornatus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint Button */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#e8e2d8]/50 hover:text-emerald-400 transition-colors focus:outline-none"
        aria-label="Desplazarse a la sección de investigación"
      >
        <span>Explorar</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
      </button>
    </section>
  );
};
