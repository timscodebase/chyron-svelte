import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      strict: false // Ignore dynamic routes (use cautiously)
    })
  }
};

export default config;
