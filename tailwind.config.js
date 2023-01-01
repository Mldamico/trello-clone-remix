/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#191D32",
        lightPrimary: "#e0e0e0",
        bgWhite: "#EEEEEE",
        error: "#ef5350",
      },
    },
  },
  plugins: [],
};
