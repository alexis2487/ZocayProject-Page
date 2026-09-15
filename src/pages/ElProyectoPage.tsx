import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  Trees, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { projectData } from '../data/projectData';

export const ElProyectoPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              DOCUMENTO INSTITUCIONAL Y CIENTÍFICO
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            El <span className="text-emerald-400">Zocay Project</span> y la conservación de la Orinoquia
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Una experiencia de investigación científica de largo plazo centrada en la relación entre primates neotropicales, ecosistemas fragmentados y comunidades locales en los Llanos Orientales de Colombia.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-20">
        {/* 1. ¿Qué es el Zocay Project? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Compass className="w-4 h-4" />
            <span>01. Definición & Propósito</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">¿Qué es el Zocay Project?</h2>
          
          <blockquote className="border-l-2 border-emerald-500 pl-6 py-2 text-lg font-serif italic text-emerald-200/90 leading-relaxed bg-emerald-950/20 rounded-r-lg">
            "El Zocay Project es una iniciativa de investigación, conservación, educación y protección de la biodiversidad de los Llanos Orientales de Colombia, fundada por la bióloga, primatóloga y ecóloga de paisaje Dr. Xyomara Carretero-Pinzón en 2004."
          </blockquote>

          <p className="text-[#e8e2d8]/85 leading-relaxed font-light">
            La narrativa del proyecto es una experiencia de investigación de largo plazo centrada en la relación entre primates, ecosistemas fragmentados y comunidades locales. El proyecto comenzó explícitamente en 2004 en una finca ganadera de los Llanos colombianos y ha evolucionado desde el estudio de primates dentro de fragmentos boscosos hacia la ecología del paisaje, el monitoreo de biodiversidad y la conservación de paisajes humanizados.
          </p>
        </section>

        {/* 2. Dirección Científica: Dra. Xyomara Carretero-Pinzón */}
        <section className="p-8 sm:p-10 rounded-2xl border border-emerald-900/40 bg-[#0b1310]/80 backdrop-blur-md space-y-8">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>02. Dirección & Liderazgo Científico</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-12 h-12 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-1">
                {projectData.director.name}
              </h3>
              <p className="text-emerald-400 text-sm font-sans tracking-wide mb-4">
                {projectData.director.title}
              </p>
              <div className="space-y-2 text-xs text-[#e8e2d8]/75">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Doctorado (Ph.D.):</strong> {projectData.director.doctorate}</span>
                </div>
                <div className="flex items-start gap-2 pl-6 text-[#e8e2d8]/60">
                  <span>Vinculación: {projectData.director.doctorateAffiliation}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Maestría:</strong> {projectData.director.graduate}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Pregrado:</strong> {projectData.director.undergraduate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4 text-sm sm:text-base text-[#e8e2d8]/85 font-light leading-relaxed">
            <p>
              La Dra. Xyomara Carretero-Pinzón es bióloga, investigadora y especialista en conservación de fauna silvestre, con una trayectoria enfocada en el estudio de las comunidades de primates neotropicales y la dinámica de paisajes fragmentados en Colombia, particularmente en la región de los Llanos Orientales y la Orinoquia.
            </p>
            <p>
              Es fundadora e investigadora principal de Zocay Project, iniciativa científica dedicada al monitoreo biológico a largo plazo y a la conservación de especies amenazadas y sus ecosistemas. Su investigación examina los efectos de la pérdida y fragmentación del hábitat sobre la demografía, el comportamiento y la distribución espacial de los primates, abordando variables clave como el tamaño de los parches de bosque, el papel de las cercas vivas como corredores biológicos y la influencia de las matrices productivas (como la agricultura y la ganadería) en la conectividad del paisaje.
            </p>
            <p>
              A través de su producción científica y trabajo de campo, la Dra. Carretero-Pinzón articula la investigación ecológica cuantitativa con la evaluación del estado de conservación de especies y el análisis del ordenamiento territorial ambiental, generando evidencia técnica para la formulación de estrategias de conservación y conectividad en paisajes transformados por actividades antrópicas.
            </p>
          </div>
        </section>

        {/* 3. Historia y Evolución (Desde 2004) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Calendar className="w-4 h-4" />
            <span>03. Trayectoria Histórica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Historia del Proyecto</h2>
          <p className="text-[#e8e2d8]/85 leading-relaxed font-light">
            {projectData.history.origin} {projectData.history.evolution}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {projectData.history.timeline.map((item, idx) => (
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

        {/* 4. Especies Focales */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Trees className="w-4 h-4" />
            <span>04. Biodiversidad & Especies Focales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Especies de Estudio</h2>
          <p className="text-[#e8e2d8]/85 leading-relaxed font-light">
            La investigación liderada por la Dra. Carretero-Pinzón se ha enfocado en especies clave que permiten modelar la conectividad y viabilidad poblacional en bosques de galería:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {projectData.focalSpecies.map((sp, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-emerald-950/60 bg-[#0b1310] overflow-hidden flex flex-col group hover:border-emerald-500/40 transition-colors"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1310] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/60 text-emerald-300 border border-emerald-500/30">
                    {sp.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-serif text-white mb-0.5">{sp.name}</h3>
                  <div className="italic text-xs font-serif text-emerald-400/90 mb-3">{sp.scientificName}</div>
                  <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light mb-4 flex-1">
                    {sp.description}
                  </p>
                  <div className="text-[11px] font-mono text-emerald-500/80 pt-2 border-t border-white/5">
                    Estado: {sp.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Territorio, Conectividad e Impacto */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>05. Territorio, Matrices Productivas & Impacto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Ecosistemas y Conservación</h2>
          
          <div className="space-y-4 text-[#e8e2d8]/85 font-light leading-relaxed">
            <p>
              El proyecto se desarrolla en el departamento del <strong>Meta</strong>, en la transición biogeográfica de los <strong>Llanos Orientales y la Orinoquia colombiana</strong>. En este territorio, la actividad ganadera y agrícola histórica fragmentó los bosques de galería continuos en mosaicos de parches aislados.
            </p>
            <p>
              El hallazgo central de las investigaciones de Zocay Project demuestra que las <strong>cercas vivas</strong> (hileras de árboles nativos sembrados tradicionalmente como divisiones de potreros) actúan como corredores estructurales y funcionales indispensables, permitiendo que los primates forrajeen, mantengan flujo genético y sobrevivan dentro de paisajes productivos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {projectData.scientificThemes.map((theme, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#090e0b]">
                <div className="text-sm font-serif text-white mb-1">{theme.title}</div>
                <div className="text-xs text-[#e8e2d8]/70 leading-relaxed font-light">
                  {theme.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next navigation CTA */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/investigacion"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
          >
            <span>Ver Sección de Investigación</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>Apoyar el Proyecto</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
