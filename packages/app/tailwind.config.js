module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    gradientColorStops: (theme) => ({
      ...theme('colors'),

      primary: 'rgb(140, 79, 248)',

      secondary: 'rgb(44, 47, 54)',
      altBlue: 'rgb(80, 144, 234)',
      pink: '#f338c3',
      danger: '#e3342f',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
