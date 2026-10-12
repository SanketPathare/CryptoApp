/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "var(--color-spot)",
        "gold-dark": "var(--color-spot-deep)",
        spot: {
          DEFAULT: "var(--color-spot)",
          deep: "var(--color-spot-deep)",
        },
        brand: {
          primary: "var(--color-spot)",
          secondary: "var(--color-secondary-ink)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          secondary: "var(--color-surface-secondary)",
        },
        glass: {
          DEFAULT: "var(--color-glass)",
          hover: "var(--color-glass-hover)",
          border: "var(--color-glass-border)",
        },
        rule: "var(--color-rule)",
        tint: "var(--color-tint)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        signal: {
          green: "var(--color-up)",
          red: "var(--color-down)",
        },
        up: "var(--color-up)",
        down: "var(--color-down)",
      },
      fontFamily: {
        sans: ['"Archivo"', "system-ui", "sans-serif"],
        display: ['"Bodoni Moda"', '"Times New Roman"', "serif"],
        mono: ['"Spline Sans Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
