/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "theme-black-88": "#1F1F1F",
        "theme-black-80": "#333333",
        "theme-white-80": "#CCCCCC",
        "theme-white-90": "#F7F7F7",
        "theme-white": "#FFFFFF",
        "theme-primary": "#5A96E3",
        "theme-accent": "#FF9657",
      },
    },
  },
  plugins: [],
};
