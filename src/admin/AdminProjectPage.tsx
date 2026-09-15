import React, { useState } from 'react';
import { Compass, Check, Calendar, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { DirectorProfile, TimelineEvent } from '../types/content';
import { sanitizeUrl } from '../lib/security';

export const AdminProjectPage: React.FC = () => {
  const { director, timeline, updateDirector, updateTimeline } = useContent();

  const [dirProfile, setDirProfile] = useState<DirectorProfile>(director);
  const [events, setEvents] = useState<TimelineEvent[]>(timeline);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDirectorField = (field: keyof DirectorProfile, value: any) => {
    setDirProfile({ ...dirProfile, [field]: value });
  };

  const handleSocialChange = (network: 'twitter' | 'linkedin' | 'instagram', url: string) => {
    setDirProfile({
      ...dirProfile,
      socials: {
        ...dirProfile.socials,
        [network]: url,
      },
    });
  };

  const handleTimelineChange = (index: number, field: keyof TimelineEvent, value: string) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  const addTimelineEvent = () => {
    setEvents([
      ...events,
      {
        year: '2026',
        title: 'Nuevo Hito Histórico',
        description: 'Descripción de avance científico o hito de conservación.',
      },
    ]);
  };

  const removeTimelineEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    const cleanProfile: DirectorProfile = {
      ...dirProfile,
      socials: {
        twitter: sanitizeUrl(dirProfile.socials?.twitter || ''),
        linkedin: sanitizeUrl(dirProfile.socials?.linkedin || ''),
        instagram: sanitizeUrl(dirProfile.socials?.instagram || ''),
      },
    };
    await updateDirector(cleanProfile);
    await updateTimeline(events);
    setIsSaving(false);
    setFeedback('¡Perfil de la Directora y trayectoria histórica actualizados!');
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Territorio & Liderazgo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            El Proyecto & Dirección Científica
          </h1>
          <p className="text-xs text-[#e8e2d8]/70 font-light mt-1">
            Actualiza el perfil de la Dra. Xyomara Carretero-Pinzón, sus credenciales académicas, redes sociales y los hitos históricos (/el-proyecto).
          </p>
        </div>

        <button
          onClick={handleSaveAll}
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

      {/* 1. Perfil de la Directora */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#080d0a] space-y-6">
        <div className="flex items-center gap-2 text-sm font-serif text-white pb-3 border-b border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Dirección Científica & Biografía</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={dirProfile.name}
              onChange={(e) => handleDirectorField('name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1.5">
              Título Profesional
            </label>
            <input
              type="text"
              value={dirProfile.title}
              onChange={(e) => handleDirectorField('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-mono text-[#e8e2d8]/70 uppercase tracking-wider block mb-1.5">
              Doctorado (Ph.D.)
            </label>
            <input
              type="text"
              value={dirProfile.doctorate}
              onChange={(e) => handleDirectorField('doctorate', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#e8e2d8]/70 uppercase tracking-wider block mb-1.5">
              Vinculación / Institución del Doctorado
            </label>
            <input
              type="text"
              value={dirProfile.doctorateAffiliation}
              onChange={(e) => handleDirectorField('doctorateAffiliation', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-[#e8e2d8]/70 uppercase tracking-wider block mb-1.5">
                Maestría
              </label>
              <input
                type="text"
                value={dirProfile.graduate}
                onChange={(e) => handleDirectorField('graduate', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#e8e2d8]/70 uppercase tracking-wider block mb-1.5">
                Pregrado
              </label>
              <input
                type="text"
                value={dirProfile.undergraduate}
                onChange={(e) => handleDirectorField('undergraduate', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <label className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
              Redes Sociales Oficiales de la Directora
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-[#e8e2d8]/50 block mb-1">X (Twitter)</span>
                <input
                  type="text"
                  value={dirProfile.socials?.twitter || ''}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                  placeholder="https://x.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#e8e2d8]/50 block mb-1">LinkedIn</span>
                <input
                  type="text"
                  value={dirProfile.socials?.linkedin || ''}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  placeholder="https://co.linkedin.com/in/..."
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#e8e2d8]/50 block mb-1">Instagram</span>
                <input
                  type="text"
                  value={dirProfile.socials?.instagram || ''}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#050806] text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1.5">
              Semblanza Biográfica y Trayectoria en Conservación
            </label>
            <textarea
              rows={5}
              value={dirProfile.bio}
              onChange={(e) => handleDirectorField('bio', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#050806] text-xs text-[#e8e2d8]/85 focus:outline-none focus:border-emerald-500 leading-relaxed font-light"
            />
          </div>
        </div>
      </div>

      {/* 2. Trayectoria Histórica / Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2 text-sm font-serif text-white">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Hitos Históricos del Proyecto ({events.length})</span>
          </div>

          <button
            onClick={addTimelineEvent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Hito</span>
          </button>
        </div>

        <div className="space-y-4">
          {events.map((ev, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-[#080e0b] space-y-3">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={ev.year}
                  onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)}
                  placeholder="Año (ej: 2004)"
                  className="w-32 px-3 py-1.5 rounded-lg border border-white/10 bg-[#050806] text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                />

                <button
                  onClick={() => removeTimelineEvent(idx)}
                  className="p-1.5 text-[#e8e2d8]/40 hover:text-red-400 transition-colors"
                  title="Eliminar hito"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={ev.title}
                  onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                  placeholder="Título del hito..."
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#050806] text-sm text-white focus:outline-none focus:border-emerald-500 font-serif"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={ev.description}
                  onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)}
                  placeholder="Detalles del logro o evento histórico..."
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-[#050806] text-xs text-[#e8e2d8]/80 focus:outline-none focus:border-emerald-500 leading-relaxed font-light"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
