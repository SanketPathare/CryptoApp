/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "gold",
      },
      animation: {
        shine: "shine 9s infinite linear",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "0" },
          "60%": { "background-position": "1000px" },
          "100%": { "background-position": "100px" },
        },
      },
    },
  },
  plugins: [],
}
