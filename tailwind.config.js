/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        font: '#32353b',
        primary: {
          1: '#f7fff9',
          10: '#daffe6',
          100: '#b5ffd0',
          200: '#8aff9a',
          300: '#60ff65',
          400: '#3eff31',
          500: '#049d52',
          600: '#00754d',
          700: '#005439',
          800: '#003828',
          900: '#001c14'
        }
      }
    },
  },
  plugins: [],
}
