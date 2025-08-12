<script lang="ts">
  import { onMount } from 'svelte';
  import { applyTheme, getCurrentTheme, getAvailableThemes, type Theme } from './themes.js';

  let currentTheme = $state(getCurrentTheme());
  let availableThemes = $state<Theme[]>([]);
  let isOpen = $state(false);

  onMount(() => {
    availableThemes = getAvailableThemes();
  });

  function handleThemeChange(themeName: string) {
    currentTheme = themeName;
    applyTheme(themeName);
    isOpen = false;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.theme-switcher')) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="theme-switcher">
  <button
    class="theme-button"
    onclick={toggleDropdown}
    aria-label="Change theme"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
  >
    <span class="theme-icon">🎨</span>
    <span class="theme-label">Theme</span>
    <span class="dropdown-arrow" class:open={isOpen}>▼</span>
  </button>

  {#if isOpen}
    <div class="theme-dropdown" role="listbox">
      {#each availableThemes as theme}
        <button
          class="theme-option"
          class:active={currentTheme === theme.name.toLowerCase()}
          onclick={() => handleThemeChange(theme.name.toLowerCase())}
          role="option"
          aria-selected={currentTheme === theme.name.toLowerCase()}
        >
          <span class="theme-name">{theme.name}</span>
          <span class="theme-description">{theme.description}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .theme-switcher {
    position: relative;
    display: inline-block;
  }

  .theme-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--color-chyron-surface, #1a1a1a);
    color: var(--color-text-light, #ffffff);
    border: 2px solid var(--color-chyron-separator, #bfc8f6);
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .theme-button:hover {
    background: var(--color-chyron-separator, #bfc8f6);
    color: var(--color-text-dark, #1a1a1a);
  }

  .theme-button:focus-visible {
    outline: 2px solid var(--color-chyron-separator, #bfc8f6);
    outline-offset: 2px;
  }

  .theme-icon {
    font-size: 1rem;
  }

  .theme-label {
    font-weight: 500;
  }

  .dropdown-arrow {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .theme-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.25rem;
    background: var(--color-chyron-surface, #1a1a1a);
    border: 2px solid var(--color-chyron-separator, #bfc8f6);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
  }

  .theme-option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    color: var(--color-text-light, #ffffff);
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease;
  }

  .theme-option:hover {
    background: var(--color-chyron-separator, #bfc8f6);
    color: var(--color-text-dark, #1a1a1a);
  }

  .theme-option.active {
    background: var(--color-breaking-news-background, #ff0000);
    color: var(--color-text-light, #ffffff);
  }

  .theme-option:focus-visible {
    outline: 2px solid var(--color-chyron-separator, #bfc8f6);
    outline-offset: -2px;
  }

  .theme-name {
    font-weight: 600;
    font-size: 0.875rem;
  }

  .theme-description {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-top: 0.25rem;
  }

  /* Animation for dropdown */
  .theme-dropdown {
    animation: slideDown 0.2s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
