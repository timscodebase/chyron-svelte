# Chyron Components

A collection of Svelte components for creating news tickers and broadcast-style interfaces.

## Components

### ChyronWrapper

The main wrapper component that combines all chyron features.

```svelte
<script>
  import { ChyronWrapper } from 'chyron-svelte';
  
  const headlines = [
    'Breaking News: Major Event Unfolds',
    'Sports Update: Team Wins Championship',
    'Weather Alert: Severe Storms Expected'
  ];
</script>

<ChyronWrapper
  breaking={true}
  headline={true}
  headlines={headlines}
  logo={true}
  logoLeft={false}
  chyron={true}
  logoUrl="https://placehold.co"
  logoAlt="News Logo"
  logoSize={150}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `breaking` | `boolean` | `false` | Show breaking news banner |
| `headline` | `boolean` | `true` | Show headline section |
| `headlines` | `string[]` | `[]` | Array of headlines to display |
| `logo` | `boolean` | `true` | Show logo section |
| `logoLeft` | `boolean` | `false` | Position logo on the left |
| `chyron` | `boolean` | `true` | Show scrolling chyron |
| `logoUrl` | `string` | `'https://placehold.co'` | Logo image URL |
| `logoAlt` | `string` | `'Logo'` | Logo alt text |
| `logoSize` | `number` | `175` | Logo size in pixels |
| `customStyles` | `Record<string, string>` | `{}` | Custom CSS variables |

### Chyron

A scrolling ticker component for displaying headlines.

```svelte
<script>
  import { Chyron } from 'chyron-svelte';
  
  const headlines = ['Headline 1', 'Headline 2', 'Headline 3'];
</script>

<Chyron 
  headlines={headlines}
  speed={60}
  separator="&brvbar;"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headlines` | `string[]` | `[]` | Array of headlines to scroll |
| `speed` | `number` | `60` | Scroll speed in seconds |
| `separator` | `string` | `'&brvbar;'` | HTML separator between headlines |

### ChyronHeadline

A component that cycles through headlines with fade transitions.

```svelte
<script>
  import { ChyronHeadline } from 'chyron-svelte';
  
  const headlines = ['Headline 1', 'Headline 2', 'Headline 3'];
</script>

<ChyronHeadline headlines={headlines} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headlines` | `string[]` | `[]` | Array of headlines to cycle through |

### ChyronLogo

A component that displays a logo with rotating date/time information.

```svelte
<script>
  import { ChyronLogo } from 'chyron-svelte';
</script>

<ChyronLogo
  logoSize={175}
  logoUrl="https://placehold.co"
  logoAlt="News Logo"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoSize` | `number` | `175` | Logo size in pixels |
| `logoUrl` | `string` | `''` | Logo image URL |
| `logoAlt` | `string` | `'Logo'` | Logo alt text |

### ChyronBreakingNews

A component that displays a breaking news banner.

```svelte
<script>
  import { ChyronBreakingNews } from 'chyron-svelte';
</script>

<ChyronBreakingNews />
```

## Styling

The components use CSS custom properties for theming. You can customize the appearance by setting these variables:

```css
.chyron-svelte {
  /* Colors */
  --red: rgba(255, 0, 0, 1);
  --light-red: rgb(237, 172, 172);
  --white: rgba(255, 255, 255, 1);
  --dark-gray: rgb(27, 27, 27);
  --blue: rgba(0, 42, 255, 1);
  --light-blue: rgb(191, 200, 246);
  
  /* Animation Settings */
  --chyron-scroll-duration: 60s;
  --headline-transition-duration: 0.5s;
  --breaking-news-animation-duration: 2s;
  
  /* Spacing and Sizing */
  --spacing-unit: 1rem;
  --border-width: 10px;
  --border-radius: 1rem;
  
  /* Typography */
  --font-size-base: 1rem;
  --font-size-headline: 2.25rem;
  --font-size-breaking-news: 4rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;
}
```

## Accessibility

All components include proper ARIA attributes and keyboard navigation:

- **ARIA Labels**: Components have descriptive labels for screen readers
- **Keyboard Navigation**: Use Space or Enter to pause/resume the chyron
- **Focus Management**: Proper focus indicators for interactive elements
- **Screen Reader Support**: Semantic HTML and ARIA roles

## Performance

The components are optimized for performance:

- **CSS Transforms**: Use hardware-accelerated animations
- **Debounced Events**: Prevent excessive event handling
- **Efficient Updates**: Minimal re-renders and DOM updates
- **Memory Management**: Proper cleanup of intervals and event listeners

## Browser Support

- Modern browsers with ES2020 support
- CSS Grid and Flexbox support required
- CSS custom properties support required

## Examples

### Basic Usage

```svelte
<script>
  import { ChyronWrapper } from 'chyron-svelte';
  
  const headlines = [
    'Breaking News: Major Event Unfolds',
    'Sports Update: Team Wins Championship',
    'Weather Alert: Severe Storms Expected'
  ];
</script>

<ChyronWrapper headlines={headlines} />
```

### Custom Styling

```svelte
<script>
  import { ChyronWrapper } from 'chyron-svelte';
  
  const customStyles = {
    '--color-chyron-surface': '#1a1a1a',
    '--color-text-light': '#ffffff',
    '--font-size-headline': '1.5rem'
  };
</script>

<ChyronWrapper 
  headlines={headlines}
  customStyles={customStyles}
/>
```

### Logo on Left

```svelte
<ChyronWrapper 
  headlines={headlines}
  logoLeft={true}
  logoUrl="https://your-logo.com"
  logoAlt="Your Logo"
/>
```

### Breaking News Only

```svelte
<ChyronWrapper 
  breaking={true}
  headline={false}
  chyron={false}
  logo={false}
/>
```
