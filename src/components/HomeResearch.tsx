import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, BookOpen, Trees } from 'lucide-react';

export const HomeResearch: React.FC = () => {
  return (
    <section 
      id="seccion-investigacion"
      className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-[#060a08]"
    >
      {/* Background Image: Scientific Fieldwork in Llanos Canopy */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/investigacion-campo.jpg"
          alt="Bióloga e investigadora realizando trabajo de campo en el dosel de los Llanos Orientales"
          className="w-full h-full object-cover object-center lg:object-[35%_center]"
          loading="lazy"
        />
        {/* Cinematic Gradients tailored for right-aligned text */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#060a08]/95 via-[#060a08]/65 to-transparent lg:w-[65%] lg:left-auto lg:right-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a08] via-transparent to-[#060a08] h-full" />
      </div>

      {/* Main Content: Right-Aligned Asymmetrical Editorial Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-28 flex justify-end">
        <div className="max-w-xl lg:ml-auto">
          {/* Chapter Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              02 — INVESTIGACIÓN CIENTÍFICA
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#e8e2d8] leading-[1.15] tracking-tight font-normal mb-6">
            Estudios, observaciones e historias que ayudan a <span className="italic text-emerald-400">comprender y proteger</span> la biodiversidad.
          </h2>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light leading-relaxed mb-8">
            Generamos evidencia cuantitativa sobre el impacto de la fragmentación del hábitat en los primates neotropicales, el rol de las cercas vivas como corredores biológicos y la dinámica ecológica en paisajes transformados por la ganadería.
          </p>

          {/* Clean Scientific Focus Badges */}
          <div className="grid grid-cols-3 gap-3 mb-10 text-xs">
            <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1.5">
              <Microscope className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium">Monitoreo</span>
              <span className="text-[11px] text-[#e8e2d8]/60">Demografía & dosel</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1.5">
              <Trees className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium">Cercas Vivas</span>
              <span className="text-[11px] text-[#e8e2d8]/60">Corredores funcionales</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-[#0d1512]/60 backdrop-blur-sm flex flex-col gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-medium">Evidencia</span>
              <span className="text-[11px] text-[#e8e2d8]/60">Gestión ambiental</span>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div>
            <Link
              to="/investigacion"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-white border border-emerald-500/40 bg-[#0d1512]/80 backdrop-blur-sm hover:bg-emerald-400 hover:text-emerald-950 hover:border-emerald-400 transition-all duration-300 group shadow-lg"
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
