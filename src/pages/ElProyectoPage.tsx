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
  AlertCircle,
  Heart
} from 'lucide-react';
import { projectData } from '../data/projectData';

export const ElProyectoPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { monoZocay } = projectData;

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
              EL PROYECTO & LA ESPECIE PROTAGONISTA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            El <span className="text-emerald-400">Zocay Project</span>: ciencia para salvar al Mono Socai
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            Una experiencia de investigación científica de largo plazo centrada en dar visibilidad, estudiar y proteger al mono socai (<em className="italic">Plecturocebus ornatus</em>) en los bosques fragmentados y comunidades rurales de los Llanos Orientales de Colombia.
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
            La narrativa del proyecto es una experiencia de investigación de largo plazo centrada en la relación entre el mono socai, los ecosistemas fragmentados y las comunidades locales. El proyecto comenzó explícitamente en 2004 en una finca ganadera de los Llanos colombianos y ha evolucionado desde el estudio del mono zocay dentro de fragmentos boscosos hacia la ecología del paisaje, el monitoreo de biodiversidad y la conservación en paisajes humanizados.
          </p>
        </section>

        {/* 2. Dirección Científica: Dra. Xyomara Carretero-Pinzón */}
        <section className="p-8 sm:p-10 rounded-2xl border border-emerald-900/40 bg-[#0b1310]/80 backdrop-blur-md space-y-8">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>02. Dirección & Liderazgo Científico</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl shrink-0 bg-[#0d1512]">
              <img
                src={projectData.director.photo}
                alt={projectData.director.name}
                className="w-full h-full object-cover object-top"
              />
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
              Es fundadora e investigadora principal de Zocay Project, iniciativa científica dedicada al monitoreo biológico a largo plazo y a la conservación del mono zocay y sus ecosistemas. Su investigación examina los efectos de la pérdida y fragmentación del hábitat sobre la demografía, el comportamiento y la distribución espacial de los primates, abordando variables clave como el tamaño de los parches de bosque, el papel de las cercas vivas como corredores biológicos y la influencia de las matrices productivas (como la agricultura y la ganadería) en la conectividad del paisaje.
            </p>
            <p>
              A través de su producción científica y trabajo de campo, la Dra. Carretero-Pinzón articula la investigación ecológica cuantitativa con la evaluación del estado de conservación de especies y el análisis del ordenamiento territorial ambiental, generando evidencia técnica para la formulación de estrategias de conservación y conectividad en paisajes transformados por actividades antrópicas.
            </p>
          </div>
        </section>

        {/* 3. La Especie Protagonista Absoluta: El Mono Zocay */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>03. La Especie en Conservación: Protagonista del Proyecto</span>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-[#090f0c] overflow-hidden">
            {/* Visual Hero of Mono Zocay */}
            <div className="relative h-96 w-full overflow-hidden">
              <img
                src={monoZocay.image}
                alt={monoZocay.name}
                className="w-full h-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f0c] via-transparent to-black/30" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-xs text-emerald-300 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Única Especie en Conservación del Proyecto</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl sm:text-4xl font-serif text-white">{monoZocay.name}</h2>
                <div className="italic text-base font-serif text-emerald-400">
                  {monoZocay.scientificName} ({monoZocay.synonyms})
                </div>
              </div>
            </div>

            {/* In-depth details */}
            <div className="p-8 sm:p-10 space-y-8">
              <p className="text-base sm:text-lg text-[#e8e2d8]/90 font-light leading-relaxed">
                {monoZocay.description}
              </p>

              {/* Status and Territory Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Estado UICN</span>
                  <span className="text-xs text-white font-medium">{monoZocay.status}</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Endemismo</span>
                  <span className="text-xs text-white font-medium">{monoZocay.endemic}</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-[#0e1713]">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">Hábitat Primario</span>
                  <span className="text-xs text-white font-medium">{monoZocay.habitat}</span>
                </div>
              </div>

              {/* Biological and Behavioral Pillars */}
              <div>
                <h3 className="text-xl font-serif text-white mb-6">Rasgos Clave de su Ecología y Comportamiento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {monoZocay.keyTraits.map((trait, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-white/5 bg-[#0b1310] space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-serif font-medium">
                        <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{trait.title}</span>
                      </div>
                      <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
                        {trait.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threats */}
              <div className="p-6 rounded-2xl border border-amber-950/40 bg-amber-950/10 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-mono uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Amenazas que enfrenta el Mono Zocay en el Meta</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#e8e2d8]/80 font-light">
                  {monoZocay.threats.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Historia y Evolución (Desde 2004) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <Calendar className="w-4 h-4" />
            <span>04. Trayectoria Histórica (Desde 2004)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Historia del Proyecto Zocay</h2>
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

        {/* 5. Territorio, Cercas Vivas & Conectividad */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>05. Territorio, Cercas Vivas & Impacto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Cercas Vivas: Autopistas en el Dosel</h2>
          
          <div className="space-y-4 text-[#e8e2d8]/85 font-light leading-relaxed">
            <p>
              El proyecto se desarrolla en el departamento del <strong>Meta</strong>, en la transición biogeográfica de los <strong>Llanos Orientales y la Orinoquia colombiana</strong>. En este territorio, la actividad ganadera histórica transformó la cobertura vegetal en parches discontinuos.
            </p>
            <p>
              El hallazgo central de las investigaciones de la Dra. Carretero-Pinzón demuestra que las <strong>cercas vivas</strong> (hileras de árboles nativos sembrados tradicionalmente como linderos de potreros) actúan como corredores estructurales y funcionales indispensables para el mono zocay, permitiendo que las tropas familiares se desplacen, forrajeen y mantengan su viabilidad genética sin bajar al suelo.
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

        {/* Navigation CTA */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/investigacion"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
          >
            <span>Ver Investigaciones sobre el Mono Zocay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <span>Apoyar la Conservación</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
