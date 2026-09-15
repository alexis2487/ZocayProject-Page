import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Investigación', path: '/investigacion' },
    { label: 'El Proyecto', path: '/el-proyecto' },
    { label: 'Tienda / Donaciones', path: '/tienda' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#060a08]/85 backdrop-blur-md border-b border-emerald-950/40 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#060a08]/80 via-[#060a08]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Ir al inicio de Zocay Project"
          >
            <div className="w-10 h-10 rounded-full border border-emerald-500/40 bg-[#0d1512] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:border-emerald-400 group-hover:scale-105">
              <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
                <path d="M12 6c-3 0-5 2-5 5 0 2 1 3 2 4-1 2-1 3 0 4 1 1 3 1 4-1 1-1 2-3 2-5 2 0 3-2 3-5 0-4-3-6-6-6z" fill="currentColor" opacity="0.85"/>
                <circle cx="10" cy="10" r="1" fill="#060a08"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-sm md:text-base font-medium text-[#e8e2d8] group-hover:text-emerald-300 transition-colors uppercase">
                Mono Zocay
              </span>
              <span className="text-[10px] tracking-[0.25em] text-emerald-400/80 uppercase font-sans font-light">
                Meta · Colombia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1 font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-200 ${
                    isActive
                      ? 'text-emerald-400 font-medium'
                      : 'text-[#e8e2d8]/75 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/donaciones"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium text-emerald-300 border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-500 hover:text-emerald-950 transition-all duration-300 group"
            >
              <span>Donar</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#e8e2d8] hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#060a08]/98 backdrop-blur-xl flex flex-col pt-24 px-6 sm:px-8 pb-8 overflow-y-auto lg:hidden">
          <div className="flex items-center gap-2 text-emerald-400 text-xs tracking-widest uppercase mb-6 pb-2 border-b border-emerald-900/30 shrink-0">
            <Compass className="w-4 h-4" />
            <span>Navegación del Proyecto</span>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xl font-serif text-[#e8e2d8] hover:text-emerald-400 transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-emerald-500/50">0{idx + 1}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-emerald-900/40 flex flex-col gap-4">
            <Link
              to="/donaciones"
              className="w-full text-center py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
            >
              Apoyar / Donar
            </Link>
            <div className="text-center text-[11px] text-[#e8e2d8]/50 tracking-wider">
              Zocay Project · Conservación y Ciencia en el Meta, Colombia
            </div>
          </div>
        </div>
      )}
    </>
  );
};
