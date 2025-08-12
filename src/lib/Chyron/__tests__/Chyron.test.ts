import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Chyron from '../Chyron.svelte';

describe('Chyron', () => {
  const mockHeadlines = [
    'Breaking News: Major Event Unfolds',
    'Sports Update: Team Wins Championship',
    'Weather Alert: Severe Storms Expected',
  ];

  it('renders headlines correctly', () => {
    render(Chyron, { headlines: mockHeadlines });

    mockHeadlines.forEach((headline) => {
      expect(screen.getByText(headline)).toBeInTheDocument();
    });
  });

  it('renders with default props', () => {
    render(Chyron, {});

    const chyron = screen.getByRole('marquee');
    expect(chyron).toBeInTheDocument();
  });

  it('applies custom speed', () => {
    const { container } = render(Chyron, {
      headlines: mockHeadlines,
      speed: 30,
    });

    const scrollContainer = container.querySelector('.scroll-container');
    expect(scrollContainer).toHaveStyle('animation-duration: 30s');
  });

  it('applies custom separator', () => {
    const { container } = render(Chyron, {
      headlines: mockHeadlines,
      separator: '|',
    });

    const separators = container.querySelectorAll('.separator');
    separators.forEach((separator) => {
      expect(separator.innerHTML).toBe('|');
    });
  });

  it('has proper ARIA attributes', () => {
    render(Chyron, { headlines: mockHeadlines });

    const chyron = screen.getByRole('marquee');
    expect(chyron).toHaveAttribute('aria-label', 'News ticker with 3 headlines');
    expect(chyron).toHaveAttribute('tabindex', '0');
  });

  it('handles empty headlines array', () => {
    render(Chyron, { headlines: [] });

    const chyron = screen.getByRole('marquee');
    expect(chyron).toHaveAttribute('aria-label', 'News ticker with 0 headlines');
  });

  it('handles single headline', () => {
    render(Chyron, { headlines: ['Single Headline'] });

    expect(screen.getByText('Single Headline')).toBeInTheDocument();
    const separators = document.querySelectorAll('.separator');
    expect(separators).toHaveLength(0);
  });
});
