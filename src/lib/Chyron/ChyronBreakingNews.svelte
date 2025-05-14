<script lang="ts">
  let breakingHeadline = 'Breaking News: Major Event Unfolds';
</script>

<div class="breaking-news">
  <p class="aldrich-regular breaking">BREAKING NEWS</p>
</div>

<style>
  .breaking-news {
    grid-area: breaking;
    align-content: center;
    border-radius: var(--size-border-radius);
    background-color: var(--color-breaking-news-background);

    .breaking {
      font-size: var(--font-size-breaking-news);
      font-weight: var(--font-weight-breaking-news);
      color: var(--color-text-light);
    }
  }
</style>