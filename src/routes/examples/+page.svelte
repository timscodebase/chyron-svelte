<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    ChyronWrapper, 
    ChyronOptimized, 
    ChyronThemeSwitcher,
    applyTheme,
    initializeTheme,
    setLocale,
    getLocale,
    t,
    formatDate,
    formatTime
  } from '../../lib/Chyron/index.js';

  // Initialize theme and i18n
  onMount(() => {
    initializeTheme();
  });

  // Sample headlines for different scenarios
  const newsHeadlines = [
    'Breaking News: Major Event Unfolds',
    'Sports Update: Local Team Wins Championship',
    'Weather Alert: Severe Storms Expected',
    'Entertainment Buzz: Celebrity News',
    'Technology Update: New Gadget Released',
    'Health Advisory: Important Safety Tips',
    'Finance News: Market Trends and Analysis',
    'Travel Update: New Destinations Announced',
    'Education News: School Board Meeting Highlights',
  ];

  const sportsHeadlines = [
    'LIVE: Championship Game in Progress',
    'Final Score: Home Team 3 - Away Team 1',
    'Player of the Match: John Smith',
    'Next Game: Tomorrow at 8 PM',
    'Injury Update: Star Player Expected to Return',
    'Transfer News: New Signing Announced',
    'Coach Interview: Post-Match Comments',
    'Fan Reactions: Social Media Buzz',
    'Ticket Sales: Playoff Games Available',
  ];

  const weatherHeadlines = [
    'WEATHER ALERT: Severe Thunderstorm Warning',
    'Current Temperature: 75°F / 24°C',
    'Forecast: Sunny skies expected tomorrow',
    'Wind Speed: 15 mph from Southwest',
    'Humidity: 65% - Comfortable conditions',
    'UV Index: High - Sun protection recommended',
    'Air Quality: Good - Outdoor activities safe',
    'Pollen Count: Low - Good for allergy sufferers',
    'Marine Forecast: Calm seas, light winds',
  ];

  // Reactive state
  let currentLocale = $state(getLocale());
  let currentTime = $state(new Date());
  let selectedTheme = $state('default');

  // Update time every second
  onMount(() => {
    const interval = setInterval(() => {
      currentTime = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  function handleThemeChange(theme: string) {
    selectedTheme = theme;
    applyTheme(theme);
  }

  function handleLocaleChange(locale: string) {
    currentLocale = locale;
    setLocale(locale);
  }
</script>

<svelte:head>
  <title>Chyron Examples - Advanced Features</title>
  <meta name="description" content="Advanced examples and demonstrations of Chyron components" />
</svelte:head>

<div class="examples-page">
  <header class="page-header">
    <h1>Chyron Advanced Examples</h1>
    <p>Explore the advanced features and capabilities of the Chyron library</p>
    
    <div class="controls">
      <div class="control-group">
        <label for="theme-select">Theme:</label>
        <select id="theme-select" bind:value={selectedTheme} onchange={() => handleThemeChange(selectedTheme)}>
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="neon">Neon</option>
          <option value="retro">Retro</option>
        </select>
      </div>
      
      <div class="control-group">
        <label for="locale-select">Language:</label>
        <select id="locale-select" bind:value={currentLocale} onchange={() => handleLocaleChange(currentLocale)}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
          <option value="zh">中文</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      
      <div class="current-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatDate(currentTime)}</span>
      </div>
    </div>
  </header>

  <main class="examples-content">
    <!-- Basic Example -->
    <section class="example-section">
      <h2>Basic Chyron</h2>
      <p>Standard news ticker with default settings</p>
      <div class="example-container">
        <ChyronWrapper headlines={newsHeadlines} />
      </div>
    </section>

    <!-- Breaking News Example -->
    <section class="example-section">
      <h2>Breaking News</h2>
      <p>Breaking news banner with urgent styling</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={newsHeadlines}
          breaking={true}
          headline={false}
        />
      </div>
    </section>

    <!-- Sports Example -->
    <section class="example-section">
      <h2>Sports Ticker</h2>
      <p>Sports-focused headlines with logo on the left</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={sportsHeadlines}
          logoLeft={true}
          logoUrl="https://placehold.co/150x150/ff0000/ffffff?text=SPORTS"
          logoAlt="Sports Logo"
        />
      </div>
    </section>

    <!-- Weather Example -->
    <section class="example-section">
      <h2>Weather Updates</h2>
      <p>Weather information with custom styling</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={weatherHeadlines}
          customStyles={{
            '--color-chyron-surface': 'rgba(0, 123, 255, 0.9)',
            '--color-chyron-separator': 'rgba(255, 255, 255, 0.8)',
            '--font-size-headline': '1.5rem'
          }}
        />
      </div>
    </section>

    <!-- Optimized Example -->
    <section class="example-section">
      <h2>Performance Optimized</h2>
      <p>High-performance version with virtualization</p>
      <div class="example-container">
        <ChyronOptimized 
          headlines={newsHeadlines}
          virtualize={true}
          chunkSize={5}
        />
      </div>
    </section>

    <!-- Minimal Example -->
    <section class="example-section">
      <h2>Minimal Design</h2>
      <p>Clean, minimal design with only essential elements</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={newsHeadlines}
          logo={false}
          headline={false}
          chyron={true}
        />
      </div>
    </section>

    <!-- Logo Only Example -->
    <section class="example-section">
      <h2>Logo with Date/Time</h2>
      <p>Just the logo component with rotating date/time</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={newsHeadlines}
          logo={true}
          headline={false}
          chyron={false}
          logoUrl="https://placehold.co/200x200/000000/ffffff?text=LOGO"
          logoAlt="Company Logo"
        />
      </div>
    </section>

    <!-- Headline Only Example -->
    <section class="example-section">
      <h2>Headline Display</h2>
      <p>Static headline display without scrolling</p>
      <div class="example-container">
        <ChyronWrapper 
          headlines={newsHeadlines}
          logo={false}
          headline={true}
          chyron={false}
        />
      </div>
    </section>
  </main>

  <footer class="page-footer">
    <p>Current Locale: {currentLocale} | Current Theme: {selectedTheme}</p>
    <p>Accessibility: {t('accessibility.pause')}</p>
  </footer>
</div>

<style>
  .examples-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    font-family: 'Inter', sans-serif;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }

  .page-header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .page-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .control-group label {
    font-weight: 600;
    font-size: 0.875rem;
  }

  .control-group select {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background: white;
    color: #333;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .current-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-weight: 600;
  }

  .examples-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .example-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .example-section h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .example-section p {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .example-container {
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: 200px;
  }

  .page-footer {
    text-align: center;
    margin-top: 3rem;
    color: white;
    opacity: 0.8;
  }

  .page-footer p {
    margin: 0.5rem 0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .examples-page {
      padding: 1rem;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .controls {
      flex-direction: column;
      gap: 1rem;
    }

    .example-section {
      padding: 1.5rem;
    }
  }

  /* RTL Support */
  [dir="rtl"] .controls {
    flex-direction: row-reverse;
  }

  [dir="rtl"] .control-group {
    text-align: right;
  }
</style>
