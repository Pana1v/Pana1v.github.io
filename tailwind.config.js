/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['EB Garamond', 'serif'],
      },
      colors: {
        'gold': {
          300: '#ffd700',
          400: '#ffcc00',
        },
      },
    },
  },
  plugins: [],
};