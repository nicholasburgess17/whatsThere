/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#204a89',
        'secondary': '#cdbca8',
        'tertiary': '#3f6074',
      },
    },
  },
  plugins: [],
}

