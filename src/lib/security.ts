/**
 * Zocay Project — Módulo de Utilidades de Seguridad y Sanitización
 */

/**
 * Sanitiza URLs para prevenir inyecciones de código y ataques XSS
 * mediante esquemas maliciosos como javascript:, data: o vbscript:
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '#';
  const trimmed = url.trim();

  // Permitir únicamente protocolos seguros https://, http:// o mailto:
  const isSafeProtocol = /^(https?:\/\/|mailto:)/i.test(trimmed);
  if (!isSafeProtocol) {
    return '#';
  }

  // Prevenir caracteres de control o inyección de código
  if (/[\r\n\t<>"']/.test(trimmed)) {
    return '#';
  }

  return trimmed;
}

/**
 * Valida formato estándar de correo electrónico
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Sanitiza y recorta texto plano eliminando caracteres nulos o de control
 */
export function sanitizeText(text: string | undefined | null, maxLength = 2000): string {
  if (!text) return '';
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Normaliza y genera slugs seguros para URLs amigables
 */
export function generateSafeSlug(text: string): string {
  if (!text) return `item-${Date.now()}`;
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y tildes
    .replace(/[^a-z0-9]+/g, '-')     // Reemplazar caracteres no alfanuméricos por guion
    .replace(/(^-|-$)/g, '')         // Eliminar guiones al inicio y final
    .slice(0, 100);                  // Limitar longitud
}
