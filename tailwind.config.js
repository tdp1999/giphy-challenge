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
      // gw = grid width
      width: {
        "gw-xs": "480px",
        "gw-sm": "560px",
        "gw-md": "840px",
        "gw-lg": "1080px",
        "gw-xl": "1280px",
      },
      screens: {
        "gw-sm": "600px",
        "gw-md": "960px",
        "gw-lg": "1280px",
        "gw-xl": "1920px",
      },
    },
  },
  plugins: [],
};
