<script lang="ts">
  import { Chyron, ChyronBreakingNews, ChyronHeadline, ChyronLogo } from "./index.js";

  // Define interfaces for props and constants
  interface ChyronConfig {
    logoSize: number;
    logoUrl: string;
    logoAlt: string;
    defaultHeadlines: string[];
  }

  interface Props {
    breaking?: boolean;
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
  let { breaking = false, headline = false, headlines = CONFIG.defaultHeadlines, logo = true, logoLeft = false, chyron = true } = $props() as Props;
</script>

<div class="chyron-wrapper {logoLeft ? 'chyron-wrapper--logo-left' : 'chyron-wrapper--logo-right'}">
  {#if breaking}
    <ChyronBreakingNews />
  {/if}
  {#if logo}
    <ChyronLogo logoSize={CONFIG.logoSize} logoUrl={CONFIG.logoUrl} logoAlt={CONFIG.logoAlt} />
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
    grid-template-rows: auto 150px 100px;
  }

  .chyron-wrapper--logo-left {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "logo breaking"
      "logo headline"
      "chyron chyron";
  }

  .chyron-wrapper--logo-right {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "breaking logo"
      "headline logo"
      "chyron chyron";
  }
</style>