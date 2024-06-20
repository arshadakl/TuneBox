/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        "B1":"#171719",
        "B2":"#212124",
        "B3":"#1F1F22",
        "TW1":"#FCFCFC",
        
      },
      fontFamily: {
        F1: ['Plus Jakarta Sans', 'sans-serif'],
        F2: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'media'
}