-- ==============================================================================
-- POLÍTICAS DEFINITIVAS DE SEGURIDAD RLS (ROW LEVEL SECURITY) — ZOCAY PROJECT
-- ==============================================================================
-- Ejecuta este script en Supabase SQL Editor para máxima seguridad:
-- 1. Los visitantes anónimos solo pueden leer contenido publicado (sin acceso a borradores ni escritura).
-- 2. Únicamente la administración autenticada con email y password puede crear, editar o eliminar.
-- ==============================================================================

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 2. Limpiar políticas previas
DROP POLICY IF EXISTS "Permitir lectura publica de informes" ON public.articles;
DROP POLICY IF EXISTS "Permitir gestion total en informes" ON public.articles;
DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en informes" ON public.articles;
DROP POLICY IF EXISTS "Lectura publica de articulos publicados" ON public.articles;
DROP POLICY IF EXISTS "Lectura completa para administradores autenticados" ON public.articles;
DROP POLICY IF EXISTS "Gestion total de informes para autenticados" ON public.articles;

DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
DROP POLICY IF EXISTS "Permitir gestion total en productos" ON public.products;
DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en productos" ON public.products;
DROP POLICY IF EXISTS "Lectura publica de productos" ON public.products;
DROP POLICY IF EXISTS "Gestion de productos solo para autenticados" ON public.products;

DROP POLICY IF EXISTS "Permitir lectura publica de contenidos" ON public.site_content;
DROP POLICY IF EXISTS "Permitir gestion total en contenidos" ON public.site_content;
DROP POLICY IF EXISTS "Permitir gestion total a usuarios autenticados en contenidos" ON public.site_content;
DROP POLICY IF EXISTS "Lectura publica de contenidos del sitio" ON public.site_content;
DROP POLICY IF EXISTS "Gestion de contenidos solo para autenticados" ON public.site_content;

-- ------------------------------------------------------------------------------
-- 3. POLÍTICAS TABLA: articles
-- ------------------------------------------------------------------------------
-- Visitantes anónimos: Solo pueden leer artículos publicados (borradores protegidos)
CREATE POLICY "Lectura publica de articulos publicados"
  ON public.articles FOR SELECT
  TO anon
  USING (status = 'published');

-- Administradores autenticados: Lectura completa (publicados + borradores)
CREATE POLICY "Lectura completa para administradores autenticados"
  ON public.articles FOR SELECT
  TO authenticated
  USING (true);

-- Administradores autenticados: Inserción, Modificación y Eliminación
CREATE POLICY "Gestion total de informes para autenticados"
  ON public.articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. POLÍTICAS TABLA: products
-- ------------------------------------------------------------------------------
-- Lectura pública para la tienda
CREATE POLICY "Lectura publica de productos"
  ON public.products FOR SELECT
  TO public
  USING (true);

-- Gestión total exclusiva para administradores autenticados
CREATE POLICY "Gestion de productos solo para autenticados"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. POLÍTICAS TABLA: site_content
-- ------------------------------------------------------------------------------
-- Lectura pública para visualizar páginas
CREATE POLICY "Lectura publica de contenidos del sitio"
  ON public.site_content FOR SELECT
  TO public
  USING (true);

-- Modificación exclusiva para administradores autenticados
CREATE POLICY "Gestion de contenidos solo para autenticados"
  ON public.site_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
