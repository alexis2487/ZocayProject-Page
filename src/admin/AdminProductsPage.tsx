import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Product } from '../types/content';
import { sanitizeText } from '../lib/security';

export const AdminProductsPage: React.FC = () => {
  const { products, saveProduct, deleteProduct } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const openNewProduct = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      name: '',
      category: 'Indumentaria',
      priceCOP: '$ 50.000 COP',
      description: '',
      impact: '',
      image: '/images/products/gorra-zocay.png',
      inStock: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name?.trim()) return;

    setIsSaving(true);
    const cleanProduct: Partial<Product> = {
      ...editingProduct,
      name: sanitizeText(editingProduct.name.trim()),
      category: sanitizeText(editingProduct.category || 'Indumentaria'),
      priceCOP: sanitizeText(editingProduct.priceCOP || '$ 0 COP'),
      description: sanitizeText(editingProduct.description || ''),
      impact: sanitizeText(editingProduct.impact || ''),
    };

    const res = await saveProduct(cleanProduct);
    setIsSaving(false);

    if (res.success) {
      setFeedback('Producto guardado exitosamente.');
      setTimeout(() => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback(res.error || 'Error al guardar el producto.');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete.id);
    setProductToDelete(null);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Tienda con Causa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Gestión de Productos Oficiales
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Administra los artículos disponibles en la tienda oficial (/tienda), sus precios en COP y su impacto en conservación.
          </p>
        </div>

        <button
          onClick={openNewProduct}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl border border-white/5 bg-[#080d0a] hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-48 rounded-xl bg-[#0d1512] border border-white/5 mb-5 flex items-center justify-center p-3 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/70 text-emerald-300 border border-emerald-500/30">
                  {p.category}
                </span>
              </div>

              <h3 className="text-lg font-serif text-white mb-1">{p.name}</h3>
              <div className="text-base font-serif text-emerald-400 font-medium mb-3">
                {p.priceCOP}
              </div>
              <p className="text-xs text-[#e8e2d8]/70 font-light leading-relaxed mb-4">
                {p.description}
              </p>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300/90 leading-relaxed mb-6">
                <strong>Impacto:</strong> {p.impact}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                p.inStock ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'
              }`}>
                {p.inStock ? 'En Stock' : 'Agotado'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-xs transition-colors"
                  title="Editar producto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setProductToDelete(p)}
                  className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Editor de Producto */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#090f0c] border border-emerald-900/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-serif text-white">
                {editingProduct.name ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#e8e2d8]/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Ej: Gorra Edición Especial Zocay"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    placeholder="Indumentaria, Accesorios, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                    Precio (COP) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.priceCOP || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceCOP: e.target.value })}
                    placeholder="$ 75.000 COP"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-emerald-300 font-serif focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                  Ruta de la Imagen
                </label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="/images/products/gorra-zocay.png"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs font-mono text-[#e8e2d8]/70 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Materiales, detalles de expedición y acabados..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1.5">
                  Impacto Directo en Conservación *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.impact || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, impact: e.target.value })}
                  placeholder="Ej: Permite sembrar 5 árboles nativos para cercas vivas."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={editingProduct.inStock !== false}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-[#060a08]"
                />
                <label htmlFor="inStockCheck" className="text-xs text-white cursor-pointer select-none">
                  Producto disponible en stock
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-[#e8e2d8]/70 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090f0c] border border-red-900/40 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-serif text-white">¿Eliminar este producto?</h3>
            </div>
            <p className="text-xs text-[#e8e2d8]/75">
              Se eliminará <strong className="text-white">"{productToDelete.name}"</strong> de la tienda oficial.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button onClick={() => setProductToDelete(null)} className="px-4 py-2 text-xs text-[#e8e2d8]/70">
                Cancelar
              </button>
              <button onClick={confirmDelete} className="px-5 py-2 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
