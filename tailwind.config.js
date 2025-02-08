/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "rgba(255, 255, 255, 0.2)",
        background: "#000000",
        foreground: "#FFFFFF",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 