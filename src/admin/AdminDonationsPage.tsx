import React, { useState } from 'react';
import { Heart, Check, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { DonationTier } from '../types/content';

export const AdminDonationsPage: React.FC = () => {
  const { donationTiers, updateDonationTiers } = useContent();

  const [tiers, setTiers] = useState<DonationTier[]>(donationTiers);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleTierChange = (index: number, field: keyof DonationTier, value: any) => {
    const updated = [...tiers];
    updated[index] = { ...updated[index], [field]: value };
    setTiers(updated);
  };

  const addTier = () => {
    setTiers([
      ...tiers,
      {
        amount: 750000,
        label: '$ 750.000 COP',
        usd: '~ $190 USD',
        impact: 'Financia equipos de campo y mantenimiento de transectos.',
      },
    ]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateDonationTiers(tiers);
    setIsSaving(false);
    setFeedback('¡Niveles de donación actualizados con éxito!');
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <Heart className="w-3.5 h-3.5" />
            <span>Fondo de Conservación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Niveles de Donación & Impacto
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Configura los valores sugeridos y las descripciones de impacto que ven los donantes en (/donaciones).
          </p>
        </div>

        <button
          onClick={handleSave}
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

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Niveles de Aporte ({tiers.length})
          </span>
          <button
            onClick={addTier}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Nivel</span>
          </button>
        </div>

        {tiers.map((t, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-white/5 bg-[#080d0a] space-y-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                <div>
                  <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                    Valor COP (Numérico)
                  </label>
                  <input
                    type="number"
                    value={t.amount}
                    onChange={(e) => handleTierChange(idx, 'amount', Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                    Etiqueta Visible
                  </label>
                  <input
                    type="text"
                    value={t.label}
                    onChange={(e) => handleTierChange(idx, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs font-serif text-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                    Equivalente USD
                  </label>
                  <input
                    type="text"
                    value={t.usd}
                    onChange={(e) => handleTierChange(idx, 'usd', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs font-mono text-[#e8e2d8]/70 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                onClick={() => removeTier(idx)}
                className="p-2 text-[#e8e2d8]/40 hover:text-red-400 transition-colors shrink-0"
                title="Eliminar nivel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#e8e2d8]/60 uppercase tracking-wider block mb-1">
                Impacto Directo en Campo
              </label>
              <textarea
                rows={2}
                value={t.impact}
                onChange={(e) => handleTierChange(idx, 'impact', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed font-light"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
