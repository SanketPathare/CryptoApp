/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#10B981",
        "gold-dark": "#059669",
        brand: {
          primary: "#10B981",
          secondary: "#06B6D4",
          "secondary-dark": "#0891B2",
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
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        signal: {
          green: "#34d399",
          red: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        shine: "shine 9s infinite linear",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "depth-pulse": "depth-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "0" },
          "60%": { "background-position": "1000px" },
          "100%": { "background-position": "100px" },
        },
        "live-pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "depth-pulse": {
          "0%, 100%": { boxShadow: "0 8px 32px rgba(16,185,129,0.1)" },
          "50%": { boxShadow: "0 12px 48px rgba(16,185,129,0.2)" },
        },
      },
      backdropBlur: {
        glass: "16px",
        "glass-lg": "24px",
        "glass-sm": "8px",
      },
    },
  },
  plugins: [],
}
