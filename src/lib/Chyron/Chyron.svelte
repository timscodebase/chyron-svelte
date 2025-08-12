<script lang="ts">
import { onMount } from 'svelte';
import type { ChyronProps } from './types.js';

interface Props {
  headlines?: string[];
  speed?: number;
  separator?: string;
}

let { headlines = [], speed = 60, separator = '&brvbar;' } = $props();

let scrollContainer: HTMLDivElement;
let isPaused = $state(false);

function togglePause() {
  isPaused = !isPaused;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    togglePause();
  }
}
</script>

  <div 
    class="chyron" 
    role="marquee" 
    aria-label="News ticker with {headlines.length} headlines"
    tabindex="0"
    onkeydown={handleKeydown}
    onpointerdown={togglePause}
  >
  <div 
    class="scroll-container" 
    class:paused={isPaused}
    bind:this={scrollContainer}
    style="animation-duration: {speed}s;"
  >
    {#each [0, 1] as _}
      {#each headlines as headline, index}
        <span class="headline">{headline}</span>
        {#if index < headlines.length - 1}
          <span class="separator" aria-hidden="true">{@html separator}</span>
        {/if}
      {/each}
    {/each}
  </div>
  {#if isPaused}
    <div class="pause-indicator" aria-live="polite">Paused</div>
  {/if}
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
    box-shadow: var(--double-shadow);
    position: relative;
    cursor: pointer;
    outline: none;
  }

  .chyron:focus-visible {
    outline: 2px solid var(--color-chyron-separator);
    outline-offset: 2px;
  }

  .scroll-container {
    display: inline-flex;
    animation: scroll var(--chyron-scroll-duration, 60s) linear infinite;
  }

  .scroll-container.paused {
    animation-play-state: paused;
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
    font-size: 2rem;
    color: var(--color-chyron-separator);
    padding: 0 calc(var(--spacing-unit) / 2);
  }

  .pause-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    pointer-events: none;
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