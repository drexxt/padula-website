/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'padula': {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfe',
          300: '#7cc3fd',
          400: '#36a5fa',
          500: '#0c87eb',
          600: '#0069c9',
          700: '#0153a3',
          800: '#064786',
          900: '#0b3b6f',
          950: '#07254a',
        },
        'padula-navy': {
          50: '#f3f6f9',
          100: '#e6ecf2',
          200: '#c8d6e3',
          300: '#9bb5ca',
          400: '#678fab',
          500: '#477290',
          600: '#365b78',
          700: '#2e4a62',
          800: '#294053',
          900: '#263746',
          950: '#1a242e',
        },
      },
    },
  },
  plugins: [],
};
