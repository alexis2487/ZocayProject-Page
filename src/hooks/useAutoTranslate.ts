import { useState, useEffect } from 'react';
import { Article, Product, TimelineEvent } from '../types/content';
import { Language } from '../i18n/translations';
import { translateText, getCachedTranslation } from '../lib/translator';

/**
 * Automatically translates a list of articles in real-time when target language is English.
 * Uses cached values instantly, and fetches missing translations in the background.
 */
export function useTranslatedArticles(articles: Article[], language: Language): Article[] {
  const [translatedArticles, setTranslatedArticles] = useState<Article[]>(articles);

  useEffect(() => {
    if (language === 'es') {
      setTranslatedArticles(articles);
      return;
    }

    let isMounted = true;

    // Check immediate cache first for instant 0ms rendering
    const immediate = articles.map((art) => ({
      ...art,
      title: getCachedTranslation(art.title, 'en') || art.title,
      excerpt: getCachedTranslation(art.excerpt, 'en') || art.excerpt,
      content: getCachedTranslation(art.content || '', 'en') || art.content,
      category: getCachedTranslation(art.category, 'en') || art.category,
    }));
    setTranslatedArticles(immediate);

    // Asynchronously translate any missing fields
    const translateAll = async () => {
      const updated = await Promise.all(
        articles.map(async (art) => {
          const [title, excerpt, content, category] = await Promise.all([
            translateText(art.title, 'es', 'en'),
            translateText(art.excerpt, 'es', 'en'),
            art.content ? translateText(art.content, 'es', 'en') : Promise.resolve(''),
            translateText(art.category, 'es', 'en'),
          ]);

          return {
            ...art,
            title,
            excerpt,
            content,
            category,
          };
        })
      );

      if (isMounted) {
        setTranslatedArticles(updated);
      }
    };

    translateAll();

    return () => {
      isMounted = false;
    };
  }, [articles, language]);

  return translatedArticles;
}

/**
 * Automatically translates a list of products in real-time when target language is English.
 */
export function useTranslatedProducts(products: Product[], language: Language): Product[] {
  const [translatedProducts, setTranslatedProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (language === 'es') {
      setTranslatedProducts(products);
      return;
    }

    let isMounted = true;

    // Check immediate cache first
    const immediate = products.map((p) => ({
      ...p,
      name: getCachedTranslation(p.name, 'en') || p.name,
      description: getCachedTranslation(p.description, 'en') || p.description,
      impact: getCachedTranslation(p.impact, 'en') || p.impact,
      category: getCachedTranslation(p.category, 'en') || p.category,
    }));
    setTranslatedProducts(immediate);

    const translateAll = async () => {
      const updated = await Promise.all(
        products.map(async (p) => {
          const [name, description, impact, category] = await Promise.all([
            translateText(p.name, 'es', 'en'),
            translateText(p.description, 'es', 'en'),
            translateText(p.impact, 'es', 'en'),
            translateText(p.category, 'es', 'en'),
          ]);

          return {
            ...p,
            name,
            description,
            impact,
            category,
          };
        })
      );

      if (isMounted) {
        setTranslatedProducts(updated);
      }
    };

    translateAll();

    return () => {
      isMounted = false;
    };
  }, [products, language]);

  return translatedProducts;
}

/**
 * Automatically translates timeline events in real-time when target language is English.
 */
export function useTranslatedTimeline(events: TimelineEvent[], language: Language): TimelineEvent[] {
  const [translatedTimeline, setTranslatedTimeline] = useState<TimelineEvent[]>(events);

  useEffect(() => {
    if (language === 'es') {
      setTranslatedTimeline(events);
      return;
    }

    let isMounted = true;

    // Check immediate cache
    const immediate = events.map((ev) => ({
      ...ev,
      title: getCachedTranslation(ev.title, 'en') || ev.title,
      description: getCachedTranslation(ev.description, 'en') || ev.description,
    }));
    setTranslatedTimeline(immediate);

    const translateAll = async () => {
      const updated = await Promise.all(
        events.map(async (ev) => {
          const [title, description] = await Promise.all([
            translateText(ev.title, 'es', 'en'),
            translateText(ev.description, 'es', 'en'),
          ]);

          return {
            ...ev,
            title,
            description,
          };
        })
      );

      if (isMounted) {
        setTranslatedTimeline(updated);
      }
    };

    translateAll();

    return () => {
      isMounted = false;
    };
  }, [events, language]);

  return translatedTimeline;
}
