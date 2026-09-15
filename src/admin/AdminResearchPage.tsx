import React, { useState } from 'react';
import { Microscope, Check, Plus, Trash2, BarChart2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ResearchLine, Metric } from '../types/content';

export const AdminResearchPage: React.FC = () => {
  const { researchLines, metrics, updateResearchLines, updateMetrics } = useContent();

  const [lines, setLines] = useState<ResearchLine[]>(researchLines);
  const [metricList, setMetricList] = useState<Metric[]>(metrics);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleLineChange = (index: number, field: keyof ResearchLine, value: string) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: value };
    setLines(updated);
  };

  const addLine = () => {
    setLines([
      ...lines,
      {
        code: `LINEA-0${lines.length + 1}`,
        title: 'Nueva Línea de Investigación',
        description: 'Descripción científica del estudio y objetivos de monitoreo.',
      },
    ]);
  };

  const removeLine = (index: number) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const handleMetricChange = (index: number, field: keyof Metric, value: string) => {
    const updated = [...metricList];
    updated[index] = { ...updated[index], [field]: value };
    setMetricList(updated);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await updateResearchLines(lines);
    await updateMetrics(metricList);
    setIsSaving(false);
    setFeedback('¡Líneas de investigación y métricas actualizadas con éxito!');
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <Microscope className="w-3.5 h-3.5" />
            <span>Evidencia Científica</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Investigación Científica & Métricas
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Modifica las líneas de estudio del Mono Zocay y los indicadores cuantitativos que aparecen en (/investigacion) y la sección 02 del Home.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 shrink-0"
        >
          <Check className="w-4 h-4" />
          <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 1. Métricas Cuantitativas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-serif text-white pb-2 border-b border-white/5">
          <BarChart2 className="w-4 h-4 text-emerald-400" />
          <span>Indicadores & Métricas Clave</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricList.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#080e0b] space-y-2">
              <div>
                <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                  Valor Destacado
                </label>
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-lg font-serif text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                  Etiqueta
                </label>
                <input
                  type="text"
                  value={m.label}
                  onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                  Detalle Breve
                </label>
                <input
                  type="text"
                  value={m.detail}
                  onChange={(e) => handleMetricChange(idx, 'detail', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-[11px] text-[#e8e2d8]/70 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Líneas de Investigación */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2 text-sm font-serif text-white">
            <Microscope className="w-4 h-4 text-emerald-400" />
            <span>Líneas de Investigación del Mono Zocay ({lines.length})</span>
          </div>

          <button
            onClick={addLine}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Línea</span>
          </button>
        </div>

        <div className="space-y-4">
          {lines.map((line, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-[#080e0b] space-y-3">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={line.code}
                  onChange={(e) => handleLineChange(idx, 'code', e.target.value)}
                  placeholder="LINEA-01"
                  className="w-32 px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                />

                <button
                  onClick={() => removeLine(idx)}
                  className="p-1.5 text-[#e8e2d8]/40 hover:text-red-400 transition-colors"
                  title="Eliminar esta línea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
                  Título de la Línea
                </label>
                <input
                  type="text"
                  value={line.title}
                  onChange={(e) => handleLineChange(idx, 'title', e.target.value)}
                  placeholder="Título..."
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#050806] text-sm text-white focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider block mb-1">
                  Descripción & Metodología de Campo
                </label>
                <textarea
                  rows={3}
                  value={line.description}
                  onChange={(e) => handleLineChange(idx, 'description', e.target.value)}
                  placeholder="Descripción detallada..."
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#050806] text-xs text-[#e8e2d8]/80 focus:outline-none focus:border-emerald-500 leading-relaxed font-light"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
