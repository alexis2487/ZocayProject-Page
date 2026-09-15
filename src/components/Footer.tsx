import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin } from 'lucide-react';
import { projectData } from '../data/projectData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040705] border-t border-emerald-950/40 text-[#e8e2d8]/70 py-16 px-6 md:px-12">
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
            </ul>
          </div>

          <div>
            <div className="text-emerald-400 font-mono uppercase tracking-[0.2em] text-[11px] mb-4">
              Dirección Científica
            </div>
            <p className="text-xs text-[#e8e2d8]/80 font-medium mb-1">{projectData.director.name}</p>
            <p className="text-[11px] text-[#e8e2d8]/60 mb-1">{projectData.director.title}</p>
            <p className="text-[11px] text-[#e8e2d8]/50 max-w-xs leading-relaxed mb-4">
              Ph.D. The University of Queensland · Pontificia Universidad Javeriana
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-[11px] text-[#e8e2d8]/70">contacto@zocayproject.org</span>
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
