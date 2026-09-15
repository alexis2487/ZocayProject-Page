import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider } from './context/LanguageContext';

// Public Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ElProyectoPage } from './pages/ElProyectoPage';
import { InvestigacionPage } from './pages/InvestigacionPage';
import { TiendaPage } from './pages/TiendaPage';
import { DonacionesPage } from './pages/DonacionesPage';
import { BlogPage } from './pages/BlogPage';

// Admin CMS Components & Pages
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminReportsPage } from './admin/AdminReportsPage';
import { AdminProductsPage } from './admin/AdminProductsPage';
import { AdminResearchPage } from './admin/AdminResearchPage';
import { AdminProjectPage } from './admin/AdminProjectPage';
import { AdminDonationsPage } from './admin/AdminDonationsPage';
import { AdminSettingsPage } from './admin/AdminSettingsPage';

// Public Layout with brand Navbar and Footer
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#060a08] text-[#e8e2d8] selection:bg-emerald-500/30 selection:text-emerald-200">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <LanguageProvider>
          <Router>
          <Routes>
            {/* Admin CMS Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin CMS Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/informes"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminReportsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tienda"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminProductsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/investigacion"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminResearchPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/el-proyecto"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminProjectPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/donaciones"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDonationsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/configuracion"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminSettingsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Public Visitor Pages */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/el-proyecto"
              element={
                <PublicLayout>
                  <ElProyectoPage />
                </PublicLayout>
              }
            />
            <Route
              path="/investigacion"
              element={
                <PublicLayout>
                  <InvestigacionPage />
                </PublicLayout>
              }
            />
            <Route
              path="/tienda"
              element={
                <PublicLayout>
                  <TiendaPage />
                </PublicLayout>
              }
            />
            <Route
              path="/donaciones"
              element={
                <PublicLayout>
                  <DonacionesPage />
                </PublicLayout>
              }
            />
            <Route
              path="/blog"
              element={
                <PublicLayout>
                  <BlogPage />
                </PublicLayout>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        </LanguageProvider>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;
