/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#00ff9b',
        'primary-dark': '#00cc7c',
        'secondary': '#2d6ae3',
        'dark-bg': '#0a0a0f',
        'dark-card': '#121218',
        'dark-border': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'subtle-shine': 'subtleShine 5s infinite ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtleShine: {
          '0%, 100%': { 'box-shadow': '0 0 10px -5px rgba(0, 255, 155, 0)' },
          '50%': { 'box-shadow': '0 0 40px -10px rgba(0, 255, 155, 0.3)' },
        }
      }
    }
  },
  plugins: [],
}
