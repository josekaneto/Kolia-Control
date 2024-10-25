/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "verde": "#3AB64B"
      },
      fontFamily:{
        "main": ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}