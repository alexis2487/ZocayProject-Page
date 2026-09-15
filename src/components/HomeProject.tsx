import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

export const HomeProject: React.FC = () => {
  return (
    <section 
      id="seccion-el-proyecto"
      className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden bg-[#060a08]"
    >
      {/* Background Image: Panoramic Landscape of Meta and Orinoquia */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/el-proyecto-paisaje.jpg"
          alt="Paisaje panorámico de bosques de galería y sabanas en los Llanos Orientales del Meta, hábitat del mono zocay"
          className="w-full h-full object-cover object-center transform scale-100"
          loading="lazy"
        />
        {/* Cinematic Panoramic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-[#060a08]/60 to-transparent h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a08] via-transparent to-transparent h-40" />
      </div>

      {/* Main Content: Panoramic Lower Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-36 pb-20">
        <div className="max-w-3xl">
          {/* Chapter Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/70 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              03 — EL PROYECTO & TERRITORIO
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#e8e2d8] leading-[1.12] tracking-tight font-normal mb-6">
            Una misión científica dedicada al <span className="italic text-emerald-400">Mono Zocay</span> y su territorio.
          </h2>

          {/* Biologist Profile & Brief Project Description */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 p-6 rounded-2xl bg-[#060a08]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shrink-0 shadow-lg shadow-black/80">
              <img
                src={projectData.director.photo}
                alt={projectData.director.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base text-[#e8e2d8]/90 font-sans font-light leading-relaxed mb-2">
                Iniciado en 2004 en una finca ganadera del Meta por la bióloga y primatóloga{' '}
                <strong className="text-white font-medium">{projectData.director.name}</strong> (Ph.D. The University of Queensland), Zocay Project investiga, protege y visibiliza al mono zocay (<em className="italic text-emerald-300">Plecturocebus ornatus</em>), generando evidencia para conectar bosques fragmentados mediante cercas vivas en la Orinoquia colombiana.
              </p>
              <span className="text-xs text-emerald-400/90 font-medium">
                {projectData.director.name} · {projectData.director.title}
              </span>
            </div>
          </div>

          {/* Director & Territory Micro-Meta */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mb-8 text-xs text-[#e8e2d8]/70 font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dirección científica: {projectData.director.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Llanos Orientales · Desde {projectData.foundationYear}</span>
            </div>
            <div className="hidden sm:inline-block text-white/20">|</div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Especie Protagonista: Mono Zocay</span>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div>
            <Link
              to="/el-proyecto"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
            >
              <span>Conoce el proyecto</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
