-- ==============================================================================
-- CORRECCIÓN INMEDIATA DE POLÍTICAS RLS EN SUPABASE PARA ZOCAY PROJECT
-- ==============================================================================
-- Copia este código, ve a tu panel de Supabase:
-- SQL Editor -> New Query -> Pega esto y haz clic en "RUN"
-- ==============================================================================

-- 1. HABILITAR RLS EN TODAS LAS TABLAS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 2. POLÍTICAS DE LECTURA PÚBLICA (Para visitantes de la web)
DROP POLICY IF EXISTS "Permitir lectura publica de informes" ON public.articles;
CREATE POLICY "Permitir lectura publica de informes"
  ON public.articles FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos"
  ON public.products FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de contenidos" ON public.site_content;
CREATE POLICY "Permitir lectura publica de contenidos"
  ON public.site_content FOR SELECT
  TO public
  USING (true);

-- 3. POLÍTICAS DE GESTIÓN TOTAL (INSERT, UPDATE, DELETE) PARA CMS
-- Permite que el CMS cree, actualice y elimine informes, productos y contenidos sin bloqueos
DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en informes" ON public.articles;
DROP POLICY IF EXISTS "Permitir gestion total en informes" ON public.articles;
CREATE POLICY "Permitir gestion total en informes"
  ON public.articles FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en productos" ON public.products;
DROP POLICY IF EXISTS "Permitir gestion total en productos" ON public.products;
CREATE POLICY "Permitir gestion total en productos"
  ON public.products FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en contenidos" ON public.site_content;
DROP POLICY IF EXISTS "Permitir gestion total en contenidos" ON public.site_content;
CREATE POLICY "Permitir gestion total en contenidos"
  ON public.site_content FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
