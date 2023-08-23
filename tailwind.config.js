const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,md,mdx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Gotham SSm A, sans-serif']
    },
    extend: {
      animation: {
        'cascade': 'cascade 0.2s linear'
      },
      keyframes: {
        'cascade': {
          '0%': {
            transform: 'scaleY(0.4)',
            'transform-origin': 'center top'
          },
          '100%': {
            transform: 'scaleY(1)',
            'transform-origin': 'center top'
          }
        }
      }
    }
  },
  darkMode: 'class',
  mode: 'jit',
  plugins: [nextui()]
}
