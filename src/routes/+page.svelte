<script>
  import { ChyronWrapper } from '$lib';
</script>

<div class="image-container">
  <img src="/imgs/IMG_7689.jpg" alt="Stop Sign">
  <div class="overlay"></div>
</div>

<ChyronWrapper headline logoLeft />

<style>
  .image-container {
    position: relative;
  }

  .image-container img {
    width: 100%;
    display: block;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
</style>