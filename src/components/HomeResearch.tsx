import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Trees, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HomeResearch: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="seccion-investigacion"
      className="relative min-h-screen min-h-[100svh] w-full flex items-center justify-end overflow-x-hidden bg-[#060a08]"
    >
      {/* Background Image: Authentic Primate Field Research ban.jpeg */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/investigacion-xyomara-primate.jpg"
          alt="Dra. Xyomara Carretero-Pinzón en trabajo de campo e investigación con primates en Colombia"
          className="w-full h-full object-cover object-[25%_center] sm:object-[28%_center] lg:object-[20%_center]"
          loading="lazy"
        />
        {/* Cinematic Vignettes and Gradients */}
        <div className="absolute inset-0 bg-[#060a08]/75 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#060a08]/95 via-[#060a08]/75 to-transparent lg:w-[60%] lg:left-auto lg:right-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a08] via-transparent to-[#060a08] h-full" />
      </div>

      {/* Main Content: Right-Aligned Asymmetrical Editorial Composition with Frosted Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full py-20 sm:py-24 lg:py-28 flex justify-end">
        <div className="w-full lg:max-w-xl lg:ml-auto p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#060a08]/85 lg:bg-[#060a08]/75 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Chapter Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/80 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              {t.research.chapterTag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#e8e2d8] leading-[1.15] tracking-tight font-normal mb-4 sm:mb-5">
            {t.research.headline} <span className="italic text-emerald-400">{t.research.headlineAccent}</span>.
          </h2>

          {/* Short Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#e8e2d8]/85 font-sans font-light leading-relaxed mb-5 sm:mb-6">
            {t.research.description}
          </p>

          {/* Clean Scientific Focus Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-6 sm:mb-8 text-xs">
            <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-[#0d1512]/70 backdrop-blur-sm flex items-center sm:flex-col sm:items-start gap-2.5 sm:gap-1">
              <Microscope className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-white font-medium text-xs block sm:inline">{t.research.badge1Title}</span>
                <span className="text-[10px] text-[#e8e2d8]/60 sm:block sm:mt-0.5 sm:ml-0 ml-1.5">{t.research.badge1Sub}</span>
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-[#0d1512]/70 backdrop-blur-sm flex items-center sm:flex-col sm:items-start gap-2.5 sm:gap-1">
              <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-white font-medium text-xs block sm:inline">{t.research.badge2Title}</span>
                <span className="text-[10px] text-[#e8e2d8]/60 sm:block sm:mt-0.5 sm:ml-0 ml-1.5">{t.research.badge2Sub}</span>
              </div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl border border-white/10 bg-[#0d1512]/70 backdrop-blur-sm flex items-center sm:flex-col sm:items-start gap-2.5 sm:gap-1">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-white font-medium text-xs block sm:inline">{t.research.badge3Title}</span>
                <span className="text-[10px] text-[#e8e2d8]/60 sm:block sm:mt-0.5 sm:ml-0 ml-1.5">{t.research.badge3Sub}</span>
              </div>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div>
            <Link
              to="/investigacion"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
            >
              <span>{t.research.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
