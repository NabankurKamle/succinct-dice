/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkTheme: "#ff69b4",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
