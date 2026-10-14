/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#4A0E1C", deep: "#33090F", soft: "#6B1B2B" },
        gold: { DEFAULT: "#C8963E", light: "#E2C27D", dark: "#9C7229" },
        ivory: { DEFAULT: "#FBF6EC", dark: "#F1E8D6" },
        peacock: "#0F3B3A",
        ink: "#2A1A16",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { rise: "rise 0.9s ease-out both" },
    },
  },
  plugins: [],
};
