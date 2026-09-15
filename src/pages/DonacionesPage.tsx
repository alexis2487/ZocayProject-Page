import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Check, ShieldCheck, Gift, MessageCircle, Mail, Building, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isValidEmail, sanitizeText } from '../lib/security';

export const DonacionesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = t.donacionesPage.tiers;

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (errorMessage) setErrorMessage(null);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = sanitizeText(donorName);
    const cleanEmail = donorEmail.trim();

    if (!cleanName) {
      setErrorMessage(t.donacionesPage.errorName);
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage(t.donacionesPage.errorEmail);
      return;
    }

    if (customAmount) {
      const num = parseInt(customAmount, 10);
      if (isNaN(num) || num < 10000) {
        setErrorMessage(t.donacionesPage.errorMinAmount);
        return;
      }
    }

    setDonorName(cleanName);
    setDonorEmail(cleanEmail);
    setIsCompleted(true);
  };

  const finalAmountString = customAmount 
    ? `$ ${parseInt(customAmount, 10).toLocaleString('es-CO')} COP` 
    : `$ ${selectedAmount.toLocaleString('es-CO')} COP`;

  const getWhatsAppDonationUrl = () => {
    const text = language === 'en'
      ? `Hello Dr. Xyomara and Zocay Project team, I am ${donorName}. I wish to make a conservation donation of ${finalAmountString} registered under the email ${donorEmail}. Please provide bank transfer / wire instructions.`
      : `Hola Dra. Xyomara y equipo Zocay Project, soy ${donorName}. Deseo realizar una donación por ${finalAmountString} registrada con el correo ${donorEmail}. Solicito los datos de transferencia.`;
    return `https://wa.me/573100000000?text=${encodeURIComponent(text)}`;
  };

  const getMailtoDonationUrl = () => {
    const subject = language === 'en'
      ? `Zocay Project Donation - ${donorName}`
      : `Donación Zocay Project - ${donorName}`;
    const body = language === 'en'
      ? `Hello Zocay Project team,\n\nI am ${donorName} (${donorEmail}).\nI have generated a donation pledge of ${finalAmountString}.\n\nPlease send me transfer instructions and the corresponding digital certificate.\n\nBest regards,\n${donorName}`
      : `Hola equipo Zocay Project,\n\nSoy ${donorName} (${donorEmail}).\nHe generado una promesa de donación por valor de ${finalAmountString}.\n\nPor favor envíenme las instrucciones de giro y el certificado digital correspondiente.\n\nSaludos cordiales,\n${donorName}`;
    return `mailto:contacto@zocayproject.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <span>{t.donacionesPage.backHome}</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-4 sm:mb-6">
            <Heart className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              {t.donacionesPage.bannerTag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight font-normal mb-4 sm:mb-6">
            {t.donacionesPage.title}
          </h1>

          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            {t.donacionesPage.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">
        {isCompleted ? (
          <div className="p-6 sm:p-10 rounded-2xl border border-emerald-500/40 bg-[#0b1310] text-center space-y-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                {t.donacionesPage.successTitle}{donorName}!
              </h2>
              <p className="text-sm text-[#e8e2d8]/80 leading-relaxed font-light max-w-lg mx-auto">
                {t.donacionesPage.successMessage}
                <strong className="text-emerald-300 font-serif text-base">{finalAmountString}</strong>.
              </p>
            </div>

            {/* Bank details card */}
            <div className="p-6 rounded-xl bg-[#060a08] border border-white/10 text-left space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <Building className="w-4 h-4" />
                <span>{t.donacionesPage.bankChannelsTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#e8e2d8]/85">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[11px] text-emerald-400 font-semibold block">{t.donacionesPage.bank1Title}</span>
                  <p className="font-mono text-white text-sm">{t.donacionesPage.bank1Sub}</p>
                  <p className="text-[11px] text-[#e8e2d8]/60">{t.donacionesPage.bank1Holder}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[11px] text-emerald-400 font-semibold block">{t.donacionesPage.bank2Title}</span>
                  <p className="font-mono text-white text-sm">{t.donacionesPage.bank2Sub}</p>
                  <p className="text-[11px] text-[#e8e2d8]/60">{t.donacionesPage.bank2Holder}</p>
                </div>
              </div>
              <p className="text-[11px] text-[#e8e2d8]/60 leading-relaxed">
                {t.donacionesPage.internationalNote}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={getWhatsAppDonationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 text-emerald-950 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.donacionesPage.whatsappConfirmBtn}</span>
                </a>
                <a
                  href={getMailtoDonationUrl()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>{t.donacionesPage.emailConfirmBtn}</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {t.donacionesPage.backHomeBtn}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-10">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                {t.donacionesPage.step1Label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tiers.map((tItem) => {
                  const isSelected = selectedAmount === tItem.amount && !customAmount;
                  return (
                    <button
                      type="button"
                      key={tItem.amount}
                      onClick={() => {
                        setSelectedAmount(tItem.amount);
                        setCustomAmount('');
                        setErrorMessage(null);
                      }}
                      className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-950/50'
                          : 'border-white/10 bg-[#090f0c] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-white font-medium">{tItem.label}</span>
                        <span className="text-[11px] font-mono text-[#e8e2d8]/50">{tItem.usd}</span>
                      </div>
                      <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed">
                        {tItem.impact}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="mt-4">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={t.donacionesPage.customAmountPlaceholder}
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                {t.donacionesPage.step2Label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t.donacionesPage.namePlaceholder}
                    value={donorName}
                    onChange={(e) => {
                      setDonorName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={t.donacionesPage.emailPlaceholder}
                    value={donorEmail}
                    onChange={(e) => {
                      setDonorEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
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
                <span>{t.donacionesPage.submitBtn}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#e8e2d8]/60 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.donacionesPage.reassuranceText}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
