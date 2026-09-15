import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Microscope, BookOpen, Layers, Trees } from 'lucide-react';
import { projectData } from '../data/projectData';

export const InvestigacionPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const researchLines = [
    {
      code: "LINEA-01",
      title: "Ecología de Poblaciones y Demografía de Primates",
      description: "Monitoreo longitudinal de tropas de tití del Meta (Plecturocebus ornatus), mono nocturno (Aotus brumbacki) y mono ardilla (Saimiri cassiquiarensis albigena). Estimación de densidad poblacional, tasas de natalidad, supervivencia y estructura de edad en fragmentos de bosque.",
      icon: Microscope
    },
    {
      code: "LINEA-02",
      title: "Conectividad del Paisaje y Cercas Vivas",
      description: "Evaluación cuantitativa del uso de corredores arbóreos lineales por mamíferos arborícolas. Identificación de especies vegetales clave en linderos ganaderos y diseño de parámetros de conectividad funcional para restauración ecológica.",
      icon: Trees
    },
    {
      code: "LINEA-03",
      title: "Matrices Agropecuarias y Comportamiento",
      description: "Análisis de la permeabilidad de matrices productivas (pastos de pastoreo bovino, cultivos de palma y sabanas antrópicas) frente al desplazamiento y flujo genético de especies neotropicales.",
      icon: Layers
    },
    {
      code: "LINEA-04",
      title: "Ordenamiento Territorial y Conservación Aplicada",
      description: "Traducción de datos biológicos en criterios técnicos para autoridades ambientales regionales (Cormacarena), reservas naturales de la sociedad civil y planes de ordenamiento de cuencas en el departamento del Meta.",
      icon: BookOpen
    }
  ];

  return (
    <div className="w-full bg-[#060a08] text-[#e8e2d8] pt-24 pb-28">
      {/* Header Banner */}
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
              INVESTIGACIÓN CIENTÍFICA & MONITOREO
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            Líneas de Investigación y Producción Científica
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Más de dos décadas de monitoreo cuantitativo en los Llanos Orientales. Generamos ciencia rigurosa orientada a la toma de decisiones para salvar primates y conectar paisajes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projectData.metrics.map((m, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-emerald-900/30 bg-[#0b1310] flex flex-col">
              <span className="text-3xl font-serif text-emerald-400 mb-1">{m.value}</span>
              <span className="text-xs font-sans text-white font-medium">{m.label}</span>
              <span className="text-[11px] text-[#e8e2d8]/50 mt-1">{m.detail}</span>
            </div>
          ))}
        </div>

        {/* Research Lines */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Ejes Temáticos de Investigación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {researchLines.map((line, idx) => {
              const Icon = line.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl border border-white/5 bg-[#090e0b] flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
                        {line.code}
                      </span>
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-serif text-white mb-3">{line.title}</h3>
                    <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                      {line.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology & Fieldwork */}
        <section className="p-8 rounded-2xl border border-white/10 bg-[#090f0c] space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif text-white">Metodología de Campo Rigurosa</h2>
          <p className="text-sm text-[#e8e2d8]/80 leading-relaxed font-light">
            El trabajo se fundamenta en censos por transectos lineales, muestreo focal de comportamiento (focal-animal sampling), fototrampeo en dosel arbóreo y análisis espacial mediante sistemas de información geográfica (SIG) y ecología cuantitativa del paisaje desarrollada en The University of Queensland.
          </p>
          <div className="pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-[#e8e2d8]/60">
            <span>Investigadora Principal: <strong>Dra. Xyomara Carretero-Pinzón</strong></span>
            <span>•</span>
            <span>Meta, Colombia</span>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/el-proyecto"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
          >
            <span>Conoce la trayectoria de la Directora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/donaciones"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>Financiar Días de Campo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
