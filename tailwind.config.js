/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zocay: {
          950: '#060a08',
          900: '#0b1310',
          850: '#111c17',
          800: '#17251f',
          700: '#23382f',
          600: '#324e42',
          500: '#466d5d',
          accent: '#22c55e',
          accentLight: '#4ade80',
          emerald: '#10b981',
          sand: '#e8e2d8',
          clay: '#a39889',
          gold: '#d4af37',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widestEditorial: '0.22em',
        wideEditorial: '0.15em',
      },
      lineHeight: {
        tightEditorial: '1.12',
      }
    },
  },
  plugins: [],
}
