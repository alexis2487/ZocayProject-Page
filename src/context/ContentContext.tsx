import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  Article, 
  Product, 
  ResearchLine, 
  Metric, 
  DonationTier, 
  DirectorProfile, 
  TimelineEvent 
} from '../types/content';
import { projectData as defaultProjectData } from '../data/projectData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEFAULT_WOMPI_CHECKOUT_URL, DEFAULT_PAYPAL_URL } from '../data/paymentConfig';

// Initial default articles
const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'comportamiento-social-mono-zocay',
    title: 'Comportamiento social del mono zocay en parches fragmentados',
    date: '12 abr 2025',
    category: 'Comportamiento Animal',
    readTime: '6 min de lectura',
    author: 'Dra. Xyomara Carretero-Pinzón',
    excerpt: 'Observaciones focales sobre las rutinas de forrajeo matutino, duetos territoriales y la cohesión de parejas monógamas de Plecturocebus ornatus en remanentes boscosos de San Martín, Meta.',
    content: `El mono zocay (Plecturocebus ornatus) exhibe una estructura social basada en parejas monógamas con lazos de por vida. En este informe detallamos las observaciones cuantitativas realizadas durante 18 meses continuos en parches de bosque de galería en el municipio de San Martín, Meta.

Registramos patrones de acicalamiento mutuo, duetos vocales sincronizados al amanecer para demarcación territorial y el papel del macho reproductor en el transporte y cuidado de los infantes. El tamaño promedio del grupo familiar registrado oscila entre 3 y 5 individuos.

La cohesión del grupo se mantiene estrecha incluso en fragmentos menores a 5 hectáreas, donde la disponibilidad de árboles frutales nativos (como Ficus spp. y Cecropia) resulta determinante para evitar incursiones a ras de suelo en matrices ganaderas.`,
    status: 'published',
  },
  {
    id: '2',
    slug: 'cercas-vivas-autopistas-mono-zocay',
    title: 'Cercas vivas: autopistas en el dosel para el mono zocay',
    date: '03 mar 2025',
    category: 'Ecología del Paisaje',
    readTime: '8 min de lectura',
    author: 'Equipo Zocay Project',
    excerpt: 'Cómo las hileras de árboles nativos reducen el aislamiento genético entre parches de bosque y permiten el tránsito seguro de tropas familiares de mono zocay en paisajes ganaderos.',
    content: `Las cercas vivas son elementos tradicionales del paisaje agropecuario llanero que consisten en árboles sembrados a lo largo de linderos de potreros. Nuestro estudio evaluó más de 45 kilómetros lineales de cercas vivas en el departamento del Meta.

Los resultados demuestran que más del 70% de las tropas de mono zocay utilizan estas estructuras arbóreas como corredores biológicos para desplazarse entre fragmentos de bosque sin descender al pastizal abierto.

El enriquecimiento de estas cercas vivas con especies nativas como matarratón, yopo y guamo no solo proporciona continuidad física en el dosel superior, sino también fuentes complementarias de alimento y refugio térmico durante la estación seca.`,
    status: 'published',
  },
  {
    id: '3',
    slug: 'demografia-viabilidad-zocay-meta',
    title: 'Censos demográficos y viabilidad de tropas de mono zocay en el Meta',
    date: '18 feb 2025',
    category: 'Monitoreo Biológico',
    readTime: '7 min de lectura',
    author: 'Dra. Xyomara Carretero-Pinzón',
    excerpt: 'Análisis longitudinal de 20 años sobre las tasas de natalidad, supervivencia de infantes y densidad poblacional de Plecturocebus ornatus en fragmentos menores a 10 hectáreas.',
    content: `A través de más de dos décadas de censo sistemático en fragmentos aislados, hemos documentado la capacidad de resiliencia y los límites críticos de tamaño de parche para el mono zocay.

Los datos indican que las tropas familiares mantienen una tasa de natalidad estable de una cría por año por pareja reproductora. Sin embargo, en fragmentos aislados sin conectividad arbórea, los subadultos enfrentan barreras insuperables para dispersarse y fundar nuevos territorios, incrementando el riesgo de endogamia.

La conservación del mono zocay en paisajes dominados por el hombre requiere prioritariamente mantener corredores arbóreos funcionales que garanticen el flujo genético entre tropas.`,
    status: 'published',
  },
];

// Initial default products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'gorra-edicion-especial',
    name: 'Gorra Edición Especial Zocay',
    category: 'Indumentaria de Campo',
    priceCOP: '$ 75.000 COP',
    description: 'Gorra técnica de expedición en algodón y malla transpirable con el parche circular bordado oficial del Mono Zocay.',
    impact: 'Financia 2 horas de monitoreo y seguimiento demográfico en dosel.',
    image: '/images/products/gorra-zocay.png',
    inStock: true,
  },
  {
    id: 'camiseta-conservacion',
    name: 'Camiseta Oficial Conservación',
    category: 'Indumentaria',
    priceCOP: '$ 85.000 COP',
    description: 'Camiseta serigrafiada con tintas ecológicas que ilustra al Mono Zocay (Plecturocebus ornatus) y su hábitat de galería.',
    impact: 'Permite sembrar y georreferenciar 5 plántulas de árboles nativos para cercas vivas.',
    image: '/images/products/camisa-zocay.png',
    inStock: true,
  },
  {
    id: 'taza-expedicion',
    name: 'Taza de Expedición Zocay',
    category: 'Accesorios',
    priceCOP: '$ 45.000 COP',
    description: 'Taza esmaltada verde bosque para café de origen llanero, con el emblema Zocay grabada para campamentos y campo.',
    impact: 'Cubre insumos de bitácora y papelería científica para investigadores locales.',
    image: '/images/products/taza-zocay.png',
    inStock: true,
  },
];

// Initial default research lines
const INITIAL_RESEARCH_LINES: ResearchLine[] = [
  {
    code: 'LINEA-01',
    title: 'Demografía y Ecología Poblacional del Mono Zocay',
    description: 'Monitoreo longitudinal de tropas familiares de mono zocay (Plecturocebus ornatus). Estimación de densidad de grupos, tasas de natalidad, supervivencia de infantes y estructura de edad en fragmentos de bosque de galería en el Meta.',
  },
  {
    code: 'LINEA-02',
    title: 'Cercas Vivas como Corredores del Zocay',
    description: 'Evaluación cuantitativa del uso de linderos arbóreos por el mono zocay. Identificación de especies vegetales nativas de fructificación y diseño de parámetros de conectividad funcional para restaurar el tránsito del zocay entre parches aislados.',
  },
  {
    code: 'LINEA-03',
    title: 'Matrices Ganaderas y Conducta del Zocay',
    description: 'Análisis de la respuesta etológica del mono zocay frente a matrices agropecuarias (pasturas ganaderas y sabanas antrópicas). Identificación de barreras espaciales y umbrales críticos de tamaño de parche.',
  },
  {
    code: 'LINEA-04',
    title: 'Ordenamiento Territorial para la Conservación del Zocay',
    description: 'Traducción de datos biológicos de Plecturocebus ornatus en criterios técnicos para autoridades ambientales (Cormacarena), reservas de la sociedad civil y acuerdos de conservación con ganaderos locales.',
  },
];

// Initial default donation tiers
const INITIAL_DONATION_TIERS: DonationTier[] = [
  {
    amount: 50000,
    label: '$ 50.000 COP',
    usd: '~ $13 USD',
    impact: 'Financia el mantenimiento de una cámara trampa en dosel arbóreo durante un mes.',
  },
  {
    amount: 100000,
    label: '$ 100.000 COP',
    usd: '~ $25 USD',
    impact: 'Siembra y mantenimiento de 10 árboles nativos para enriquecer una cerca viva como corredor biológico.',
  },
  {
    amount: 250000,
    label: '$ 250.000 COP',
    usd: '~ $65 USD',
    impact: 'Cubre un día completo de censo y monitoreo biológico en fragmentos aislados por investigadoras locales.',
  },
  {
    amount: 500000,
    label: '$ 500.000 COP',
    usd: '~ $130 USD',
    impact: 'Beca de apoyo para tesis de pregrado de estudiantes de biología colombianos en el Meta.',
  },
];

const LOCAL_STORAGE_KEY = 'zocay_project_cms_v1';

interface ContentContextType {
  articles: Article[];
  products: Product[];
  researchLines: ResearchLine[];
  metrics: Metric[];
  donationTiers: DonationTier[];
  director: DirectorProfile;
  timeline: TimelineEvent[];
  wompiUrl: string;
  paypalUrl: string;
  isSyncing: boolean;
  lastUpdated: string | null;

  // Actions
  saveArticle: (article: Partial<Article>) => Promise<{ success: boolean; error?: string }>;
  deleteArticle: (slugOrId: string) => Promise<{ success: boolean; error?: string }>;
  saveProduct: (product: Partial<Product>) => Promise<{ success: boolean; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateMetrics: (metrics: Metric[]) => Promise<{ success: boolean; error?: string }>;
  updateResearchLines: (lines: ResearchLine[]) => Promise<{ success: boolean; error?: string }>;
  updateDirector: (director: Partial<DirectorProfile>) => Promise<{ success: boolean; error?: string }>;
  updateTimeline: (timeline: TimelineEvent[]) => Promise<{ success: boolean; error?: string }>;
  updateDonationTiers: (tiers: DonationTier[]) => Promise<{ success: boolean; error?: string }>;
  updateWompiUrl: (url: string) => Promise<{ success: boolean; error?: string }>;
  updatePaypalUrl: (url: string) => Promise<{ success: boolean; error?: string }>;
  syncFromSupabase: () => Promise<void>;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [researchLines, setResearchLines] = useState<ResearchLine[]>(INITIAL_RESEARCH_LINES);
  const [metrics, setMetrics] = useState<Metric[]>(defaultProjectData.metrics);
  const [donationTiers, setDonationTiers] = useState<DonationTier[]>(INITIAL_DONATION_TIERS);
  const [director, setDirector] = useState<DirectorProfile>(defaultProjectData.director);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(defaultProjectData.history.timeline);
  const [wompiUrl, setWompiUrl] = useState<string>(DEFAULT_WOMPI_CHECKOUT_URL);
  const [paypalUrl, setPaypalUrl] = useState<string>(DEFAULT_PAYPAL_URL);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // 1. Initial Load: Load cached data from localStorage immediately
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.articles && Array.isArray(parsed.articles) && parsed.articles.length > 0) {
          setArticles(parsed.articles);
        }
        if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          setProducts(parsed.products);
        }
        if (parsed.researchLines) setResearchLines(parsed.researchLines);
        if (parsed.metrics) setMetrics(parsed.metrics);
        if (parsed.donationTiers) setDonationTiers(parsed.donationTiers);
        if (parsed.director) setDirector(parsed.director);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.wompiUrl) setWompiUrl(parsed.wompiUrl);
        if (parsed.paypalUrl) setPaypalUrl(parsed.paypalUrl);
        if (parsed.lastUpdated) setLastUpdated(parsed.lastUpdated);
      }
    } catch (e) {
      console.error('Error loading content from localStorage', e);
    }

    // 2. Then sync with Supabase if configured
    if (isSupabaseConfigured) {
      syncFromSupabase();
    }
  }, []);

  // Save current state snapshot to localStorage safely
  const persistLocally = (overrides: Partial<any> = {}) => {
    try {
      const now = new Date().toISOString();
      setLastUpdated(now);

      let prevData: any = {};
      try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) prevData = JSON.parse(raw);
      } catch {
        // ignore
      }

      const snapshot = {
        articles,
        products,
        researchLines,
        metrics,
        donationTiers,
        director,
        timeline,
        wompiUrl,
        paypalUrl,
        ...prevData,
        ...overrides,
        lastUpdated: now,
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  // Smart Sync: Merges Supabase cloud data with local data so unsynced items are NEVER destroyed
  const syncFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setIsSyncing(true);
    try {
      // 1. Fetch articles from Supabase
      const { data: dbArticles, error: artErr } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!artErr && dbArticles) {
        const mappedArticles: Article[] = dbArticles.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          category: a.category,
          date: a.date,
          readTime: a.read_time || '5 min de lectura',
          author: a.author || 'Dra. Xyomara Carretero-Pinzón',
          excerpt: a.excerpt,
          content: a.content || '',
          image: a.image || '',
          status: a.status || 'published',
          createdAt: a.created_at,
          updatedAt: a.updated_at,
        }));

        // Retrieve current local articles from memory or localStorage
        let localSnapshot: Article[] = articles;
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.articles)) localSnapshot = parsed.articles;
          }
        } catch {
          // ignore
        }

        // Identify any local articles that aren't in Supabase yet
        const dbSlugs = new Set(mappedArticles.map(a => a.slug));
        const localOnlyArticles = localSnapshot.filter(la => !dbSlugs.has(la.slug));

        // Attempt to auto-sync local-only articles to Supabase
        for (const localArt of localOnlyArticles) {
          try {
            await supabase.from('articles').upsert({
              slug: localArt.slug,
              title: localArt.title,
              category: localArt.category,
              date: localArt.date,
              read_time: localArt.readTime,
              author: localArt.author,
              excerpt: localArt.excerpt,
              content: localArt.content,
              image: localArt.image,
              status: localArt.status,
              updated_at: new Date().toISOString(),
            }, { onConflict: 'slug' });
          } catch {
            // will retry on next sync
          }
        }

        // Merge DB articles with local-only articles (cloud items take precedence for existing slugs)
        const unifiedArticles = [...mappedArticles, ...localOnlyArticles];
        setArticles(unifiedArticles);
        persistLocally({ articles: unifiedArticles });
      }

      // 2. Fetch products from Supabase
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (!prodErr && dbProducts) {
        const mappedProducts: Product[] = dbProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          priceCOP: p.price_cop,
          description: p.description,
          impact: p.impact,
          image: p.image,
          inStock: p.in_stock,
        }));

        let localProductsSnapshot: Product[] = products;
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.products)) localProductsSnapshot = parsed.products;
          }
        } catch {
          // ignore
        }

        const dbProductIds = new Set(mappedProducts.map(p => p.id));
        const localOnlyProducts = localProductsSnapshot.filter(lp => !dbProductIds.has(lp.id));

        for (const localProd of localOnlyProducts) {
          try {
            await supabase.from('products').upsert({
              id: localProd.id,
              name: localProd.name,
              category: localProd.category,
              price_cop: localProd.priceCOP,
              description: localProd.description,
              impact: localProd.impact,
              image: localProd.image,
              in_stock: localProd.inStock,
              updated_at: new Date().toISOString(),
            });
          } catch {
            // ignore
          }
        }

        const unifiedProducts = [...mappedProducts, ...localOnlyProducts];
        setProducts(unifiedProducts);
        persistLocally({ products: unifiedProducts });
      }

      // 3. Fetch site_content
      const { data: dbContent, error: contentErr } = await supabase
        .from('site_content')
        .select('*');

      if (!contentErr && dbContent && dbContent.length > 0) {
        const contentUpdates: Partial<any> = {};

        dbContent.forEach((row: any) => {
          if (row.section_key === 'research_lines' && Array.isArray(row.data)) {
            setResearchLines(row.data);
            contentUpdates.researchLines = row.data;
          } else if (row.section_key === 'metrics' && Array.isArray(row.data)) {
            setMetrics(row.data);
            contentUpdates.metrics = row.data;
          } else if (row.section_key === 'donation_tiers' && Array.isArray(row.data)) {
            setDonationTiers(row.data);
            contentUpdates.donationTiers = row.data;
          } else if (row.section_key === 'director' && typeof row.data === 'object') {
            setDirector(row.data);
            contentUpdates.director = row.data;
          } else if (row.section_key === 'timeline' && Array.isArray(row.data)) {
            setTimeline(row.data);
            contentUpdates.timeline = row.data;
          }
        });

        persistLocally(contentUpdates);
      }
    } catch (err) {
      console.warn('Supabase sync skipped or errored:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Article CRUD
  const saveArticle = async (articleData: Partial<Article>): Promise<{ success: boolean; error?: string }> => {
    try {
      const now = new Date();
      const slug = articleData.slug?.trim() || 
        articleData.title?.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || 
        `informe-${Date.now()}`;

      const existingIndex = articles.findIndex(a => a.slug === slug || (articleData.id && a.id === articleData.id));

      const updatedArticle: Article = {
        id: articleData.id || `art_${Date.now()}`,
        slug,
        title: articleData.title || 'Nuevo Informe',
        category: articleData.category || 'Monitoreo Biológico',
        date: articleData.date || `${now.getDate()} ${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][now.getMonth()]} ${now.getFullYear()}`,
        readTime: articleData.readTime || '5 min de lectura',
        author: articleData.author || 'Dra. Xyomara Carretero-Pinzón',
        excerpt: articleData.excerpt || '',
        content: articleData.content || '',
        image: articleData.image || '',
        status: articleData.status || 'published',
        updatedAt: now.toISOString(),
      };

      // 1. Optimistic Local State Update
      let newArticles: Article[];
      if (existingIndex >= 0) {
        newArticles = [...articles];
        newArticles[existingIndex] = { ...newArticles[existingIndex], ...updatedArticle };
      } else {
        newArticles = [updatedArticle, ...articles];
      }

      setArticles(newArticles);
      persistLocally({ articles: newArticles });

      // 2. Persist to Supabase Cloud if configured
      if (isSupabaseConfigured) {
        const payload: Record<string, any> = {
          slug: updatedArticle.slug,
          title: updatedArticle.title,
          category: updatedArticle.category,
          date: updatedArticle.date,
          read_time: updatedArticle.readTime,
          author: updatedArticle.author,
          excerpt: updatedArticle.excerpt,
          content: updatedArticle.content,
          image: updatedArticle.image,
          status: updatedArticle.status,
          updated_at: new Date().toISOString(),
        };

        // Only include ID if it is a valid UUID, otherwise allow Postgres to auto-generate
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updatedArticle.id || '');
        if (isUUID && updatedArticle.id) {
          payload.id = updatedArticle.id;
        }

        const { data, error } = await supabase
          .from('articles')
          .upsert(payload, { onConflict: 'slug' })
          .select();

        if (error) {
          console.error('Supabase article upsert error:', error);
          let errorMsg = error.message;
          if (error.code === '42501' || errorMsg.toLowerCase().includes('row-level security') || errorMsg.toLowerCase().includes('policy')) {
            errorMsg = 'Escritura bloqueada por política RLS en Supabase. Ejecuta el script "fix_rls_policies.sql" en Supabase SQL Editor para permitir guardar.';
          }
          return { success: false, error: errorMsg };
        }

        if (data && data[0] && data[0].id) {
          updatedArticle.id = data[0].id;
          const syncedArticles = newArticles.map(a => a.slug === updatedArticle.slug ? { ...a, id: data[0].id } : a);
          setArticles(syncedArticles);
          persistLocally({ articles: syncedArticles });
        }
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar informe.' };
    }
  };

  const deleteArticle = async (slugOrId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const target = articles.find(a => a.slug === slugOrId || a.id === slugOrId);
      const newArticles = articles.filter(a => a.slug !== slugOrId && a.id !== slugOrId);
      setArticles(newArticles);
      persistLocally({ articles: newArticles });

      if (isSupabaseConfigured && target) {
        const { error } = await supabase.from('articles').delete().eq('slug', target.slug);
        if (error) {
          console.error('Supabase article delete error:', error);
          let msg = error.message;
          if (error.code === '42501') {
            msg = 'Eliminación bloqueada por política RLS de Supabase. Ejecuta fix_rls_policies.sql en Supabase.';
          }
          return { success: false, error: msg };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al eliminar informe.' };
    }
  };

  // Product CRUD
  const saveProduct = async (productData: Partial<Product>): Promise<{ success: boolean; error?: string }> => {
    try {
      const id = productData.id || `prod_${Date.now()}`;
      const existingIndex = products.findIndex(p => p.id === id);

      const updatedProduct: Product = {
        id,
        name: productData.name || 'Nuevo Producto',
        category: productData.category || 'Indumentaria',
        priceCOP: productData.priceCOP || '$ 50.000 COP',
        description: productData.description || '',
        impact: productData.impact || '',
        image: productData.image || '/images/products/gorra-zocay.png',
        inStock: productData.inStock !== false,
      };

      let newProducts: Product[];
      if (existingIndex >= 0) {
        newProducts = [...products];
        newProducts[existingIndex] = { ...newProducts[existingIndex], ...updatedProduct };
      } else {
        newProducts = [...products, updatedProduct];
      }

      setProducts(newProducts);
      persistLocally({ products: newProducts });

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('products').upsert({
          id: updatedProduct.id,
          name: updatedProduct.name,
          category: updatedProduct.category,
          price_cop: updatedProduct.priceCOP,
          description: updatedProduct.description,
          impact: updatedProduct.impact,
          image: updatedProduct.image,
          in_stock: updatedProduct.inStock,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Supabase product upsert error:', error);
          let msg = error.message;
          if (error.code === '42501') {
            msg = 'Bloqueado por RLS en Supabase. Ejecuta fix_rls_policies.sql en Supabase.';
          }
          return { success: false, error: msg };
        }
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al guardar producto.' };
    }
  };

  const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
      persistLocally({ products: newProducts });

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          console.error('Supabase product delete error:', error);
          return { success: false, error: error.message };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al eliminar producto.' };
    }
  };

  // Section Updates
  const updateMetrics = async (newMetrics: Metric[]): Promise<{ success: boolean; error?: string }> => {
    setMetrics(newMetrics);
    persistLocally({ metrics: newMetrics });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'metrics',
        data: newMetrics,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updateResearchLines = async (newLines: ResearchLine[]): Promise<{ success: boolean; error?: string }> => {
    setResearchLines(newLines);
    persistLocally({ researchLines: newLines });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'research_lines',
        data: newLines,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updateDirector = async (newProfile: Partial<DirectorProfile>): Promise<{ success: boolean; error?: string }> => {
    const merged = { ...director, ...newProfile };
    setDirector(merged);
    persistLocally({ director: merged });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'director',
        data: merged,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updateTimeline = async (newTimeline: TimelineEvent[]): Promise<{ success: boolean; error?: string }> => {
    setTimeline(newTimeline);
    persistLocally({ timeline: newTimeline });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'timeline',
        data: newTimeline,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updateDonationTiers = async (newTiers: DonationTier[]): Promise<{ success: boolean; error?: string }> => {
    setDonationTiers(newTiers);
    persistLocally({ donationTiers: newTiers });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'donation_tiers',
        data: newTiers,
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updateWompiUrl = async (newUrl: string): Promise<{ success: boolean; error?: string }> => {
    const clean = newUrl.trim() || DEFAULT_WOMPI_CHECKOUT_URL;
    setWompiUrl(clean);
    persistLocally({ wompiUrl: clean });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'payment_settings',
        data: { wompiUrl: clean, paypalUrl },
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const updatePaypalUrl = async (newUrl: string): Promise<{ success: boolean; error?: string }> => {
    const clean = newUrl.trim() || DEFAULT_PAYPAL_URL;
    setPaypalUrl(clean);
    persistLocally({ paypalUrl: clean });
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('site_content').upsert({
        section_key: 'payment_settings',
        data: { wompiUrl, paypalUrl: clean },
        updated_at: new Date().toISOString(),
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const resetToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    setProducts(INITIAL_PRODUCTS);
    setResearchLines(INITIAL_RESEARCH_LINES);
    setMetrics(defaultProjectData.metrics);
    setDonationTiers(INITIAL_DONATION_TIERS);
    setDirector(defaultProjectData.director);
    setTimeline(defaultProjectData.history.timeline);
    setWompiUrl(DEFAULT_WOMPI_CHECKOUT_URL);
    setPaypalUrl(DEFAULT_PAYPAL_URL);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setLastUpdated(new Date().toISOString());
  };

  return (
    <ContentContext.Provider
      value={{
        articles,
        products,
        researchLines,
        metrics,
        donationTiers,
        director,
        timeline,
        wompiUrl,
        paypalUrl,
        isSyncing,
        lastUpdated,
        saveArticle,
        deleteArticle,
        saveProduct,
        deleteProduct,
        updateMetrics,
        updateResearchLines,
        updateDirector,
        updateTimeline,
        updateDonationTiers,
        updateWompiUrl,
        updatePaypalUrl,
        syncFromSupabase,
        resetToDefaults,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
