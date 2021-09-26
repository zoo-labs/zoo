module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        0: '0ms',
        3000: '3000ms',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      borderColor: ['hover', 'focus'],
      borderSolid: ['hover', 'focus'],
      transform: ['hover', 'focus'],
      visibility: ['hover', 'focus'],
      scale: ['active', 'group-hover'],
    },
  },
  plugins: [],
}
