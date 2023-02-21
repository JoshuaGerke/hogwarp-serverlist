/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "btn": "url('/img/button.png')",
                "desktopbg": "url('/img/bg.png')",
                "mobilebg": "url('/img/bgmobile.png')",
            },
            colors: {
                "baseFont": "rgb(255, 228, 184)",
                "baseFontHover": "rgb(255, 205, 107)",
            }
        },
    },
    plugins: [],
}
