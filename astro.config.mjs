import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://softpanda.de/',
  integrations: [tailwind()],
  // enable this for local development
  // server: { host: true },
});
