import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  priceCOP: string;
  description: string;
  impact: string;
}

export const TiendaPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products: Product[] = [
    {
      id: "gorra-edicion-especial",
      name: "Gorra Edición Especial Zocay",
      category: "Indumentaria de Campo",
      priceCOP: "$ 75.000 COP",
      description: "Gorra técnica de expedición en algodón orgánico y poliéster reciclado con el bordado oficial del Mono Socai.",
      impact: "Financia 2 horas de monitoreo y seguimiento demográfico en dosel."
    },
    {
      id: "camiseta-conservacion",
      name: "Camiseta Oficial Conservación",
      category: "Indumentaria",
      priceCOP: "$ 85.000 COP",
      description: "Camiseta serigrafiada con tintas ecológicas a base de agua que ilustra al tití del Meta (Plecturocebus ornatus) y las cercas vivas.",
      impact: "Permite sembrar y georreferenciar 5 plántulas de árboles nativos."
    },
    {
      id: "taza-expedicion",
      name: "Taza de Expedición Zocay",
      category: "Accesorios",
      priceCOP: "$ 45.000 COP",
      description: "Taza térmica esmaltada para café de origen llanero, resistente para trabajo de campo en selva y campamentos.",
      impact: "Cubre insumos de bitácora y papelería científica para investigadores."
    }
  ];

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
              TIENDA OFICIAL CON CAUSA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-normal mb-6">
            Productos que financian la conservación
          </h1>

          <p className="text-lg text-[#e8e2d8]/80 font-sans font-light max-w-3xl leading-relaxed">
            El 100% de los excedentes generados por la tienda oficial se destina a expediciones científicas, adquisición de insumos de campo y siembra de cercas vivas en el departamento del Meta.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div 
              key={p.id}
              className="p-6 rounded-2xl border border-white/10 bg-[#090f0c] flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-wider mb-1">
                  {p.category}
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{p.name}</h3>
                <div className="text-lg font-serif text-emerald-300 font-medium mb-4">
                  {p.priceCOP}
                </div>
                <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light mb-6">
                  {p.description}
                </p>
              </div>

              <div>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300/90 leading-relaxed mb-4">
                  <strong>Impacto directo:</strong> {p.impact}
                </div>
                <button
                  onClick={() => setSelectedProduct(p.id)}
                  className="w-full py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-400 hover:text-emerald-950 transition-colors flex items-center justify-center gap-2"
                >
                  {selectedProduct === p.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Seleccionado</span>
                    </>
                  ) : (
                    <span>Solicitar / Reservar</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Support Reassurance */}
        <div className="p-8 rounded-2xl border border-emerald-900/30 bg-[#0b1310] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="font-serif text-white text-base">Transparencia y Trazabilidad</div>
              <div className="text-xs text-[#e8e2d8]/70 font-light">
                Cada adquisición recibe un certificado digital de apoyo y reporte semestral de impacto de conservación.
              </div>
            </div>
          </div>
          <Link
            to="/donaciones"
            className="shrink-0 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium text-white border border-white/20 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Hacer donación directa
          </Link>
        </div>
      </div>
    </div>
  );
};
