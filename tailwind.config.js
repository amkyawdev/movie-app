/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './auth/*.html',
    './pages/*.html',
    './components/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0a0a0a',
        'bg-secondary':  '#111111',
        'bg-card':       '#181818',
        'bg-elevated':   '#222222',
        'accent-gold':   '#FFB800',
        'accent-orange': '#F97316',
        'accent-blue':   '#2563EB',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'cursive'],
        body:    ['"DM Sans"', 'sans-serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease forwards',
        'slide-right': 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) forwards',
        'shimmer':     'shimmer 1.5s infinite',
        'pulse-slow':  'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:        { from: { opacity: '0' }, to: { opacity: '1' } },
        slideInRight:  { from: { opacity: '0', transform: 'translateX(40px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        shimmer:       { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      aspectRatio: { 'poster': '2 / 3', 'banner': '16 / 9' },
      boxShadow: {
        'card':  '0 8px 32px rgba(0,0,0,0.6)',
        'glow':  '0 0 20px rgba(255,184,0,0.25)',
        'inner': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
