/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        18: '4.5rem',
        13: '3.3rem'
      }
    }
  },
  plugins: []
}
