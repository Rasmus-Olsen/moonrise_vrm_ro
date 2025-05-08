/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: '#141A24',
        navy: '#062A68',
        blue: '#175E9C',
        purple: '#760AF4',
        white: '#FEFCED',
      },
      fontFamily: {
        primary: ['Outfit', 'sans-serif'],
        secondary: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
