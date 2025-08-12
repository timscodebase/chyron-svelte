<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { debounce, throttle } from './utils.js';

  interface Props {
    headlines?: string[];
    speed?: number;
    separator?: string;
    virtualize?: boolean;
    chunkSize?: number;
  }

  let { 
    headlines = [], 
    speed = 60,
    separator = '&brvbar;',
    virtualize = true,
    chunkSize = 10
  } = $props();

  let scrollContainer: HTMLDivElement;
  let isPaused = $state(false);
  let visibleHeadlines = $state<string[]>([]);
  let scrollPosition = $state(0);
  let containerWidth = $state(0);
  let totalWidth = $state(0);

  // Performance optimizations
  let animationFrameId: number;
  let resizeObserver: ResizeObserver;

  // Debounced and throttled functions
  const debouncedUpdateVisible = debounce(updateVisibleHeadlines, 100);
  const throttledScroll = throttle(handleScroll, 16); // ~60fps

  function updateVisibleHeadlines() {
    if (!virtualize || !scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const startIndex = Math.floor(scrollPosition / containerRect.width);
    const endIndex = Math.min(startIndex + chunkSize, headlines.length);

    visibleHeadlines = headlines.slice(startIndex, endIndex);
  }

  function handleScroll() {
    if (!scrollContainer) return;
    
    const rect = scrollContainer.getBoundingClientRect();
    scrollPosition = -rect.left;
    updateVisibleHeadlines();
  }

  function togglePause() {
    isPaused = !isPaused;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      togglePause();
    }
  }

  function measureContainer() {
    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    containerWidth = rect.width;
    totalWidth = headlines.length * 200; // Approximate width per headline
  }

  // Intersection Observer for performance
  let observer: IntersectionObserver;

  onMount(() => {
    if (!scrollContainer) return;

    // Measure container
    measureContainer();

    // Set up intersection observer for visibility
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Component is visible, start animations
            if (!isPaused) {
              startAnimation();
            }
          } else {
            // Component is not visible, pause animations
            stopAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    // Set up resize observer
    resizeObserver = new ResizeObserver(debouncedUpdateVisible);
    resizeObserver.observe(scrollContainer);

    // Initial update
    updateVisibleHeadlines();
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    stopAnimation();
  });

  function startAnimation() {
    if (animationFrameId) return;
    
    function animate() {
      if (!isPaused && scrollContainer) {
        scrollPosition += 1;
        throttledScroll();
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }
  }

  // Watch for changes
  $effect(() => {
    if (headlines.length > 0) {
      updateVisibleHeadlines();
      measureContainer();
    }
  });

  $effect(() => {
    if (isPaused) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });
</script>

<div 
  class="chyron-optimized" 
  role="marquee" 
  aria-label="News ticker with {headlines.length} headlines"
  tabindex="0"
  on:keydown={handleKeydown}
  on:pointerdown={togglePause}
>
  <div 
    class="scroll-container" 
    class:paused={isPaused}
    bind:this={scrollContainer}
    style="transform: translateX({scrollPosition}px);"
  >
    {#if virtualize}
      {#each visibleHeadlines as headline, index}
        <span class="headline">{headline}</span>
        {#if index < visibleHeadlines.length - 1}
          <span class="separator" aria-hidden="true">{@html separator}</span>
        {/if}
      {/each}
    {:else}
      {#each [0, 1] as _}
        {#each headlines as headline, index}
          <span class="headline">{headline}</span>
          {#if index < headlines.length - 1}
            <span class="separator" aria-hidden="true">{@html separator}</span>
          {/if}
        {/each}
      {/each}
    {/if}
  </div>
  
  {#if isPaused}
    <div class="pause-indicator" aria-live="polite">Paused</div>
  {/if}
  
  <!-- Performance indicator (dev only) -->
  {#if import.meta.env.DEV}
    <div class="performance-info">
      <span>Visible: {visibleHeadlines.length}/{headlines.length}</span>
      <span>Position: {Math.round(scrollPosition)}px</span>
    </div>
  {/if}
</div>

<style>
  .chyron-optimized {
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

  .chyron-optimized:focus-visible {
    outline: 2px solid var(--color-chyron-separator);
    outline-offset: 2px;
  }

  .scroll-container {
    display: inline-flex;
    will-change: transform;
    transform: translateX(0);
  }

  .scroll-container.paused {
    animation-play-state: paused;
  }

  .headline {
    display: inline-block;
    font-size: 2rem;
    margin: 0;
    padding: 0 var(--spacing-unit);
    white-space: nowrap;
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

  .performance-info {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
</style>
