import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin } from 'lucide-react';
import { projectData } from '../data/projectData';

import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { director } = useContent();

  return (
    <footer className="bg-[#040705] border-t border-emerald-950/40 text-[#e8e2d8]/70 py-12 sm:py-16 px-5 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Identity */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full border border-emerald-500/40 bg-[#0d1512] flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
                <path d="M12 6c-3 0-5 2-5 5 0 2 1 3 2 4-1 2-1 3 0 4 1 1 3 1 4-1 1-1 2-3 2-5 2 0 3-2 3-5 0-4-3-6-6-6z" fill="currentColor" opacity="0.85"/>
              </svg>
            </div>
            <span className="font-serif tracking-widest text-base text-[#e8e2d8] uppercase">
              {projectData.name}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#e8e2d8]/60 mb-4">
            Iniciativa de investigación científica, monitoreo de primates neotropicales y conservación de paisajes fragmentados en la Orinoquia colombiana.
          </p>
          <div className="text-[11px] text-emerald-400/80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{projectData.location}</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 text-xs">
          <div>
            <div className="text-emerald-400 font-mono uppercase tracking-[0.2em] text-[11px] mb-4">
              Navegación
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/investigacion" className="hover:text-emerald-300 transition-colors">Investigación</Link>
              </li>
              <li>
                <Link to="/el-proyecto" className="hover:text-emerald-300 transition-colors">El Proyecto</Link>
              </li>
              <li>
                <Link to="/tienda" className="hover:text-emerald-300 transition-colors">Tienda Oficial</Link>
              </li>
              <li>
                <Link to="/donaciones" className="hover:text-emerald-300 transition-colors">Donaciones</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-300 transition-colors">Blog / Notas de campo</Link>
              </li>
              <li className="pt-2 border-t border-white/5">
                <Link to="/admin" className="text-emerald-400/80 hover:text-emerald-300 font-mono text-[11px] flex items-center gap-1.5 transition-colors">
                  <span>Acceso CMS Admin →</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-emerald-400 font-mono uppercase tracking-[0.2em] text-[11px] mb-4">
              Dirección Científica
            </div>
            <p className="text-xs text-[#e8e2d8]/80 font-medium mb-1">{director.name}</p>
            <p className="text-[11px] text-[#e8e2d8]/60 mb-1">{director.title}</p>
            <p className="text-[11px] text-[#e8e2d8]/50 max-w-xs leading-relaxed mb-4">
              {director.doctorate}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-[11px] text-[#e8e2d8]/70">contacto@zocayproject.org</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={director.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                aria-label="X (Twitter) - Dra. Xyomara Carretero"
                title="X (Twitter)"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={director.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                aria-label="LinkedIn - Dra. Xyomara Carretero"
                title="LinkedIn"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
                </svg>
              </a>
              <a
                href={projectData.director.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#e8e2d8]/70 hover:text-white hover:border-emerald-400 hover:bg-emerald-950/40 transition-colors"
                aria-label="Instagram - Dra. Xyomara Carretero"
                title="Instagram"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#e8e2d8]/40 gap-4">
        <div>
          © {new Date().getFullYear()} Zocay Project. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-500/70">
            <Compass className="w-3.5 h-3.5" />
            <span>Llanos Orientales, Colombia</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
