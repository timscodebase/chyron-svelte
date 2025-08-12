/**
 * Theme system for Chyron components
 */

export interface Theme {
  name: string;
  description: string;
  variables: Record<string, string>;
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Default',
    description: 'Classic news ticker style',
    variables: {
      '--red': 'rgba(255, 0, 0, 1)',
      '--light-red': 'rgb(237, 172, 172)',
      '--white': 'rgba(255, 255, 255, 1)',
      '--dark-gray': 'rgb(27, 27, 27)',
      '--gray': 'rgb(126, 126, 126)',
      '--light-gray': 'rgb(203, 203, 203)',
      '--blue': 'rgba(0, 42, 255, 1)',
      '--light-blue': 'rgb(191, 200, 246)',
      '--color-headline-surface': 'var(--light-blue)',
      '--color-logo-surface': 'var(--red)',
      '--color-chyron-surface': 'var(--dark-gray)',
      '--color-chyron-separator': 'var(--light-blue)',
      '--color-breaking-news-background': 'var(--red)',
      '--color-text-dark': 'var(--dark-gray)',
      '--color-text-light': 'var(--white)',
    },
  },
  dark: {
    name: 'Dark',
    description: 'Dark theme for low-light environments',
    variables: {
      '--red': 'rgb(255, 59, 48)',
      '--light-red': 'rgb(255, 105, 97)',
      '--white': 'rgb(255, 255, 255)',
      '--dark-gray': 'rgb(28, 28, 30)',
      '--gray': 'rgb(142, 142, 147)',
      '--light-gray': 'rgb(174, 174, 178)',
      '--blue': 'rgb(0, 122, 255)',
      '--light-blue': 'rgb(100, 210, 255)',
      '--color-headline-surface': 'rgb(44, 44, 46)',
      '--color-logo-surface': 'rgb(58, 58, 60)',
      '--color-chyron-surface': 'rgb(28, 28, 30)',
      '--color-chyron-separator': 'rgb(100, 210, 255)',
      '--color-breaking-news-background': 'rgb(255, 59, 48)',
      '--color-text-dark': 'rgb(255, 255, 255)',
      '--color-text-light': 'rgb(255, 255, 255)',
    },
  },
  light: {
    name: 'Light',
    description: 'Light theme for bright environments',
    variables: {
      '--red': 'rgb(255, 59, 48)',
      '--light-red': 'rgb(255, 105, 97)',
      '--white': 'rgb(255, 255, 255)',
      '--dark-gray': 'rgb(28, 28, 30)',
      '--gray': 'rgb(142, 142, 147)',
      '--light-gray': 'rgb(174, 174, 178)',
      '--blue': 'rgb(0, 122, 255)',
      '--light-blue': 'rgb(100, 210, 255)',
      '--color-headline-surface': 'rgb(242, 242, 247)',
      '--color-logo-surface': 'rgb(255, 255, 255)',
      '--color-chyron-surface': 'rgb(28, 28, 30)',
      '--color-chyron-separator': 'rgb(100, 210, 255)',
      '--color-breaking-news-background': 'rgb(255, 59, 48)',
      '--color-text-dark': 'rgb(28, 28, 30)',
      '--color-text-light': 'rgb(255, 255, 255)',
    },
  },
  neon: {
    name: 'Neon',
    description: 'Cyberpunk-inspired neon theme',
    variables: {
      '--red': 'rgb(255, 0, 102)',
      '--light-red': 'rgb(255, 51, 153)',
      '--white': 'rgb(255, 255, 255)',
      '--dark-gray': 'rgb(0, 0, 0)',
      '--gray': 'rgb(51, 51, 51)',
      '--light-gray': 'rgb(102, 102, 102)',
      '--blue': 'rgb(0, 255, 255)',
      '--light-blue': 'rgb(51, 255, 255)',
      '--color-headline-surface': 'rgba(0, 255, 255, 0.1)',
      '--color-logo-surface': 'rgba(255, 0, 102, 0.2)',
      '--color-chyron-surface': 'rgba(0, 0, 0, 0.9)',
      '--color-chyron-separator': 'rgb(0, 255, 255)',
      '--color-breaking-news-background': 'rgb(255, 0, 102)',
      '--color-text-dark': 'rgb(0, 0, 0)',
      '--color-text-light': 'rgb(255, 255, 255)',
    },
  },
  retro: {
    name: 'Retro',
    description: 'Vintage 80s-inspired theme',
    variables: {
      '--red': 'rgb(255, 69, 0)',
      '--light-red': 'rgb(255, 140, 0)',
      '--white': 'rgb(255, 255, 255)',
      '--dark-gray': 'rgb(25, 25, 112)',
      '--gray': 'rgb(128, 128, 128)',
      '--light-gray': 'rgb(192, 192, 192)',
      '--blue': 'rgb(0, 191, 255)',
      '--light-blue': 'rgb(135, 206, 250)',
      '--color-headline-surface': 'rgb(255, 215, 0)',
      '--color-logo-surface': 'rgb(255, 69, 0)',
      '--color-chyron-surface': 'rgb(25, 25, 112)',
      '--color-chyron-separator': 'rgb(0, 191, 255)',
      '--color-breaking-news-background': 'rgb(255, 69, 0)',
      '--color-text-dark': 'rgb(25, 25, 112)',
      '--color-text-light': 'rgb(255, 255, 255)',
    },
  },
};

/**
 * Applies a theme to the document
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function applyTheme(themeName: string): void {
  const theme = themes[themeName];
  if (!theme) {
    console.warn(`Theme "${themeName}" not found`);
    return;
  }

  const root = document.documentElement;
  Object.entries(theme.variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Store theme preference
  if (isBrowser()) {
    localStorage.setItem('chyron-theme', themeName);
  }
}

/**
 * Gets the current theme
 */
export function getCurrentTheme(): string {
  return isBrowser() ? localStorage.getItem('chyron-theme') || 'default' : 'default';
}

/**
 * Gets available themes
 */
export function getAvailableThemes(): Theme[] {
  return Object.values(themes);
}

/**
 * Initializes theme system
 */
export function initializeTheme(): void {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
}

/**
 * Creates a custom theme
 */
export function createCustomTheme(
  name: string,
  description: string,
  variables: Record<string, string>
): Theme {
  return {
    name,
    description,
    variables: { ...themes.default.variables, ...variables },
  };
}
