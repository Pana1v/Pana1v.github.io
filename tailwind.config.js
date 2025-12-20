/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['EB Garamond', 'Georgia', 'Times New Roman', 'serif'],
        'garamond': ['EB Garamond', 'serif'],
      },
      colors: {
        'parchment': {
          50: '#fdfcfa',
          100: '#faf8f5',
          200: '#f5f1eb',
          300: '#eee8de',
          400: '#e0d6c8',
        },
        'gold': {
          300: '#d4a853',
          400: '#b8860b',
          500: '#996515',
          600: '#7a5011',
        },
        'bronze': {
          400: '#cd7f32',
          500: '#a66628',
        },
        'ink': {
          700: '#2d2d2d',
          800: '#1a1a2e',
          900: '#0f0f1a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};