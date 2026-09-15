import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Microscope, BookOpen, Layers, Trees, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

export const InvestigacionPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const researchLines = [
    {
      code: "LINEA-01",
      title: "Demografía y Ecología Poblacional del Mono Zocay",
      description: "Monitoreo longitudinal de tropas familiares de mono zocay (Plecturocebus ornatus). Estimación de densidad de grupos, tasas de natalidad, supervivencia de infantes y estructura de edad en fragmentos de bosque de galería en el Meta.",
      icon: Microscope
    },
    {
      code: "LINEA-02",
      title: "Cercas Vivas como Corredores del Zocay",
      description: "Evaluación cuantitativa del uso de linderos arbóreos por el mono zocay. Identificación de especies vegetales nativas de fructificación y diseño de parámetros de conectividad funcional para restaurar el tránsito del zocay entre parches aislados.",
      icon: Trees
    },
    {
      code: "LINEA-03",
      title: "Matrices Ganaderas y Conducta del Zocay",
      description: "Análisis de la respuesta etológica del mono zocay frente a matrices agropecuarias (pasturas ganaderas y sabanas antrópicas). Identificación de barreras espaciales y umbrales críticos de tamaño de parche.",
      icon: Layers
    },
    {
      code: "LINEA-04",
      title: "Ordenamiento Territorial para la Conservación del Zocay",
      description: "Traducción de datos biológicos de Plecturocebus ornatus en criterios técnicos para autoridades ambientales (Cormacarena), reservas de la sociedad civil y acuerdos de conservación con ganaderos locales.",
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
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-emerald-300 font-sans font-medium">
              INVESTIGACIÓN CIENTÍFICA DEL MONO ZOCAY
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            Ciencia y Monitoreo del <span className="text-emerald-400">Mono Zocay</span>
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Más de dos décadas de monitoreo cuantitativo en los Llanos Orientales. Generamos ciencia rigurosa orientada a la protección del mono zocay (<em className="italic">Plecturocebus ornatus</em>) y la conectividad de sus bosques.
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
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Líneas de Investigación Centradas en el Mono Zocay</h2>
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
          <h2 className="text-xl sm:text-2xl font-serif text-white">Metodología de Campo y Monitoreo Etológico</h2>
          <p className="text-sm text-[#e8e2d8]/80 leading-relaxed font-light">
            El trabajo se fundamenta en censos por transectos lineales, muestreo focal continuo del comportamiento de tropas de mono zocay (focal-animal sampling), fototrampeo en dosel arbóreo y análisis de conectividad del paisaje desarrollado por la Dra. Xyomara Carretero-Pinzón (The University of Queensland).
          </p>
          <div className="pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-[#e8e2d8]/60">
            <span>Investigadora Principal: <strong>Dra. Xyomara Carretero-Pinzón</strong></span>
            <span>•</span>
            <span>Especie Foco: Plecturocebus ornatus</span>
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
