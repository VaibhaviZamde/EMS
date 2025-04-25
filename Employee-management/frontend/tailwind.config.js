/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",           // this is important!
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "ant" :["Anton",'sans-serif']
      }
    },
  },
  plugins: [],
}
