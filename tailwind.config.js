/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "B1":"#171719",
        "B2":"#212124",
        "B3":"#1F1F22",
        "TW1":"#FCFCFC",
        
      }
    },
  },
  plugins: [],
}