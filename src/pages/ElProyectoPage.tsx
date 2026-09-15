import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Heart 
} from 'lucide-react';
import { projectData } from '../data/projectData';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { sanitizeUrl } from '../lib/security';

export const ElProyectoPage: React.FC = () => {
  const { director, timeline } = useContent();
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { monoZocay } = projectData;

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
            <span>{t.elProyectoPage.backHome}</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              {t.elProyectoPage.bannerTag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight font-normal mb-4 sm:mb-6">
            {t.elProyectoPage.title} <span className="text-emerald-400">{t.elProyectoPage.titleAccent}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            {t.elProyectoPage.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 space-y-14 sm:space-y-20">
        {/* 1. ¿Qué es el Zocay Project? */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 sm:gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Compass className="w-4 h-4" />
            <span>{t.elProyectoPage.sec1Tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">{t.elProyectoPage.sec1Title}</h2>
          
          <blockquote className="border-l-2 border-emerald-500 pl-4 sm:pl-6 py-2 text-base sm:text-lg font-serif italic text-emerald-200/90 leading-relaxed bg-emerald-950/20 rounded-r-lg">
            {t.elProyectoPage.sec1Quote}
          </blockquote>

          <p className="text-sm sm:text-base text-[#e8e2d8]/85 leading-relaxed font-light">
            {t.elProyectoPage.sec1Text}
          </p>
        </section>

        {/* 2. Dirección Científica: Dra. Xyomara Carretero-Pinzón */}
        <section className="p-5 sm:p-8 md:p-10 rounded-2xl border border-emerald-900/40 bg-[#0b1310]/80 backdrop-blur-md space-y-6 sm:space-y-8">
          <div className="flex items-center gap-2 sm:gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.elProyectoPage.sec2Tag}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl shrink-0 bg-[#0d1512]">
              <img
                src={director.photo}
                alt={director.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-1">
                {director.name}
              </h3>
              <p className="text-emerald-400 text-sm font-sans tracking-wide mb-4">
                {director.title}
              </p>
              <div className="space-y-2 text-xs text-[#e8e2d8]/75">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t.elProyectoPage.doctorateLabel}</span>
                </div>
                <div className="flex items-start gap-2 pl-6 text-[#e8e2d8]/60">
                  <span>{t.elProyectoPage.affiliationLabel}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t.elProyectoPage.graduateLabel}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t.elProyectoPage.undergradLabel}</span>
                </div>
              </div>

              {/* Social Networks */}
              {director.socials && (
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">{t.elProyectoPage.socialsLabel}</span>
                  <div className="flex items-center gap-2">
                    {director.socials.twitter && (
                      <a
                        href={sanitizeUrl(director.socials.twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#e8e2d8] hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>X (Twitter)</span>
                      </a>
                    )}
                    {director.socials.linkedin && (
                      <a
                        href={sanitizeUrl(director.socials.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#e8e2d8] hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {director.socials.instagram && (
                      <a
                        href={sanitizeUrl(director.socials.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#e8e2d8] hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4 text-sm sm:text-base text-[#e8e2d8]/85 font-light leading-relaxed">
            <p>{t.elProyectoPage.directorBio}</p>
          </div>
        </section>

        {/* 3. La Especie Protagonista Absoluta: El Mono Zocay */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>{t.elProyectoPage.sec3Tag}</span>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-[#090f0c] overflow-hidden">
            {/* Visual Hero of Mono Zocay */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
              <img
                src={monoZocay.image}
                alt={monoZocay.name}
                className="w-full h-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/40 text-[10px] sm:text-xs text-emerald-300 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plecturocebus ornatus</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white">{monoZocay.name}</h2>
                <div className="italic text-sm sm:text-base font-serif text-emerald-400">
                  {t.elProyectoPage.speciesScientific}
                </div>
              </div>
            </div>

            {/* In-depth details */}
            <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
              <p className="text-sm sm:text-base lg:text-lg text-[#e8e2d8]/90 font-light leading-relaxed">
                {language === 'en' ? t.hero.description : monoZocay.description}
              </p>

              {/* Status and Territory Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Status (IUCN)</span>
                  <span className="text-xs text-white font-medium">{t.elProyectoPage.speciesStatus}</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Endemism</span>
                  <span className="text-xs text-white font-medium">{t.elProyectoPage.speciesEndemism}</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Habitat</span>
                  <span className="text-xs text-white font-medium">Llanos Orientales · Meta</span>
                </div>
              </div>

              {/* Biological and Behavioral Pillars */}
              <div>
                <h3 className="text-xl font-serif text-white mb-6">Rasgos Clave / Key Traits</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-xl border border-white/5 bg-[#0b1310] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-serif font-medium">
                      <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t.elProyectoPage.sec3Col1Title}</span>
                    </div>
                    <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                      {t.elProyectoPage.sec3Col1Text}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-white/5 bg-[#0b1310] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-serif font-medium">
                      <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t.elProyectoPage.sec3Col2Title}</span>
                    </div>
                    <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                      {t.elProyectoPage.sec3Col2Text}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-white/5 bg-[#0b1310] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-serif font-medium">
                      <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{t.elProyectoPage.sec3Col3Title}</span>
                    </div>
                    <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                      {t.elProyectoPage.sec3Col3Text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Historia y Evolución (Desde 2004) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Calendar className="w-4 h-4" />
            <span>{t.elProyectoPage.sec4Tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">{t.elProyectoPage.sec4Title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {timeline.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl border border-white/10 bg-[#090f0c] flex flex-col gap-2"
              >
                <div className="text-xs font-mono text-emerald-400 tracking-wider">
                  {item.year}
                </div>
                <div className="font-serif text-base text-white">{item.title}</div>
                <div className="text-xs text-[#e8e2d8]/70 leading-relaxed font-light">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Territorio & Impacto */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>{t.elProyectoPage.sec5Tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">{t.elProyectoPage.sec5Title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {t.elProyectoPage.impactCards.map((card, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#090e0b] space-y-2">
                <div className="text-sm font-serif text-emerald-400 mb-1">{card.title}</div>
                <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation CTA */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/investigacion"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
          >
            <span>{t.nav.research}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>{t.elProyectoPage.ctaShop}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
