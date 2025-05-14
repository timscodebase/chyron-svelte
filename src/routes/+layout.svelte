<script lang="ts">
  export const prerender = true;
  import './base.css';
  import 'iconify-icon';

  let { children } = $props();
</script>

{@render children()}