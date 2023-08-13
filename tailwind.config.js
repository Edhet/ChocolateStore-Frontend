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
        lightHover: '#bcada6',
        dark: '#50251F',
        darkHover: '#3d1f1b',
        caramel: '#C9660A',
        alert: '#d33737'
      }
    },
  },
  plugins: [],
}

