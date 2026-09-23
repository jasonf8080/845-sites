/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f2d3d',
        secondary: '#2d3d51',
        accent: '#e28b4c',
        paper: '#f5f3ee',
        ink: '#1e2430',
        muted: '#697384',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
