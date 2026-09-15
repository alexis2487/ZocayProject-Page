import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HomeSupport: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="seccion-apoyo"
      className="relative min-h-screen min-h-[100svh] w-full flex items-center justify-center overflow-x-hidden bg-[#060a08]"
    >
      {/* Background Image: Emotional Conservation & Tree Planting in Colombia */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/apoyo-conservacion.jpg"
          alt="Comunidad y conservación activa sembrando árboles nativos y cercas vivas para el mono zocay en el Meta, Colombia"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Deep Warm Overlay & Vignette */}
        <div className="absolute inset-0 bg-[#060a08]/80 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a08] via-transparent to-[#060a08] h-full" />
      </div>

      {/* Main Content: Focused Editorial Call To Action */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-12 w-full py-20 sm:py-24 lg:py-28 text-center flex flex-col items-center">
        {/* Chapter Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/80 backdrop-blur-md mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
            {t.support.chapterTag}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#e8e2d8] leading-[1.12] tracking-tight font-normal mb-4 sm:mb-6 max-w-2xl">
          {t.support.headline} <span className="italic text-emerald-400 font-medium">{t.support.headlineAccent}</span>.
        </h2>

        {/* Short Description */}
        <p className="text-sm sm:text-base lg:text-lg text-[#e8e2d8]/85 font-sans font-light leading-relaxed max-w-xl mb-8 sm:mb-12">
          {t.support.description}
        </p>

        {/* Two Minimalist Elegant Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-6 w-full sm:w-auto max-w-md sm:max-w-none">
          {/* Primary Action: Store */}
          <Link
            to="/tienda"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#060a08] bg-emerald-400 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.support.shopBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Secondary Action: Direct Donation */}
          <Link
            to="/donaciones"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-white border border-white/20 bg-black/40 backdrop-blur-sm hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 transition-all duration-300 group"
          >
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>{t.support.donateBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Reassurance note */}
        <div className="mt-8 sm:mt-12 text-[11px] sm:text-xs text-[#e8e2d8]/60 font-sans tracking-wide max-w-lg">
          {t.support.reassurance}
        </div>
      </div>
    </section>
  );
};
