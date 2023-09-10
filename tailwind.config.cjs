const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,md,mdx,ts,tsx,astro}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Gotham SSm A, sans-serif']
    },
    extend: {
      animation: {
        cascade: 'cascade 0.2s linear',
        'scale-up-top-left': 'scale-up-top-left 0.4s',
        'scale-up-top': 'scale-up-top 0.4s'
      },
      keyframes: {
        cascade: {
          '0%': {
            transform: 'scaleY(0.4)',
            'transform-origin': 'center top'
          },
          '100%': {
            transform: 'scaleY(1)',
            'transform-origin': 'center top'
          }
        },
        'scale-up-top-left': {
          '0%': {
            transform: 'scale(0.5)',
            'transform-origin': 'left top'
          },
          '100%': {
            transform: 'scale(1)',
            'transform-origin': 'left top'
          }
        },
        'scale-up-top': {
          '0%': {
            transform: 'scale(0.5)',
            'transform-origin': 'top center'
          },
          '100%': {
            transform: 'scale(1)',
            'transform-origin': 'top center'
          }
        }
      }
    }
  },
  darkMode: 'class',
  mode: 'jit',
  plugins: [nextui()]
}