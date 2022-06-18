import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [preact()],
	integrations: [tailwind()],
});

{
	site: 'https://kylejohnston.github.io/'
}
{
	base: '/recipes'
}
