/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Primary display font - elegant, editorial headlines
        'display': ['Playfair Display', 'Georgia', 'serif'],
        // Body text - refined, readable serif
        'serif': ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        // Code/technical snippets
        'mono': ['Source Code Pro', 'Consolas', 'monospace'],
      },
      colors: {
        // Scholarly cream/ivory tones
        'ivory': {
          50: '#fdfcf9',
          100: '#faf8f3',
          200: '#f5f0e6',
          300: '#ebe4d4',
          400: '#ddd3be',
        },
        // Deep scholarly navy
        'navy': {
          700: '#1e2a3a',
          800: '#162230',
          900: '#0f1825',
        },
        // Antique gold accents
        'gold': {
          300: '#d4af37',
          400: '#c5a028',
          500: '#a8871f',
          600: '#8b6f19',
        },
        // Warm bronze
        'bronze': {
          400: '#b08d57',
          500: '#9a7a4a',
        },
        // Rich ink tones for text
        'ink': {
          600: '#3d3d3d',
          700: '#2d2d2d',
          800: '#1a1a2e',
          900: '#0f0f1a',
        },
        // Accent colors
        'burgundy': {
          500: '#722f37',
          600: '#5c262d',
        },
        'forest': {
          500: '#2d4a3e',
          600: '#243d33',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
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
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 48px rgba(0, 0, 0, 0.08)',
        'inner-gold': 'inset 0 0 0 1px rgba(197, 160, 40, 0.15)',
      },
      letterSpacing: {
        'scholarly': '0.04em',
        'wide-editorial': '0.12em',
      },
    },
  },
  plugins: [],
};