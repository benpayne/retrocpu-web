import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://retrocpu.io',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
