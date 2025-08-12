/**
 * Internationalization system for Chyron components
 */

export interface Locale {
  code: string;
  name: string;
  nativeName: string;
  dateFormat: Intl.DateTimeFormatOptions;
  timeFormat: Intl.DateTimeFormatOptions;
  numberFormat: Intl.NumberFormatOptions;
}

export interface Translations {
  [key: string]: {
    [locale: string]: string;
  };
}

export const supportedLocales: Record<string, Locale> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    },
    numberFormat: {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
};

export const translations: Translations = {
  'breaking.news': {
    en: 'BREAKING NEWS',
    es: 'ÚLTIMAS NOTICIAS',
    fr: 'DERNIÈRES NOUVELLES',
    de: 'AKTUELLE NACHRICHTEN',
    ja: '速報',
    zh: '突发新闻',
    ar: 'أخبار عاجلة',
  },
  'paused': {
    en: 'Paused',
    es: 'Pausado',
    fr: 'En pause',
    de: 'Pausiert',
    ja: '一時停止',
    zh: '已暂停',
    ar: 'متوقف مؤقتاً',
  },
  'theme': {
    en: 'Theme',
    es: 'Tema',
    fr: 'Thème',
    de: 'Thema',
    ja: 'テーマ',
    zh: '主题',
    ar: 'المظهر',
  },
  'headlines.count': {
    en: 'News ticker with {count} headlines',
    es: 'Ticker de noticias con {count} titulares',
    fr: 'Ticker d\'actualités avec {count} titres',
    de: 'Nachrichtenticker mit {count} Schlagzeilen',
    ja: '{count}件の見出しがあるニュースティッカー',
    zh: '包含{count}条标题的新闻滚动条',
    ar: 'شريط أخبار يحتوي على {count} عناوين',
  },
  'accessibility.pause': {
    en: 'Press Space or Enter to pause/resume',
    es: 'Presiona Espacio o Enter para pausar/reanudar',
    fr: 'Appuyez sur Espace ou Entrée pour mettre en pause/reprendre',
    de: 'Drücken Sie Leertaste oder Eingabe zum Pausieren/Fortsetzen',
    ja: 'スペースまたはエンターキーを押して一時停止/再開',
    zh: '按空格键或回车键暂停/恢复',
    ar: 'اضغط على المسافة أو Enter للإيقاف المؤقت/الاستئناف',
  },
};

class I18nManager {
  private currentLocale: string = 'en';
  private fallbackLocale: string = 'en';

  /**
   * Checks if code is running in a browser environment with localStorage support
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  constructor() {
    this.currentLocale = this.detectLocale();
  }

  /**
   * Detects the user's preferred locale
   */
  private detectLocale(): string {
    // Check localStorage first, only in browser
    if (this.isBrowser()) {
      const savedLocale = localStorage.getItem('chyron-locale');
      if (savedLocale && supportedLocales[savedLocale]) {
        return savedLocale;
      }
    }

    // Check browser language
    const browserLocale = navigator.language.split('-')[0];
    if (supportedLocales[browserLocale]) {
      return browserLocale;
    }

    // Fallback to English
    return this.fallbackLocale;
  }

  /**
   * Sets the current locale
   */
  setLocale(locale: string): void {
    if (!supportedLocales[locale]) {
      console.warn(`Locale "${locale}" is not supported`);
      return;
    }

    this.currentLocale = locale;
    if (this.isBrowser()) {
      localStorage.setItem('chyron-locale', locale);
    }
    
    // Update document direction for RTL languages
    if (locale === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  /**
   * Gets the current locale
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * Gets the current locale object
   */
  getCurrentLocale(): Locale {
    return supportedLocales[this.currentLocale];
  }

  /**
   * Translates a key
   */
  t(key: string, params: Record<string, string | number> = {}): string {
    const translation = translations[key]?.[this.currentLocale] || 
                       translations[key]?.[this.fallbackLocale] || 
                       key;

    // Replace parameters
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return String(params[param] || match);
    });
  }

  /**
   * Formats a date according to the current locale
   */
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const locale = this.getCurrentLocale();
    const formatOptions = { ...locale.dateFormat, ...options };
    
    return new Intl.DateTimeFormat(this.currentLocale, formatOptions).format(date);
  }

  /**
   * Formats time according to the current locale
   */
  formatTime(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const locale = this.getCurrentLocale();
    const formatOptions = { ...locale.timeFormat, ...options };
    
    return new Intl.DateTimeFormat(this.currentLocale, formatOptions).format(date);
  }

  /**
   * Formats a number according to the current locale
   */
  formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    const locale = this.getCurrentLocale();
    const formatOptions = { ...locale.numberFormat, ...options };
    
    return new Intl.NumberFormat(this.currentLocale, formatOptions).format(number);
  }

  /**
   * Gets all supported locales
   */
  getSupportedLocales(): Locale[] {
    return Object.values(supportedLocales);
  }

  /**
   * Checks if the current locale is RTL
   */
  isRTL(): boolean {
    return this.currentLocale === 'ar';
  }
}

// Create and export a singleton instance
export const i18n = new I18nManager();

// Export convenience functions
export const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);
export const setLocale = (locale: string) => i18n.setLocale(locale);
export const getLocale = () => i18n.getLocale();
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => i18n.formatDate(date, options);
export const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions) => i18n.formatTime(date, options);
export const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => i18n.formatNumber(number, options);
export const isRTL = () => i18n.isRTL();
