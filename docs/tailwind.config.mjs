/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mystic: {
          dark: '#1d142f',
          medium: '#4a347b',
          light: '#cfcbfa',
          accent: '#8b4513',
          gold: '#ffd700',
          golden: '#fff441'
        }
      },
      fontFamily: {
        mystical: ['Cinzel', 'serif']
      }
    }
  },
  plugins: []
}