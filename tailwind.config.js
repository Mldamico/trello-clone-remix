/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#191D32",
        lightPrimary: "#F7D488",
        lightSecondary: "#F6AE2D",
        lightAccent: "#FFA630",
        bgWhite: "#EEEEEE",
        error: "#ef5350",
      },
    },
  },
  plugins: [],
};
