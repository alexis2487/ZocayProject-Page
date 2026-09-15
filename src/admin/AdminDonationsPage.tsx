import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Check, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ShieldCheck, 
  Lock,
  Globe
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { DonationTier } from '../types/content';
import { openWompiCheckout, openPayPalCheckout } from '../data/paymentConfig';

export const AdminDonationsPage: React.FC = () => {
  const { 
    donationTiers, 
    updateDonationTiers, 
    wompiUrl, 
    updateWompiUrl,
    paypalUrl,
    updatePaypalUrl 
  } = useContent();

  const [tiers, setTiers] = useState<DonationTier[]>(donationTiers);
  const [wompiInput, setWompiInput] = useState<string>(wompiUrl);
  const [paypalInput, setPaypalInput] = useState<string>(paypalUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setTiers(donationTiers);
  }, [donationTiers]);

  useEffect(() => {
    setWompiInput(wompiUrl);
  }, [wompiUrl]);

  useEffect(() => {
    setPaypalInput(paypalUrl);
  }, [paypalUrl]);

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
    await updateWompiUrl(wompiInput);
    await updatePaypalUrl(paypalInput);
    setIsSaving(false);
    setFeedback('¡Niveles de donación y pasarelas (Wompi y PayPal) actualizados con éxito!');
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <Heart className="w-3.5 h-3.5" />
            <span>Fondo de Conservación & Pasarelas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Pasarelas de Pago & Niveles de Donación
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Configura las pasarelas oficiales de pago (Wompi para Colombia y PayPal para internacionales) y los valores sugeridos.
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

      {/* Gateway 1: Wompi Configuration */}
      <div className="p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#09120e] to-[#060a08] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif text-white flex items-center gap-2">
                <span>Pasarela Wompi (Colombia / COP)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Activa
                </span>
              </h2>
              <p className="text-xs text-[#e8e2d8]/70 font-light">
                Para donaciones y compras nacionales con PSE, Nequi, Bancolombia y Tarjetas en pesos colombianos.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openWompiCheckout(wompiInput)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Probar Enlace Wompi</span>
          </button>
        </div>

        <div>
          <label className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
            URL del Checkout Wompi
          </label>
          <input
            type="url"
            value={wompiInput}
            onChange={(e) => setWompiInput(e.target.value)}
            placeholder="https://checkout.wompi.co/l/..."
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-wide"
          />
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#e8e2d8]/60 mt-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Canales:</span>
            </span>
            <span>PSE (cualquier banco) · Nequi · Botón Bancolombia · Tarjetas Débito/Crédito</span>
          </div>
        </div>
      </div>

      {/* Gateway 2: PayPal Configuration (International) */}
      <div className="p-6 rounded-3xl border border-[#0070BA]/40 bg-gradient-to-b from-[#07131b] to-[#060a08] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0070BA]/20 border border-[#0070BA]/40 flex items-center justify-center text-[#009cde]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-serif text-white flex items-center gap-2">
                <span>Pasarela PayPal (Internacional / Global)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0070BA]/20 text-[#009cde] border border-[#0070BA]/40">
                  Activa
                </span>
              </h2>
              <p className="text-xs text-[#e8e2d8]/70 font-light">
                Para donantes y adquirientes en el exterior que aportan en dólares (USD) o euros (EUR).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openPayPalCheckout(paypalInput)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#0070BA]/40 bg-[#071723]/60 hover:bg-[#0070BA]/20 text-xs text-[#009cde] transition-colors shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Probar Enlace PayPal</span>
          </button>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#009cde] uppercase tracking-wider block mb-2">
            URL de PayPal.me Internacional
          </label>
          <input
            type="url"
            value={paypalInput}
            onChange={(e) => setPaypalInput(e.target.value)}
            placeholder="https://paypal.me/..."
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-[#0070BA] font-mono tracking-wide"
          />
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#e8e2d8]/60 mt-2">
            <span className="flex items-center gap-1 text-[#009cde]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Canales:</span>
            </span>
            <span>Cuenta PayPal · Tarjetas de Crédito y Débito Internacionales (USD / EUR / Moneda Global)</span>
          </div>
        </div>
      </div>

      {/* Donation Tiers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Niveles de Aporte Sugeridos ({tiers.length})
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
            className="p-5 rounded-2xl border border-white/5 bg-[#080d0a] space-y-3 hover:border-white/10 transition-colors"
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
