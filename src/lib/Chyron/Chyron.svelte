<script lang="ts">
  import { onMount } from 'svelte';

  let { headlines = [] } = $props() as { headlines: string[] };

  const ICON = 'uil:ellipsis-v';

  // Ensure Iconify is loaded
  onMount(() => {
    if (typeof window !== 'undefined' && !window.Iconify) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js';
      script.async = true;
      document.head.appendChild(script);
      return () => script.remove();
    }
  });
</script>

<div class="chyron">
  <div class="scroll-container">
    {#each [0, 1] as _}
      {#each headlines as headline, index}
        <span class="headline">{headline}</span>
        {#if index < headlines.length - 1}
          <iconify-icon icon={ICON} class="separator"></iconify-icon>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style>
  .chyron {
    grid-area: chyron;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-chyron-surface);
    border: var(--border-chyron);
    color: var(--color-text-light);
    font-size: 1.5rem;
    border-radius: var(--size-border-radius);
    overflow: hidden;
    white-space: nowrap;
  }

  .scroll-container {
    display: inline-flex;
    animation: scroll 60s linear infinite;
  }

  .headline {
    display: inline-block;
    font-size: 2rem;
    margin: 0;
    padding: 0 var(--spacing-unit);
  }

  .separator {
    display: inline-flex;
    align-items: center;
    font-size: 2rem; /* Match headline font size */
    color: var(--color-text-light);
    padding: 0 calc(var(--spacing-unit) / 2);
  }

  .chyron:hover .scroll-container {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%); /* Move half the width for seamless loop */
    }
  }
</style>