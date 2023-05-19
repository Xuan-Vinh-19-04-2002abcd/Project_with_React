/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        oil: {
          primary: '#191919', // Màu chính
          secondary: '#8B8B8B', // Màu phụ
        },
      }
    },
  },
  plugins: [],
}