import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';
import { useContent } from '../context/ContentContext';
import { sanitizeUrl } from '../lib/security';

export const HomeProject: React.FC = () => {
  const { director } = useContent();
  return (
    <section 
      id="seccion-el-proyecto"
      className="relative min-h-screen min-h-[100svh] w-full flex flex-col justify-center lg:justify-end overflow-x-hidden bg-[#060a08]"
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
        <div className="absolute inset-0 bg-[#060a08]/80 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-[#060a08]/60 to-transparent h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a08] via-transparent to-transparent h-40" />
      </div>

      {/* Main Content: Panoramic Lower Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-20">
        <div className="max-w-3xl">
          {/* Chapter Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/80 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              03 — EL PROYECTO & TERRITORIO
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#e8e2d8] leading-[1.12] tracking-tight font-normal mb-4 sm:mb-6">
            Una misión científica dedicada al <span className="italic text-emerald-400">Mono Zocay</span> y su territorio.
          </h2>

          {/* Biologist Profile & Brief Project Description */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#060a08]/90 lg:bg-[#060a08]/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-emerald-400/80 shrink-0 shadow-lg shadow-black/80">
              <img
                src={director.photo}
                alt={director.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base text-[#e8e2d8]/90 font-sans font-light leading-relaxed mb-2">
                Iniciado en 2004 en una finca ganadera del Meta por la bióloga y primatóloga{' '}
                <strong className="text-white font-medium">{director.name}</strong> (Ph.D. The University of Queensland), Zocay Project investiga, protege y visibiliza al mono zocay (<em className="italic text-emerald-300">Plecturocebus ornatus</em>), generando evidencia para conectar bosques fragmentados mediante cercas vivas en la Orinoquia colombiana.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-emerald-400/90 font-medium">
                  {director.name} · {director.title}
                </span>

                {/* Social Networks of the Biologist */}
                <div className="flex items-center gap-2">
                  <a
                    href={sanitizeUrl(director.socials?.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                    aria-label="Perfil de X (Twitter) de la Dra. Xyomara Carretero"
                    title="X (Twitter) - Dra. Xyomara Carretero"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={sanitizeUrl(director.socials?.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                    aria-label="Perfil de LinkedIn de la Dra. Xyomara Carretero"
                    title="LinkedIn - Dra. Xyomara Carretero"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
                    </svg>
                  </a>
                  <a
                    href={sanitizeUrl(director.socials?.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                    aria-label="Perfil de Instagram de la Dra. Xyomara Carretero"
                    title="Instagram - Dra. Xyomara Carretero"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Director & Territory Micro-Meta */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-6 mb-6 sm:mb-8 text-[11px] sm:text-xs text-[#e8e2d8]/70 font-sans">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Dirección científica: {director.name}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Llanos Orientales · Desde {projectData.foundationYear}</span>
            </div>
            <div className="hidden sm:inline-block text-white/20">|</div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] sm:text-[11px]">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Especie Protagonista: Mono Zocay</span>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div>
            <Link
              to="/el-proyecto"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
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
