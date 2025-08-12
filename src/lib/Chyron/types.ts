export interface ChyronConfig {
  logoSize: number;
  logoUrl: string;
  logoAlt: string;
  defaultHeadlines: string[];
}

export interface ChyronWrapperProps {
  breaking?: boolean;
  headline?: boolean;
  headlines?: string[];
  logo?: boolean;
  logoLeft?: boolean;
  chyron?: boolean;
  logoUrl?: string;
  logoAlt?: string;
  logoSize?: number;
  customStyles?: Record<string, string>;
}

export interface ChyronProps {
  headlines: string[];
  speed?: number;
  separator?: string;
}

export interface ChyronHeadlineProps {
  headlines: string[];
  interval?: number;
  transitionDuration?: number;
}

export interface ChyronLogoProps {
  logoSize: number;
  logoUrl: string;
  logoAlt: string;
  showDateTime?: boolean;
  dateTimeFormat?: 'date' | 'time' | 'weekday';
}

export interface ChyronBreakingNewsProps {
  text?: string;
  animationDuration?: number;
}
