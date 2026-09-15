import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  FileText, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  User, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Article } from '../types/content';
import { generateSafeSlug, sanitizeText } from '../lib/security';

const DEFAULT_CATEGORIES = [
  'Monitoreo Biológico',
  'Comportamiento Animal',
  'Ecología del Paisaje',
  'Conservación en Fincas',
  'Cercas Vivas & Corredores',
  'Educación Ambiental',
];

export const AdminReportsPage: React.FC = () => {
  const { articles, saveArticle, deleteArticle } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete confirmation modal state
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  // Check URL query params for ?nuevo=true or ?edit=slug
  useEffect(() => {
    const editSlug = searchParams.get('edit');
    const isNew = searchParams.get('nuevo');

    if (editSlug) {
      const found = articles.find(a => a.slug === editSlug);
      if (found) {
        openEditor(found);
      }
    } else if (isNew === 'true') {
      openNewEditor();
    }
  }, [searchParams, articles]);

  const openNewEditor = () => {
    const now = new Date();
    const formattedDate = `${now.getDate()} ${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][now.getMonth()]} ${now.getFullYear()}`;
    setEditingArticle({
      title: '',
      slug: '',
      category: 'Monitoreo Biológico',
      date: formattedDate,
      readTime: '5 min de lectura',
      author: 'Dra. Xyomara Carretero-Pinzón',
      excerpt: '',
      content: '',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditor = (article: Article) => {
    setEditingArticle({ ...article });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
    setSearchParams({});
  };

  const handleTitleChange = (newTitle: string) => {
    if (!editingArticle) return;
    const updates: Partial<Article> = { title: newTitle };
    // Auto-generate slug if empty or newly created
    if (!editingArticle.id || !editingArticle.slug) {
      updates.slug = generateSafeSlug(newTitle);
    }
    setEditingArticle({ ...editingArticle, ...updates });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title?.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Por favor ingresa un título para el informe.' });
      return;
    }

    setIsSaving(true);
    setFeedbackMsg(null);

    const finalSlug = (editingArticle.slug && editingArticle.slug.trim() !== '')
      ? generateSafeSlug(editingArticle.slug)
      : generateSafeSlug(editingArticle.title);

    const cleanArticle: Partial<Article> = {
      ...editingArticle,
      title: sanitizeText(editingArticle.title || ''),
      slug: finalSlug,
      author: sanitizeText(editingArticle.author || 'Dra. Xyomara Carretero-Pinzón'),
      category: sanitizeText(editingArticle.category || 'Monitoreo Biológico'),
      readTime: sanitizeText(editingArticle.readTime || '5 min de lectura'),
      excerpt: sanitizeText(editingArticle.excerpt || ''),
      content: editingArticle.content?.trim() || '',
    };

    const res = await saveArticle(cleanArticle);
    setIsSaving(false);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: '¡Informe guardado y publicado exitosamente!' });
      setTimeout(() => {
        closeModal();
        setFeedbackMsg(null);
      }, 1200);
    } else {
      setFeedbackMsg({ type: 'error', text: res.error || 'Error al guardar el informe.' });
    }
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    await deleteArticle(articleToDelete.slug);
    setArticleToDelete(null);
  };

  // Filtered list
  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestión Científica & Divulgación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Informes de Campo y Publicaciones del Mono Zocay
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Redacta, edita o administra los informes de monitoreo que se muestran en la bitácora pública (/blog).
          </p>
        </div>

        <button
          onClick={openNewEditor}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Informe</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-white/5 bg-[#070c09] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#e8e2d8]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título, resumen o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-[#0a110d] text-xs text-white placeholder-[#e8e2d8]/30 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] text-[#e8e2d8]/50 uppercase tracking-wider shrink-0 font-mono">
            Categoría:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-white/10 bg-[#0a110d] text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Todas ({articles.length})</option>
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({articles.filter(a => a.category === cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table / Cards List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 rounded-2xl border border-white/5 bg-[#080d0a] text-center space-y-3">
            <FileText className="w-8 h-8 text-[#e8e2d8]/30 mx-auto" />
            <div className="text-base font-serif text-white">No se encontraron informes</div>
            <p className="text-xs text-[#e8e2d8]/60 max-w-sm mx-auto">
              No hay publicaciones que coincidan con los filtros de búsqueda seleccionados.
            </p>
          </div>
        ) : (
          filteredArticles.map((art) => (
            <div
              key={art.slug}
              className="p-6 rounded-2xl border border-white/5 bg-[#080d0a] hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[10px] uppercase">
                    {art.category}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#e8e2d8]/60 flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    {art.date}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#e8e2d8]/50 flex items-center gap-1 text-[11px] font-mono">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    art.status === 'draft' 
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' 
                      : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {art.status === 'draft' ? 'Borrador' : 'Publicado'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-emerald-300 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-[#e8e2d8]/75 font-light leading-relaxed line-clamp-2">
                  {art.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-[#e8e2d8]/50 pt-1">
                  <User className="w-3 h-3 text-emerald-400" />
                  <span>{art.author}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => openEditor(art)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-xs font-medium transition-colors border border-white/5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => setArticleToDelete(art)}
                  className="p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 transition-colors"
                  title="Eliminar informe"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: Editor de Informe Científico */}
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#090f0c] border border-emerald-900/50 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white">
                    {editingArticle.id ? 'Editar Informe Científico' : 'Nuevo Informe Científico'}
                  </h2>
                  <p className="text-[11px] text-emerald-400/80 font-mono">
                    Autoría: {editingArticle.author || 'Dra. Xyomara Carretero-Pinzón'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-[#e8e2d8]/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackMsg && (
              <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
                feedbackMsg.type === 'success' 
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' 
                  : 'bg-red-950/40 border border-red-800/40 text-red-200'
              }`}>
                {feedbackMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Título del Informe *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Análisis demográfico y supervivencia de tropas de mono zocay..."
                  value={editingArticle.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060a08] text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Slug & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    Enlace Slug (URL amigable)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="analisis-demografico-mono-zocay"
                    value={editingArticle.slug || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    Categoría Temática
                  </label>
                  <input
                    type="text"
                    list="categories-list"
                    placeholder="Monitoreo Biológico"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <datalist id="categories-list">
                    {DEFAULT_CATEGORIES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>

              {/* Metadata Row: Date, Read time, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#e8e2d8]/70 mb-2">
                    Fecha de Publicación
                  </label>
                  <input
                    type="text"
                    placeholder="12 abr 2025"
                    value={editingArticle.date || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#e8e2d8]/70 mb-2">
                    Tiempo de Lectura Estimado
                  </label>
                  <input
                    type="text"
                    placeholder="5 min de lectura"
                    value={editingArticle.readTime || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#e8e2d8]/70 mb-2">
                    Estado de Publicación
                  </label>
                  <select
                    value={editingArticle.status || 'published'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="published">Publicado (Visible)</option>
                    <option value="draft">Borrador (Oculto)</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Resumen Corto / Abstract *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Escribe una breve síntesis del informe o hallazgo de campo para las tarjetas de la web..."
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Cuerpo Completo del Informe (Texto, párrafos y observaciones)
                </label>
                <textarea
                  rows={8}
                  placeholder="Detalla la metodología, observaciones etológicas, datos de campo, censos y conclusiones..."
                  value={editingArticle.content || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060a08] text-xs text-white font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-[#e8e2d8]/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-7 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <span>Guardando...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Guardar y Publicar</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Confirmar Eliminación */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090f0c] border border-red-900/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-serif text-white">¿Eliminar este informe?</h3>
            </div>
            <p className="text-xs text-[#e8e2d8]/75 leading-relaxed font-light">
              Estás a punto de eliminar permanentemente el informe <strong className="text-white">"{articleToDelete.title}"</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 rounded-lg text-xs text-[#e8e2d8]/70 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
