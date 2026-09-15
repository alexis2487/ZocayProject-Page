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
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // 1. Initial Load: Load cached data from localStorage first
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.articles) setArticles(parsed.articles);
        if (parsed.products) setProducts(parsed.products);
        if (parsed.researchLines) setResearchLines(parsed.researchLines);
        if (parsed.metrics) setMetrics(parsed.metrics);
        if (parsed.donationTiers) setDonationTiers(parsed.donationTiers);
        if (parsed.director) setDirector(parsed.director);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.lastUpdated) setLastUpdated(parsed.lastUpdated);
      }
    } catch (e) {
      console.error('Error loading content from localStorage', e);
    }

    // 2. Then attempt to sync with Supabase if configured
    if (isSupabaseConfigured) {
      syncFromSupabase();
    }
  }, []);

  // Save current state snapshot to localStorage
  const persistLocally = (overrides: Partial<any> = {}) => {
    try {
      const now = new Date().toISOString();
      setLastUpdated(now);
      const snapshot = {
        articles,
        products,
        researchLines,
        metrics,
        donationTiers,
        director,
        timeline,
        lastUpdated: now,
        ...overrides,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  // Sync data from Supabase
  const syncFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setIsSyncing(true);
    try {
      // 1. Fetch articles
      const { data: dbArticles, error: artErr } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!artErr && dbArticles && dbArticles.length > 0) {
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
        setArticles(mappedArticles);
        persistLocally({ articles: mappedArticles });
      }

      // 2. Fetch products
      const { data: dbProducts, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (!prodErr && dbProducts && dbProducts.length > 0) {
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
        setProducts(mappedProducts);
        persistLocally({ products: mappedProducts });
      }

      // 3. Fetch site_content
      const { data: dbContent, error: contentErr } = await supabase
        .from('site_content')
        .select('*');

      if (!contentErr && dbContent) {
        dbContent.forEach((row: any) => {
          if (row.section_key === 'research_lines' && Array.isArray(row.data)) {
            setResearchLines(row.data);
          } else if (row.section_key === 'metrics' && Array.isArray(row.data)) {
            setMetrics(row.data);
          } else if (row.section_key === 'donation_tiers' && Array.isArray(row.data)) {
            setDonationTiers(row.data);
          } else if (row.section_key === 'director' && typeof row.data === 'object') {
            setDirector(row.data);
          } else if (row.section_key === 'timeline' && Array.isArray(row.data)) {
            setTimeline(row.data);
          }
        });
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
        articleData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 
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

      let newArticles: Article[];
      if (existingIndex >= 0) {
        newArticles = [...articles];
        newArticles[existingIndex] = { ...newArticles[existingIndex], ...updatedArticle };
      } else {
        newArticles = [updatedArticle, ...articles];
      }

      setArticles(newArticles);
      persistLocally({ articles: newArticles });

      // Save to Supabase if configured
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('articles').upsert({
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
        }, { onConflict: 'slug' });

        if (error) {
          console.warn('Supabase article upsert warning:', error.message);
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
        await supabase.from('articles').delete().eq('slug', target.slug);
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
        await supabase.from('products').upsert({
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
        await supabase.from('products').delete().eq('id', id);
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
      await supabase.from('site_content').upsert({
        section_key: 'metrics',
        data: newMetrics,
        updated_at: new Date().toISOString(),
      });
    }
    return { success: true };
  };

  const updateResearchLines = async (newLines: ResearchLine[]): Promise<{ success: boolean; error?: string }> => {
    setResearchLines(newLines);
    persistLocally({ researchLines: newLines });
    if (isSupabaseConfigured) {
      await supabase.from('site_content').upsert({
        section_key: 'research_lines',
        data: newLines,
        updated_at: new Date().toISOString(),
      });
    }
    return { success: true };
  };

  const updateDirector = async (newProfile: Partial<DirectorProfile>): Promise<{ success: boolean; error?: string }> => {
    const merged = { ...director, ...newProfile };
    setDirector(merged);
    persistLocally({ director: merged });
    if (isSupabaseConfigured) {
      await supabase.from('site_content').upsert({
        section_key: 'director',
        data: merged,
        updated_at: new Date().toISOString(),
      });
    }
    return { success: true };
  };

  const updateTimeline = async (newTimeline: TimelineEvent[]): Promise<{ success: boolean; error?: string }> => {
    setTimeline(newTimeline);
    persistLocally({ timeline: newTimeline });
    if (isSupabaseConfigured) {
      await supabase.from('site_content').upsert({
        section_key: 'timeline',
        data: newTimeline,
        updated_at: new Date().toISOString(),
      });
    }
    return { success: true };
  };

  const updateDonationTiers = async (newTiers: DonationTier[]): Promise<{ success: boolean; error?: string }> => {
    setDonationTiers(newTiers);
    persistLocally({ donationTiers: newTiers });
    if (isSupabaseConfigured) {
      await supabase.from('site_content').upsert({
        section_key: 'donation_tiers',
        data: newTiers,
        updated_at: new Date().toISOString(),
      });
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
