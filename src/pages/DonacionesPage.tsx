import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Check, ShieldCheck, Gift } from 'lucide-react';

import { useContent } from '../context/ContentContext';

export const DonacionesPage: React.FC = () => {
  const { donationTiers } = useContent();
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = donationTiers;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) return;
    setIsCompleted(true);
  };

  return (
    <div className="w-full bg-[#060a08] text-[#e8e2d8] pt-20 sm:pt-24 pb-20 sm:pb-28">
      {/* Header Banner */}
      <div className="relative py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 border-b border-emerald-950/40 bg-gradient-to-b from-[#0a130f] via-[#060a08] to-[#060a08]">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-4 sm:mb-6">
            <Heart className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              FONDO DE INVESTIGACIÓN & CONSERVACIÓN
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight font-normal mb-4 sm:mb-6">
            Apoya directamente al Zocay Project
          </h1>

          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Tu generosidad garantiza la continuidad del monitoreo biológico de largo plazo y la protección de los bosques de galería en el Meta.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">
        {isCompleted ? (
          <div className="p-6 sm:p-10 rounded-2xl border border-emerald-500/40 bg-[#0b1310] text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif text-white">¡Gracias por ser parte del cambio, {donorName}!</h2>
            <p className="text-sm text-[#e8e2d8]/80 leading-relaxed font-light max-w-lg mx-auto">
              Hemos registrado tu compromiso de donación por valor de{' '}
              <strong className="text-emerald-300">
                {customAmount ? `$ ${customAmount} COP` : `$ ${selectedAmount.toLocaleString('es-CO')} COP`}
              </strong>. Recibirás las instrucciones de consignación y certificado digital a tu correo ({donorEmail}).
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
              >
                Volver al Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-10">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                1. Selecciona el aporte
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tiers.map((t) => {
                  const isSelected = selectedAmount === t.amount && !customAmount;
                  return (
                    <button
                      type="button"
                      key={t.amount}
                      onClick={() => {
                        setSelectedAmount(t.amount);
                        setCustomAmount('');
                      }}
                      className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-950/50'
                          : 'border-white/10 bg-[#090f0c] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-white font-medium">{t.label}</span>
                        <span className="text-[11px] font-mono text-[#e8e2d8]/50">{t.usd}</span>
                      </div>
                      <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed">
                        {t.impact}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="O ingresa otro valor en COP (ej: 300000)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                2. Datos del donante
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo o Institución"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#060a08] bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Confirmar Donación Segura</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#e8e2d8]/60 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparencia institucional · Reportes de impacto semestrales</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
