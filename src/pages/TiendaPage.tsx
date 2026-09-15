import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  priceCOP: string;
  description: string;
  impact: string;
  image: string;
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
      description: "Gorra técnica de expedición en algodón y malla transpirable con el parche circular bordado oficial del Mono Zocay.",
      impact: "Financia 2 horas de monitoreo y seguimiento demográfico en dosel.",
      image: "/images/products/gorra-zocay.png"
    },
    {
      id: "camiseta-conservacion",
      name: "Camiseta Oficial Conservación",
      category: "Indumentaria",
      priceCOP: "$ 85.000 COP",
      description: "Camiseta serigrafiada con tintas ecológicas que ilustra al Mono Zocay (Plecturocebus ornatus) y su hábitat de galería.",
      impact: "Permite sembrar y georreferenciar 5 plántulas de árboles nativos para cercas vivas.",
      image: "/images/products/camisa-zocay.png"
    },
    {
      id: "taza-expedicion",
      name: "Taza de Expedición Zocay",
      category: "Accesorios",
      priceCOP: "$ 45.000 COP",
      description: "Taza esmaltada verde bosque para café de origen llanero, con el emblema Zocay grabada para campamentos y campo.",
      impact: "Cubre insumos de bitácora y papelería científica para investigadores locales.",
      image: "/images/products/taza-zocay.png"
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
            El 100% de los excedentes generados por la tienda oficial se destina a expediciones científicas, adquisición de insumos de campo y siembra de cercas vivas para el Mono Zocay en el departamento del Meta.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div 
              key={p.id}
              className="p-6 rounded-2xl border border-white/10 bg-[#090f0c] flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group shadow-xl"
            >
              <div>
                {/* Product Photo Showcase */}
                <div className="w-full h-64 rounded-xl overflow-hidden bg-[#0d1512] border border-white/5 mb-6 relative flex items-center justify-center p-4 group-hover:border-emerald-500/30 transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#060a08]/85 text-emerald-300 border border-emerald-500/30">
                    {p.category}
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
                  <strong>Impacto directo:</strong> {p.impact}
                </div>
                <button
                  onClick={() => setSelectedProduct(p.id)}
                  className={`w-full py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectedProduct === p.id
                      ? 'bg-emerald-400 text-emerald-950 font-semibold shadow-lg shadow-emerald-500/20'
                      : 'border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-400 hover:text-emerald-950'
                  }`}
                >
                  {selectedProduct === p.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Producto Seleccionado</span>
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
                Cada adquisición recibe un certificado digital de apoyo a la conservación del Mono Zocay y un reporte semestral de impacto.
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
