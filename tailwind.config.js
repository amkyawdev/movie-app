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
        'gold':   '#FFB800',
        'brand':  '#F97316',
        'dark':   '#0a0a0a',
        'card':   '#181818',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'cursive'],
        body:    ['"DM Sans"', 'sans-serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
