/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.lime,
      blue: colors.indigo,
      purple: colors.violet,
    },
  extend: {
    fontFamily: {
      sans: ['IBM Plex Sans'],
    },
      // ...
    },
  },
	plugins: [],
};
