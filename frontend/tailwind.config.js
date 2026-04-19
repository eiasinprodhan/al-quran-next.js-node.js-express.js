/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#022c22",
        },
      },
      fontFamily: {
        amiri: ["Amiri", "serif"],
        scheherazade: ["Scheherazade New", "serif"],
        noto: ["Noto Naskh Arabic", "serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease both",
        "slide-in": "slideInRight 0.3s ease both",
      },
    },
  },
  plugins: [],
};