import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Check, 
  ShieldCheck, 
  Gift, 
  MessageCircle, 
  Mail, 
  Building, 
  AlertCircle,
  ExternalLink,
  Lock,
  CreditCard,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { isValidEmail, sanitizeText } from '../lib/security';
import { openWompiCheckout, openPayPalCheckout } from '../data/paymentConfig';
import { PaymentMethodsBadge } from '../components/PaymentMethodsBadge';

export const DonacionesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { wompiUrl, paypalUrl, donationTiers } = useContent();
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastPaymentMethod, setLastPaymentMethod] = useState<'wompi' | 'paypal'>('wompi');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use dynamic tiers from CMS / ContentContext if available, otherwise fall back to i18n
  const tiers = donationTiers && donationTiers.length > 0 
    ? donationTiers 
    : t.donacionesPage.tiers;

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (errorMessage) setErrorMessage(null);
  };

  const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
  const finalAmountString = `$ ${finalAmount.toLocaleString('es-CO')} COP`;

  // Estimate USD amount for international donors (~4,000 COP per USD)
  const approxUSD = Math.max(5, Math.round(finalAmount / 4000));
  const finalUSDString = `~ $${approxUSD} USD`;

  const validateForm = (): boolean => {
    setErrorMessage(null);
    const cleanName = sanitizeText(donorName);
    const cleanEmail = donorEmail.trim();

    if (!cleanName) {
      setErrorMessage(t.donacionesPage.errorName);
      return false;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage(t.donacionesPage.errorEmail);
      return false;
    }

    if (customAmount) {
      const num = parseInt(customAmount, 10);
      if (isNaN(num) || num < 10000) {
        setErrorMessage(t.donacionesPage.errorMinAmount);
        return false;
      }
    }

    setDonorName(cleanName);
    setDonorEmail(cleanEmail);
    return true;
  };

  const handleWompiDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLastPaymentMethod('wompi');
    setIsCompleted(true);
    openWompiCheckout(wompiUrl);
  };

  const handlePayPalDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLastPaymentMethod('paypal');
    setIsCompleted(true);
    openPayPalCheckout(paypalUrl, approxUSD);
  };

  const handleDirectWompiClick = () => {
    openWompiCheckout(wompiUrl);
  };

  const handleDirectPayPalClick = () => {
    openPayPalCheckout(paypalUrl, approxUSD);
  };

  const getWhatsAppDonationUrl = () => {
    const gatewayName = lastPaymentMethod === 'paypal' ? 'PayPal' : 'Wompi';
    const amountText = lastPaymentMethod === 'paypal' ? `${finalUSDString} (${finalAmountString})` : finalAmountString;
    const text = language === 'en'
      ? `Hello Dr. Xyomara and Zocay Project team, I am ${donorName || 'a conservation supporter'}. I have made a donation of ${amountText} via ${gatewayName} registered under ${donorEmail || 'my email'}. Please confirm receipt and digital certificate.`
      : `Hola Dra. Xyomara y equipo Zocay Project, soy ${donorName || 'un donante'}. Realicé un aporte por ${amountText} a través de ${gatewayName} con el correo ${donorEmail || 'registrado'}. Adjunto notificación para el certificado digital.`;
    return `https://wa.me/573100000000?text=${encodeURIComponent(text)}`;
  };

  const getMailtoDonationUrl = () => {
    const gatewayName = lastPaymentMethod === 'paypal' ? 'PayPal' : 'Wompi';
    const amountText = lastPaymentMethod === 'paypal' ? `${finalUSDString} (${finalAmountString})` : finalAmountString;
    const subject = language === 'en'
      ? `Zocay Project Donation via ${gatewayName} - ${donorName || 'Supporter'}`
      : `Donación Zocay Project vía ${gatewayName} - ${donorName || 'Donante'}`;
    const body = language === 'en'
      ? `Hello Zocay Project team,\n\nI am ${donorName} (${donorEmail}).\nI have contributed ${amountText} through the official ${gatewayName} gateway.\n\nPlease confirm receipt and issue my digital certificate supporting the Zocay Monkey conservation.\n\nBest regards,\n${donorName}`
      : `Hola equipo Zocay Project,\n\nSoy ${donorName} (${donorEmail}).\nHe realizado una donación por valor de ${amountText} a través de la pasarela ${gatewayName}.\n\nPor favor confirmen la recepción y envíenme el certificado digital de apoyo a la conservación del Mono Zocay.\n\nSaludos cordiales,\n${donorName}`;
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

          {/* Quick direct gateway buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDirectWompiClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider transition-all"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.donacionesPage.wompiDirectBtn}</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </button>

            <button
              onClick={handleDirectPayPalClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0070BA]/50 bg-[#071723]/60 hover:bg-[#0070BA]/20 text-[#009cde] text-xs font-mono uppercase tracking-wider transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#009cde]" />
              <span>{t.donacionesPage.paypalDirectBtn}</span>
              <ExternalLink className="w-3 h-3 text-[#009cde]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">
        {isCompleted ? (
          <div className="p-6 sm:p-10 rounded-3xl border border-emerald-500/40 bg-[#0b1310] text-center space-y-8 animate-fadeIn shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif text-white">
                {t.donacionesPage.successTitle}{donorName}!
              </h2>
              <p className="text-sm text-[#e8e2d8]/80 leading-relaxed font-light max-w-lg mx-auto">
                {t.donacionesPage.successMessage}
                <strong className="text-emerald-300 font-serif text-base block mt-1">
                  {finalAmountString} ({finalUSDString})
                </strong>
              </p>
            </div>

            {/* Gateway Redirection Notice Card */}
            <div className={`p-5 rounded-2xl border text-left space-y-4 ${
              lastPaymentMethod === 'paypal' 
                ? 'bg-[#07131b] border-[#0070BA]/40' 
                : 'bg-emerald-950/40 border-emerald-500/40'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                  lastPaymentMethod === 'paypal'
                    ? 'bg-[#0070BA]/20 border-[#0070BA]/40 text-[#009cde]'
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                }`}>
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-serif text-white font-medium">
                    {lastPaymentMethod === 'paypal' ? t.donacionesPage.paypalCardTitle : t.donacionesPage.wompiCardTitle}
                  </div>
                  <p className="text-xs text-[#e8e2d8]/80 font-light mt-1 leading-relaxed">
                    {lastPaymentMethod === 'paypal' ? t.donacionesPage.paypalRedirectNotice : t.donacionesPage.wompiRedirectNotice}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {lastPaymentMethod === 'paypal' ? (
                  <button
                    type="button"
                    onClick={() => openPayPalCheckout(paypalUrl, approxUSD)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0070BA]/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.donacionesPage.paypalReopenBtn} ({finalUSDString})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openWompiCheckout(wompiUrl)}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t.donacionesPage.wompiReopenBtn} ({finalAmountString})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Alternate Gateway Switch Option */}
            <div className="text-xs text-[#e8e2d8]/60 flex items-center justify-center gap-2">
              <span>¿Prefieres pagar con otro medio?</span>
              {lastPaymentMethod === 'paypal' ? (
                <button
                  type="button"
                  onClick={() => openWompiCheckout(wompiUrl)}
                  className="text-emerald-400 hover:underline font-mono"
                >
                  Abrir Wompi (Colombia / COP) →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openPayPalCheckout(paypalUrl, approxUSD)}
                  className="text-[#009cde] hover:underline font-mono"
                >
                  Abrir PayPal (Internacional / USD) →
                </button>
              )}
            </div>

            {/* Notification via WhatsApp / Email */}
            <div className="p-6 rounded-2xl bg-[#060a08] border border-white/10 text-left space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Notificar al Equipo Científico
              </div>
              <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed">
                Una vez completado tu aporte, puedes notificarnos directamente para emitir tu certificado formal de donante:
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <a
                  href={getWhatsAppDonationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 text-emerald-950 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-md"
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

            {/* Manual bank details card as backup */}
            <div className="p-6 rounded-2xl bg-[#060a08] border border-white/10 text-left space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e8e2d8]/60">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>{t.donacionesPage.manualTransferTitle}</span>
              </div>
              <p className="text-xs text-[#e8e2d8]/60 font-light leading-relaxed">
                {t.donacionesPage.manualTransferDesc}
              </p>
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
              <p className="text-[11px] text-[#e8e2d8]/50 leading-relaxed">
                {t.donacionesPage.internationalNote}
              </p>
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
          <div className="space-y-10">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Amount Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400">
                  {t.donacionesPage.step1Label}
                </label>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-300 font-medium">
                    {finalAmountString}
                  </span>
                  <span className="text-[11px] font-mono text-[#e8e2d8]/60 ml-2">
                    ({finalUSDString})
                  </span>
                </div>
              </div>

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
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/50'
                          : 'border-white/10 bg-[#090f0c] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-white font-medium">{tItem.label}</span>
                        <span className="text-[11px] font-mono text-[#e8e2d8]/60">{tItem.usd}</span>
                      </div>
                      <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed">
                        {tItem.impact}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount input */}
              <div className="mt-4">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={t.donacionesPage.customAmountPlaceholder}
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500 transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500 transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#090f0c] text-white text-xs placeholder-[#e8e2d8]/40 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Gateway Showcase */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                3. Selecciona tu Pasarela Oficial de Pago
              </label>
              <PaymentMethodsBadge wompiUrl={wompiUrl} paypalUrl={paypalUrl} />
            </div>

            {/* Primary Action Buttons: Wompi (Colombia) & PayPal (International) */}
            <div className="space-y-3.5 pt-2">
              {/* Option A: Wompi for Colombia */}
              <button
                type="button"
                onClick={handleWompiDonate}
                className="w-full py-4 px-6 rounded-full text-xs uppercase tracking-[0.18em] font-bold text-[#060a08] bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                <Gift className="w-4 h-4" />
                <span>{t.donacionesPage.wompiBtn} ({finalAmountString})</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Option B: PayPal for International */}
              <button
                type="button"
                onClick={handlePayPalDonate}
                className="w-full py-4 px-6 rounded-full text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#0070BA] hover:bg-[#005ea6] transition-all shadow-xl shadow-[#0070BA]/25 flex items-center justify-center gap-2 group"
              >
                <Globe className="w-4 h-4 text-white" />
                <span>{t.donacionesPage.paypalBtn} ({finalUSDString})</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#e8e2d8]/60 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.donacionesPage.reassuranceText}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
