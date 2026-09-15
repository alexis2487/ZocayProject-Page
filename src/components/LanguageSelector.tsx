import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  className?: string;
}

const LANGUAGES: { code: Language; name: string; localName: string; flag: string }[] = [
  { code: 'es', name: 'Español', localName: 'Spanish', flag: '🇨🇴' },
  { code: 'en', name: 'English', localName: 'Inglés', flag: '🇺🇸' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Boxlist Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Cambiar idioma. Idioma actual: ${currentLang.name}`}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-[#0a120e]/80 hover:bg-[#0f1b15] hover:border-emerald-400/60 text-[#e8e2d8] text-xs font-mono uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-400 shadow-sm"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="font-semibold">{currentLang.code.toUpperCase()}</span>
        <ChevronDown 
          className={`w-3 h-3 text-[#e8e2d8]/60 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-400' : ''
          }`} 
        />
      </button>

      {/* Floating Boxlist Menu */}
      {isOpen && (
        <div 
          role="listbox"
          className="absolute right-0 mt-2 w-44 rounded-2xl border border-emerald-800/40 bg-[#09110d]/95 backdrop-blur-xl shadow-2xl py-1.5 z-50 animate-fadeIn divide-y divide-white/5"
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400/70">
            Idioma / Language
          </div>
          <div className="py-1">
            {LANGUAGES.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors duration-150 ${
                    isSelected
                      ? 'bg-emerald-950/60 text-emerald-300 font-medium'
                      : 'text-[#e8e2d8]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{item.flag}</span>
                    <div className="flex flex-col">
                      <span className="leading-none">{item.name}</span>
                      <span className="text-[10px] text-[#e8e2d8]/50 mt-0.5">{item.localName}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
