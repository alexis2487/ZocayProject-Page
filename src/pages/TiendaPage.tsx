import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  ShoppingBag, 
  X, 
  MessageCircle, 
  Mail, 
  HeartHandshake, 
  PackageCheck,
  AlertCircle
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types/content';

export const TiendaPage: React.FC = () => {
  const { products } = useContent();
  const { t, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  const getWhatsAppUrl = (p: Product) => {
    const text = language === 'en'
      ? `Hello Zocay Project team, I would like to purchase the official item "${p.name}" (${p.priceCOP}) to support Zocay Monkey conservation. How can I proceed with payment and shipping?`
      : `Hola equipo Zocay Project, deseo adquirir el producto oficial "${p.name}" (${p.priceCOP}) para apoyar la conservación del Mono Zocay. ¿Cuáles son los pasos para el pago y envío?`;
    return `https://wa.me/573100000000?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = (p: Product) => {
    const subject = language === 'en'
      ? `Purchase Request: ${p.name} - Zocay Project Official Shop`
      : `Solicitud de Compra: ${p.name} - Tienda Zocay Project`;
    const body = language === 'en'
      ? `Hello Zocay Project team,\n\nI would like to acquire the following official cause-driven item:\n\n- Product: ${p.name}\n- Category: ${p.category}\n- Price: ${p.priceCOP}\n- Associated Impact: ${p.impact}\n\nPlease let me know authorized payment channels and shipping details.\n\nThank you for your scientific and conservation work.`
      : `Hola equipo de Zocay Project,\n\nMe gustaría adquirir el siguiente artículo oficial con causa:\n\n- Producto: ${p.name}\n- Categoría: ${p.category}\n- Valor: ${p.priceCOP}\n- Impacto asociado: ${p.impact}\n\nPor favor indíquenme las cuentas autorizadas para transferencia y el formulario de envío.\n\nMuchas gracias por su labor científica y de conservación.`;
    return `mailto:contacto@zocayproject.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full bg-[#060a08] text-[#e8e2d8] pt-20 sm:pt-24 pb-20 sm:pb-28">
      {/* Editorial Header Banner */}
      <div className="relative py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 border-b border-emerald-950/40 bg-gradient-to-b from-[#0a130f] via-[#060a08] to-[#060a08]">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.tiendaPage.backHome}</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-[#060a08]/60 backdrop-blur-md mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-300 font-sans font-medium">
              {t.tiendaPage.bannerTag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight font-normal mb-4 sm:mb-6">
            {t.tiendaPage.title}
          </h1>

          <p className="text-base sm:text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            {t.tiendaPage.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p) => {
            const isAvailable = p.inStock !== false;

            return (
              <div 
                key={p.id}
                className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#090f0c] flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  {/* Product Photo Showcase */}
                  <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-[#0d1512] border border-white/5 mb-5 sm:mb-6 relative flex items-center justify-center p-4 group-hover:border-emerald-500/30 transition-colors">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#060a08]/85 text-emerald-300 border border-emerald-500/30">
                      {p.category}
                    </span>

                    {/* Stock status badge */}
                    <span className={`absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${
                      isAvailable 
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                    }`}>
                      {isAvailable ? t.tiendaPage.inStockBadge : t.tiendaPage.outOfStockBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {p.name}
                  </h3>
                  <div className="text-lg font-serif text-emerald-400 font-medium mb-3">
                    {p.priceCOP}
                  </div>
                  <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light mb-6">
                    {p.description}
                  </p>
                </div>

                <div>
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300/90 leading-relaxed mb-4">
                    <strong>{t.tiendaPage.impactLabel}</strong> {p.impact}
                  </div>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className={`w-full py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      isAvailable
                        ? 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-400 hover:text-emerald-950 shadow-lg shadow-emerald-950/40'
                        : 'border border-amber-500/30 bg-amber-950/20 text-amber-300 hover:bg-amber-900/40'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAvailable ? t.tiendaPage.requestBtn : t.tiendaPage.outOfStockBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Reassurance */}
        <div className="p-5 sm:p-8 rounded-2xl border border-emerald-900/30 bg-[#0b1310] flex flex-col md:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="font-serif text-white text-base">{t.tiendaPage.transparencyTitle}</div>
              <div className="text-xs text-[#e8e2d8]/70 font-light">
                {t.tiendaPage.transparencyText}
              </div>
            </div>
          </div>
          <Link
            to="/donaciones"
            className="shrink-0 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-white border border-white/20 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {t.tiendaPage.directDonationBtn}
          </Link>
        </div>
      </div>

      {/* Reservation / Checkout Modal */}
      {selectedProduct && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="w-full max-w-lg bg-[#0a120e] border border-emerald-800/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#e8e2d8] transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>{t.tiendaPage.modalTag}</span>
              </div>
              <h2 className="text-2xl font-serif text-white font-normal">
                {selectedProduct.name}
              </h2>
              <div className="text-xl font-serif text-emerald-400 font-medium mt-1">
                {selectedProduct.priceCOP}
              </div>
            </div>

            {/* Product Snapshot */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#060a08] border border-white/5">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#0e1713] flex items-center justify-center p-2 shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-xs space-y-1">
                <div className="text-white font-medium">{selectedProduct.category}</div>
                <div className="text-[#e8e2d8]/70 leading-relaxed font-light">
                  {selectedProduct.description}
                </div>
                <div className="text-emerald-300/90 font-mono text-[11px] pt-1">
                  🌱 {selectedProduct.impact}
                </div>
              </div>
            </div>

            {/* Status note */}
            {selectedProduct.inStock === false && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {t.tiendaPage.modalOutOfStockNote}
                </span>
              </div>
            )}

            <div className="space-y-2">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-emerald-400/90">
                {t.tiendaPage.modalChannelSelect}
              </span>

              {/* Action: WhatsApp */}
              <a
                href={getWhatsAppUrl(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.tiendaPage.modalWhatsAppBtn}</span>
              </a>

              {/* Action: Email */}
              <a
                href={getMailtoUrl(selectedProduct)}
                className="w-full py-3.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{t.tiendaPage.modalEmailBtn}</span>
              </a>
            </div>

            {/* Micro guarantees */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#e8e2d8]/50">
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.tiendaPage.modalShippingNote}
              </span>
              <span>{t.tiendaPage.modalFundsNote}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
