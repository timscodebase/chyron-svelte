<script lang="ts">
  let breakingHeadline = 'Breaking News: Major Event Unfolds';
</script>

<div class="breaking-news" style:container-name="breaking-container" style:container-type="size">
  <p class="aldrich-regular breaking">BREAKING NEWS</p>
</div>

<style>
  .breaking-news {
    grid-area: breaking;
    align-content: center;
    border-radius: var(--size-border-radius);
    background-color: var(--color-breaking-news-background);
    /* Ensure the container has a defined height */
    height: 100%;
    /* Define the container for queries */
    container-name: breaking-container;
    container-type: size;
    box-shadow: var(--shadow);
  }

  /* Default styles for the breaking text */
  .breaking {
    font-weight: var(--font-weight-breaking-news);
    color: var(--color-text-light);
    text-align: center;
    padding: 1rem 0;
    /* Fallback font-size if container queries fail */
    font-size: calc(var(--logo-size, 175px) * 0.35);
  }

  /* Container query to adjust font-size based on the container's block-size (height) */
  @container breaking-container (block-size >= 0px) {
    .breaking {
      font-size: clamp(20px, calc(var(--logo-size, 175px) * 0.25), 40px);
    }
  }

  @container breaking-container (block-size >= 100px) {
    .breaking {
      font-size: clamp(24px, calc(var(--logo-size, 175px) * 0.35), 48px);
    }
  }

  @container breaking-container (block-size >= 150px) {
    .breaking {
      font-size: clamp(28px, calc(var(--logo-size, 175px) * 0.45), 56px);
    }
  }
</style>