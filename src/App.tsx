import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ElProyectoPage } from './pages/ElProyectoPage';
import { InvestigacionPage } from './pages/InvestigacionPage';
import { TiendaPage } from './pages/TiendaPage';
import { DonacionesPage } from './pages/DonacionesPage';
import { BlogPage } from './pages/BlogPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#060a08] text-[#e8e2d8] selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/el-proyecto" element={<ElProyectoPage />} />
            <Route path="/investigacion" element={<InvestigacionPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/donaciones" element={<DonacionesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
