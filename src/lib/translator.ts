// Real-time automatic translation engine with multi-tier caching (Memory + LocalStorage)

const memoryCache = new Map<string, string>();
const CACHE_PREFIX = 'zocay_tr_';

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

export function getCachedTranslation(text: string, targetLang: string): string | null {
  if (!text || text.trim() === '') return text;
  const key = `${CACHE_PREFIX}${targetLang}_${simpleHash(text)}`;
  
  if (memoryCache.has(key)) {
    return memoryCache.get(key)!;
  }

  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      memoryCache.set(key, saved);
      return saved;
    }
  } catch {
    // Storage access might fail in private browsing
  }

  return null;
}

export function setCachedTranslation(text: string, targetLang: string, translation: string): void {
  if (!text || !translation) return;
  const key = `${CACHE_PREFIX}${targetLang}_${simpleHash(text)}`;
  memoryCache.set(key, translation);

  try {
    localStorage.setItem(key, translation);
  } catch {
    // Storage quota might be exceeded
  }
}

/**
 * Translates a single text segment from Spanish to English using MyMemory API.
 * Uses intelligent chunking and caching.
 */
export async function translateText(
  text: string, 
  from = 'es', 
  to = 'en'
): Promise<string> {
  if (!text || text.trim() === '' || from === to) return text;

  // Check cache first
  const cached = getCachedTranslation(text, to);
  if (cached) return cached;

  // If text is very long (contains paragraphs), translate paragraph by paragraph
  if (text.includes('\n\n')) {
    const paragraphs = text.split('\n\n');
    const translatedParagraphs = await Promise.all(
      paragraphs.map(p => translateText(p.trim(), from, to))
    );
    const result = translatedParagraphs.join('\n\n');
    setCachedTranslation(text, to, result);
    return result;
  }

  // If single chunk is under 400 chars, send directly
  try {
    const cleanText = text.trim();
    if (cleanText.length > 500) {
      // Split into sentences if a single block is too long
      const sentences = cleanText.match(/[^.!?]+[.!?]+(\s|$)/g) || [cleanText];
      const translatedSentences = await Promise.all(
        sentences.map(s => translateText(s.trim(), from, to))
      );
      const combined = translatedSentences.join(' ');
      setCachedTranslation(text, to, combined);
      return combined;
    }

    const encoded = encodeURIComponent(cleanText);
    const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${from}|${to}&de=contacto@zocayproject.org`;
    
    const response = await fetch(url);
    if (!response.ok) return text;

    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
      let translated = data.responseData.translatedText;
      // MyMemory sometimes capitalizes oddly or adds HTML entities
      translated = translated
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      setCachedTranslation(text, to, translated);
      return translated;
    }
  } catch (error) {
    // Network or parse failure: smoothly fallback to original text
    console.warn('[Translator] Fallback to original text:', error);
  }

  return text;
}
