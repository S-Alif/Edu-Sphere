/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'sm': { 'min': '641px' },
        'md': { 'min': '769px' },
        'lg': { 'min': '1025px' },
        'xl': { 'min': '1281px' },
        '2xl': { 'min': '1537px' },
      },
    },
  },
  plugins: [require("daisyui")],
}