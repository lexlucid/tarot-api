/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        mystic: {
          dark: '#1a1a2e',
          accent: '#8b4513',
          gold: '#ffd700'
        }
      },
      fontFamily: {
        mystical: ['Cinzel', 'serif']
      }
    }
  },
  plugins: []
}