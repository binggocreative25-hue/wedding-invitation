/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory:       '#FAF7F2',
        cream:       '#F0E8DF',
        brown:       '#2C1A0E',
        'brown-light': '#5C3D2E',
        gold:        '#B8965A',
        'gold-light': '#D4B47A',
        rose:        '#C9A99A',
        'rose-light': '#EAD9D3',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body:    ['var(--font-jost)', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.9s ease forwards',
        'fade-in':   'fadeIn 1s ease forwards',
        'slide-up':  'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
