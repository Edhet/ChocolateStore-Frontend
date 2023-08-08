/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        marko: ['Marko One', 'serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        light: '#FBF6EB',
        dark: '#50251F',
        caramel: '#C9660A'
      }
    },
  },
  plugins: [],
}

