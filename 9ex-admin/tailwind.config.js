/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141414',
        'ink-soft': '#1c1c1c',
        paper: '#f5f2ea',
        brass: '#8a6f2e',
        'brass-bright': '#c9a84c',
        blood: '#7a1f1f',
      },
    },
  },
  plugins: [],
};
