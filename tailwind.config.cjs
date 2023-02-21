/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "btn": "url('img/button.png')",
        "desktopbg": "url('img/bg.png')",
        "mobilebg": "url('img/bgmobile.png')",
      },
      colors: {
        "baseFont": "rgb(255, 228, 184)",
        "baseFontHover": "rgb(255, 205, 107)",
      }
    },
  },
  plugins: [],
}