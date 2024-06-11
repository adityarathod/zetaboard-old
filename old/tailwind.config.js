module.exports = {
  purge: ['./pages/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        royal: '#00296B',
        cream: '#EAFDF8',
        fire: '#C1292E',
        mustard: '#F1D302',
        camel: '#AC9969',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
