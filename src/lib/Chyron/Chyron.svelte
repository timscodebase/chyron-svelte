<script lang="ts">
  let { headlines } = $props() as { headlines: string[] };

  let chyronText = headlines?.join(' | ');
</script>

<div class="chyron">
  <p>{chyronText} | {chyronText}</p>
</div>

<style>
  .chyron {
    grid-area: chyron;
    display: flex;
    place-items: center;
    justify-content: center;
    background-color: var(--color-chyron-surface);
    border: var(--border-chyron);
    color: white;
    font-size: 1.5rem;
    border-radius: 1rem;
    overflow: hidden;
    white-space: nowrap;

    p {
      display: inline-block;
      font-size: 2rem;
      animation: scroll 60s linear infinite;
      padding: 0;
      margin: 0;
    }
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%); /* Move only half the width since text is doubled */
    }
  }
</style>