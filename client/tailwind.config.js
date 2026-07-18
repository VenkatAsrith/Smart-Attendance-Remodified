/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F7FA',
          100: '#E5E4E2', // Alabaster Grey
          200: '#C2C9D1',
          300: '#99A6B3',
          400: '#758796',
          500: '#536878', // Blue Slate
          600: '#425361',
          700: '#33404B',
          800: '#242D36',
          900: '#151C22',
          950: '#0A0A0A', // Onyx
        },
        onyx: '#0A0A0A',
        blueSlate: '#536878',
        alabaster: '#E5E4E2',
        surfaceDark: '#14171E',
        cardDark: '#1A1E27',
        glassBg: 'rgba(20, 23, 30, 0.95)',
        glassBorder: 'rgba(83, 104, 120, 0.25)',
        mutedText: '#C8C8D4',
        successAcc: '#22C55E',
        dangerAcc: '#EF4444',
        warningAcc: '#FACC15'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(83, 104, 120, 0.2)',
        'glow-md': '0 0 30px rgba(83, 104, 120, 0.3)',
        'glow-lg': '0 0 50px rgba(83, 104, 120, 0.4)',
        'glass-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6)'
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
