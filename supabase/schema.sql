-- ==============================================================================
-- SCHEMA SQL PARA ZOCAY PROJECT — BASE DE DATOS SUPABASE
-- Ejecuta este script en el editor SQL de Supabase (SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. TABLA: INFORMES CIENTÍFICOS Y PUBLICACIONES DEL MONO ZOCAY (BLOG)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min de lectura',
  author TEXT DEFAULT 'Dra. Xyomara Carretero-Pinzón',
  excerpt TEXT NOT NULL,
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA: PRODUCTOS DE LA TIENDA CON CAUSA
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cop TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  image TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA: CONTENIDOS DINÁMICOS DE LAS PÁGINAS (INVESTIGACIÓN, PROYECTO, TERRITORIO)
CREATE TABLE IF NOT EXISTS public.site_content (
  section_key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. POLÍTICAS DE SEGURIDAD ROW LEVEL SECURITY (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 4.1. Lectura pública para cualquier visitante de la web (anon y authenticated)
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

-- 4.2. Gestión total (INSERT, UPDATE, DELETE) para administración (anon y authenticated)
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

-- 5. SEMILLA DE DATOS INICIALES (SEED DATA)
-- Informes iniciales
INSERT INTO public.articles (slug, title, category, date, read_time, author, excerpt, content, status)
VALUES
  (
    'comportamiento-social-mono-zocay',
    'Comportamiento social del mono zocay en parches fragmentados',
    'Comportamiento Animal',
    '12 abr 2025',
    '6 min de lectura',
    'Dra. Xyomara Carretero-Pinzón',
    'Observaciones focales sobre las rutinas de forrajeo matutino, duetos territoriales y la cohesión de parejas monógamas de Plecturocebus ornatus en remanentes boscosos de San Martín, Meta.',
    'El mono zocay (Plecturocebus ornatus) exhibe una estructura social basada en parejas monógamas con lazos de por vida. En este informe detallamos las observaciones cuantitativas realizadas durante 18 meses continuos en parches de bosque de galería en el municipio de San Martín, Meta. Registramos patrones de acicalamiento mutuo, duetos vocales sincronizados al amanecer para demarcación territorial y el papel del macho reproductor en el transporte y cuidado de los infantes.',
    'published'
  ),
  (
    'cercas-vivas-autopistas-mono-zocay',
    'Cercas vivas: autopistas en el dosel para el mono zocay',
    'Ecología del Paisaje',
    '03 mar 2025',
    '8 min de lectura',
    'Equipo Zocay Project',
    'Cómo las hileras de árboles nativos reducen el aislamiento genético entre parches de bosque y permiten el tránsito seguro de tropas familiares de mono zocay en paisajes ganaderos.',
    'Las cercas vivas son elementos tradicionales del paisaje agropecuario llanero que consisten en árboles sembrados a lo largo de linderos de potreros. Nuestro estudio evaluó más de 45 kilómetros lineales de cercas vivas en el departamento del Meta, comprobando que más del 70% de las tropas de mono zocay utilizan estas estructuras arbóreas como corredores biológicos para desplazarse entre fragmentos de bosque sin bajar al suelo.',
    'published'
  ),
  (
    'demografia-viabilidad-zocay-meta',
    'Censos demográficos y viabilidad de tropas de mono zocay en el Meta',
    'Monitoreo Biológico',
    '18 feb 2025',
    '7 min de lectura',
    'Dra. Xyomara Carretero-Pinzón',
    'Análisis longitudinal de 20 años sobre las tasas de natalidad, supervivencia de infantes y densidad poblacional de Plecturocebus ornatus en fragmentos menores a 10 hectáreas.',
    'A través de más de dos décadas de censo sistemático en fragmentos aislados, hemos documentado la capacidad de resiliencia y los límites críticos de tamaño de parche para el mono zocay. Los datos muestran que fragmentos menores a 5 hectáreas presentan riesgo de empobrecimiento genético a menos que se encuentren conectados funcionalmente mediante corredores de cercas vivas con parches mayores.',
    'published'
  )
ON CONFLICT (slug) DO NOTHING;

-- Productos iniciales
INSERT INTO public.products (id, name, category, price_cop, description, impact, image, in_stock)
VALUES
  (
    'gorra-edicion-especial',
    'Gorra Edición Especial Zocay',
    'Indumentaria de Campo',
    '$ 75.000 COP',
    'Gorra técnica de expedición en algodón y malla transpirable con el parche circular bordado oficial del Mono Zocay.',
    'Financia 2 horas de monitoreo y seguimiento demográfico en dosel.',
    '/images/products/gorra-zocay.png',
    true
  ),
  (
    'camiseta-conservacion',
    'Camiseta Oficial Conservación',
    'Indumentaria',
    '$ 85.000 COP',
    'Camiseta serigrafiada con tintas ecológicas que ilustra al Mono Zocay (Plecturocebus ornatus) y su hábitat de galería.',
    'Permite sembrar y georreferenciar 5 plántulas de árboles nativos para cercas vivas.',
    '/images/products/camisa-zocay.png',
    true
  ),
  (
    'taza-expedicion',
    'Taza de Expedición Zocay',
    'Accesorios',
    '$ 45.000 COP',
    'Taza esmaltada verde bosque para café de origen llanero, con el emblema Zocay grabada para campamentos y campo.',
    'Cubre insumos de bitácora y papelería científica para investigadores locales.',
    '/images/products/taza-zocay.png',
    true
  )
ON CONFLICT (id) DO NOTHING;
