<script lang="ts">
  import './styles.css';
  import { Chyron, ChyronBreakingNews, ChyronHeadline, ChyronLogo } from './index.js';
  import type { ChyronWrapperProps } from './types.js';

  // Constants for configuration
  const CONFIG = {
    logoSize: 175,
    logoUrl: 'https://placehold.co',
    logoAlt: 'Logo',
    defaultHeadlines: [
      'Breaking News: Major Event Unfolds',
      'Sports Update: Local Team Wins Championship',
      'Weather Alert: Severe Storms Expected',
      'Entertainment Buzz: Celebrity News',
      'Technology Update: New Gadget Released',
      'Health Advisory: Important Safety Tips',
      'Finance News: Market Trends and Analysis',
      'Travel Update: New Destinations Announced',
      'Education News: School Board Meeting Highlights',
    ],
  };

  let {
    breaking = false,
    chyron = true,
    logoLeft = false,
    logo = true,
    headline = true,
    headlines = CONFIG.defaultHeadlines,
    logoUrl = CONFIG.logoUrl,
    logoAlt = CONFIG.logoAlt,
    logoSize = CONFIG.logoSize,
    customStyles = {},
  } = $props() as ChyronWrapperProps;
</script>

<div
  class="chyron-wrapper chyron-svelte inter-300"
  class:chyron-wrapper--logo-left={logoLeft}
  class:chyron-wrapper--logo-right={!logoLeft}
  class:chyron-wrapper--no-chyron={!chyron}
  class:chyron-wrapper--no-headline={!headline && breaking}
  style="--logo-size: {CONFIG.logoSize}px;"
>
  {#if breaking}
    <ChyronBreakingNews />
  {/if}
  {#if logo}
    <ChyronLogo logoSize={logoSize} logoUrl={logoUrl} logoAlt={logoAlt} />
  {/if}
  {#if headline}
    <ChyronHeadline {headlines} />
  {/if}
  {#if chyron}
    <Chyron {headlines} />
  {/if}
</div>

<style>
  .chyron-wrapper {
    --logo-size: 175px;
    --gap: 10px;
    --offset: 1vw;
    --width: 97vw;

    position: fixed;
    bottom: var(--offset);
    left: var(--offset);
    right: var(--offset);
    z-index: 1000;
    width: var(--width);
    display: grid;
    gap: var(--gap);
    grid-template-rows: 80px 1fr 80px;
  }

  .chyron-wrapper--logo-left {
    grid-template-columns: calc(var(--logo-size) + (var(--gap) * 4)) 1fr;
    grid-template-areas:
      'logo breaking'
      'logo headline'
      'chyron chyron';
  }

  .chyron-wrapper--logo-right {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'breaking logo'
      'headline logo'
      'chyron chyron';
  }

  /* No Chyron: Shift Logo, Breaking, and Headline down */
  .chyron-wrapper--no-chyron {
    grid-template-rows: auto auto;
  }

  .chyron-wrapper--no-chyron.chyron-wrapper--logo-left {
    grid-template-areas:
      'logo breaking'
      'logo headline';
  }

  .chyron-wrapper--no-chyron.chyron-wrapper--logo-right {
    grid-template-areas:
      'breaking logo'
      'headline logo';
  }

  /* No Headline: Move Breaking down */
  .chyron-wrapper--no-headline.chyron-wrapper--logo-left {
    grid-template-areas:
      'logo .'
      'logo breaking'
      'chyron chyron';
  }

  .chyron-wrapper--no-headline.chyron-wrapper--logo-right {
    grid-template-areas:
      '. logo'
      'breaking logo'
      'chyron chyron';
  }

  .chyron-wrapper--no-chyron.chyron-wrapper--no-headline.chyron-wrapper--logo-left {
    grid-template-areas:
      'logo .'
      'logo breaking';
  }

  .chyron-wrapper--no-chyron.chyron-wrapper--no-headline.chyron-wrapper--logo-right {
    grid-template-areas:
      '. logo'
      'breaking logo';
  }
</style>