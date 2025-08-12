/**
 * Utility functions for Chyron components
 */

/**
 * Validates headline data
 */
export function validateHeadlines(headlines: unknown): string[] {
  if (!Array.isArray(headlines)) {
    console.warn('Chyron: headlines must be an array');
    return [];
  }

  if (headlines.length === 0) {
    console.warn('Chyron: headlines array is empty');
    return [];
  }

  const validHeadlines = headlines.filter((headline) => {
    if (typeof headline !== 'string') {
      console.warn('Chyron: headline must be a string', headline);
      return false;
    }
    if (headline.trim().length === 0) {
      console.warn('Chyron: headline cannot be empty');
      return false;
    }
    return true;
  });

  return validHeadlines;
}

/**
 * Validates logo configuration
 */
export function validateLogoConfig(config: {
  logoSize?: unknown;
  logoUrl?: unknown;
  logoAlt?: unknown;
}) {
  const errors: string[] = [];

  if (config.logoSize !== undefined) {
    if (typeof config.logoSize !== 'number' || config.logoSize <= 0) {
      errors.push('logoSize must be a positive number');
    }
  }

  if (config.logoUrl !== undefined) {
    if (typeof config.logoUrl !== 'string' || config.logoUrl.trim().length === 0) {
      errors.push('logoUrl must be a non-empty string');
    }
  }

  if (config.logoAlt !== undefined) {
    if (typeof config.logoAlt !== 'string') {
      errors.push('logoAlt must be a string');
    }
  }

  return errors;
}

/**
 * Sanitizes HTML content to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a unique ID for components
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Formats date/time for display
 */
export function formatDateTime(date: Date, format: 'date' | 'time' | 'weekday' | 'full'): string {
  switch (format) {
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    case 'weekday':
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    case 'full':
      return date.toLocaleString();
    default:
      return date.toLocaleString();
  }
}
