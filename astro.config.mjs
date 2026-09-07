import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://heyitsbrookeash.com',
  output: 'hybrid',
  adapter: netlify(),
});
