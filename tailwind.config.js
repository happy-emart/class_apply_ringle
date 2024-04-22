/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ringle-purple': '#8B00FF',
        'ringle-purple-lighter': '#9274FC',
        'ringle-purple-lightest': '#D4A2FF',
      },
    },
  },
  plugins: [],
}

