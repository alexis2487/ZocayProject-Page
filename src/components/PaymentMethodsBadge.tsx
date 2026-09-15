import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Globe } from 'lucide-react';
import { 
  DEFAULT_WOMPI_CHECKOUT_URL, 
  DEFAULT_PAYPAL_URL, 
  openWompiCheckout, 
  openPayPalCheckout 
} from '../data/paymentConfig';

interface PaymentMethodsBadgeProps {
  variant?: 'compact' | 'full' | 'inline';
  wompiUrl?: string;
  paypalUrl?: string;
  showPayButton?: boolean;
  className?: string;
}

export const PaymentMethodsBadge: React.FC<PaymentMethodsBadgeProps> = ({
  variant = 'full',
  wompiUrl = DEFAULT_WOMPI_CHECKOUT_URL,
  paypalUrl = DEFAULT_PAYPAL_URL,
  showPayButton = false,
  className = '',
}) => {
  const handleOpenWompi = (e: React.MouseEvent) => {
    e.preventDefault();
    openWompiCheckout(wompiUrl);
  };

  const handleOpenPayPal = (e: React.MouseEvent) => {
    e.preventDefault();
    openPayPalCheckout(paypalUrl);
  };

  if (variant === 'inline') {
    return (
      <div className={`inline-flex flex-wrap items-center gap-2 text-[11px] text-[#e8e2d8]/75 ${className}`}>
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Wompi (Bancolombia)</span>
        </span>
        <span className="text-white/20">·</span>
        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">PSE</span>
        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">Nequi</span>
        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono">Bancolombia</span>
        <span className="text-white/20">·</span>
        <span className="flex items-center gap-1 text-[#0079C1] font-semibold">
          <Globe className="w-3.5 h-3.5 text-[#0079C1]" />
          <span>PayPal (Internacional)</span>
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-3.5 rounded-xl bg-[#090f0c] border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-white font-medium flex items-center gap-1.5">
              <span>Pagos Nacionales e Internacionales</span>
            </div>
            <div className="text-[11px] text-[#e8e2d8]/60 font-light">
              Colombia: Wompi (PSE · Nequi · Tarjetas) | Global: PayPal
            </div>
          </div>
        </div>

        {showPayButton && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenWompi}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors inline-flex items-center justify-center gap-1"
            >
              <span>Wompi</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleOpenPayPal}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold text-white bg-[#0070BA] hover:bg-[#005ea6] transition-colors inline-flex items-center justify-center gap-1"
            >
              <span>PayPal</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#09110d] to-[#060a08] border border-emerald-500/30 space-y-4 shadow-xl shadow-emerald-950/20 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-white text-base sm:text-lg font-medium">
                Pasarelas Oficiales de Pago
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                100% Seguras
              </span>
            </div>
            <p className="text-xs text-[#e8e2d8]/70 font-light mt-0.5">
              Wompi para donaciones en Colombia (COP) y PayPal para donantes en el exterior (USD / Global).
            </p>
          </div>
        </div>

        {showPayButton && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenWompi}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shrink-0"
            >
              <span>Wompi (COP)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleOpenPayPal}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#0070BA] hover:bg-[#005ea6] transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shrink-0"
            >
              <span>PayPal (USD)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Payment Channels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
        <div className="p-3 rounded-xl bg-[#060a08] border border-white/10 hover:border-emerald-500/30 transition-colors">
          <div className="text-xs font-mono font-bold text-white tracking-wider">PSE</div>
          <div className="text-[10px] text-[#e8e2d8]/60 mt-0.5">Bancos de Colombia</div>
        </div>
        <div className="p-3 rounded-xl bg-[#060a08] border border-white/10 hover:border-emerald-500/30 transition-colors">
          <div className="text-xs font-mono font-bold text-white tracking-wider">NEQUI</div>
          <div className="text-[10px] text-[#e8e2d8]/60 mt-0.5">Transferencia digital</div>
        </div>
        <div className="p-3 rounded-xl bg-[#060a08] border border-white/10 hover:border-emerald-500/30 transition-colors">
          <div className="text-xs font-mono font-bold text-white tracking-wider">BANCOLOMBIA</div>
          <div className="text-[10px] text-[#e8e2d8]/60 mt-0.5">Botón y Código QR</div>
        </div>
        <div className="p-3 rounded-xl bg-[#060a08] border border-white/10 hover:border-emerald-500/30 transition-colors">
          <div className="text-xs font-mono font-bold text-white tracking-wider">TARJETAS</div>
          <div className="text-[10px] text-[#e8e2d8]/60 mt-0.5">Visa · Mastercard · Amex</div>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#07131b] border border-[#0070BA]/40 hover:border-[#0070BA] transition-colors">
          <div className="text-xs font-mono font-bold text-[#009cde] tracking-wider flex items-center justify-center gap-1">
            <Globe className="w-3 h-3" />
            <span>PAYPAL</span>
          </div>
          <div className="text-[10px] text-[#e8e2d8]/70 mt-0.5">Internacional / USD</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#e8e2d8]/50 pt-1">
        <span className="flex items-center gap-1.5 text-emerald-400/90 font-mono text-[10px] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Procesamiento seguro encriptado (SSL 256-bit y PCI-DSS)
        </span>
        <span className="text-[10px] text-[#e8e2d8]/40">
          Wompi & PayPal Verificados
        </span>
      </div>
    </div>
  );
};
