/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        churchBlack: "#0B0B0B",
        churchGold: "#D4AF37",
        churchMuted: "#BEBEBE",
      },
      fontFamily: {
        serifHead: ['"Playfair Display"', "serif"],
        ui: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
