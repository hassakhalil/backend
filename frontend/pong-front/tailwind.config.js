/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
        'rubik-moonrocks': ['Rubik Moonrocks', 'sans'],
      },
    },
    screens: {
      'xs': '640px',
    },
  },
  plugins: [
    require('tailwindcss-background-images'),
  ],
}