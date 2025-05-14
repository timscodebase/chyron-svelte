<script lang="ts">
  import { Chyron, Headline, ChyronLogo } from "./index.js";

  // Define interfaces for props and constants
  interface ChyronConfig {
    logoSize: number;
    logoUrl: string;
    logoAlt: string;
    defaultHeadlines: string[];
  }

  interface Props {
    headline?: boolean;
    headlines?: string[];
    logo?: boolean;
    logoLeft?: boolean;
    chyron?: boolean;
  }

  // Constants for configuration
  const CONFIG: ChyronConfig = {
    logoSize: 175,
    logoUrl: "https://placehold.co",
    logoAlt: "Logo",
    defaultHeadlines: [
      "Breaking News: Major Event Unfolds",
      "Sports Update: Local Team Wins Championship",
      "Weather Alert: Severe Storms Expected",
      "Entertainment Buzz: Celebrity News",
      "Technology Update: New Gadget Released",
      "Health Advisory: Important Safety Tips",
      "Finance News: Market Trends and Analysis",
      "Travel Update: New Destinations Announced",
      "Education News: School Board Meeting Highlights",
    ],
  };

  // Destructure props with defaults
  let { headline = false, headlines = CONFIG.defaultHeadlines, logo = true, logoLeft = false, chyron = true } = $props() as Props;
</script>

<div class="chyron-wrapper {logoLeft ? 'chyron-wrapper--logo-left' : 'chyron-wrapper--logo-right'}">
  {#if logo}
    <ChyronLogo logoSize={CONFIG.logoSize} logoUrl={CONFIG.logoUrl} logoAlt={CONFIG.logoAlt} />
  {/if}
  {#if headline}
    <Headline {headlines} />
  {/if}

  {#if logo}
    <ChyronLogo logoSize={CONFIG.logoSize} logoUrl={CONFIG.logoUrl} logoAlt={CONFIG.logoAlt} />
  {/if}

  {#if chyron}
    <Chyron {headlines} />
  {/if}
</div>

<style>
  .chyron-wrapper {
  --logo-size: 175px;
  --gap: 10px;
  --bottom-offset: 1vh;
  --left-offset: 1vw;
  --width: 98vw;

  position: fixed;
  bottom: var(--bottom-offset);
  left: var(--left-offset);
  width: var(--width);
  display: grid;
  gap: var(--gap);
  grid-template-rows: auto 175px 100px;
}

.chyron-wrapper--logo-left {
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "logo ." /* First row: logo in first column, second column empty */
    "logo headline" /* Second row: logo and headline */
    "chyron chyron"; /* Third row: chyron spans both columns */
}

.chyron-wrapper--logo-right {
  grid-template-columns: 1fr auto;
  grid-template-areas:
    ". logo" /* First row: first column empty, logo in second column */
    "headline logo" /* Second row: headline and logo */
    "chyron chyron"; /* Third row: chyron spans both columns */
}
</style>