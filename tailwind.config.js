/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dash: {
          bg: '#f0f0f0',
          dark: '#111111',
          orange: '#d95a25',
          light: '#f5f5f5',
          white: '#ffffff',
          text: '#111111',
          textmuted: '#888888',
          // Dark mode specific
          darkbg: '#0a0a0a',
          darkcard: '#1a1a1a',
          darktext: '#f0f0f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}