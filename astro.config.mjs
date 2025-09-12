import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://softpanda.de/',
  vite: {
    plugins: [tailwindcss()],
  },
  // enable this for local development
  // server: { host: true },
});