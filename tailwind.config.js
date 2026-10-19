/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        warmbg: '#1d1a18',
        warmbgSoft: '#2d2926',
        warmpanel: '#3a3532',
        warmcard: '#4a4542',
        warmink: '#f4efe9',
        warmmuted: '#d7d0c9',
        warmline: 'rgba(255,255,255,0.12)',
        accent: '#da7d48',
        accentSoft: '#e59a69',
        ring: '#f0d5b8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 24px 60px rgba(20, 17, 12, 0.26)',
      },
      borderRadius: {
        xl2: '1.5rem',
      },
    },
  },
  plugins: [],
}
