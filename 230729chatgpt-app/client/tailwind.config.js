/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          210: '#D8EFE3',
          410: '#8FDBB5',
          420: '#B2E7CE',
          430: '#aad4c7',
          510: '#6dc0a9',
        },
        yellow: {
          510: '#f4d6b8',
          520: '#f7a65e',
        },
        grey: {
          110: '#e6e6e6',
          120: '#FFF8F9',
        }
      },
      fontFamily:{
        yomogi: ['Yomogi'],
        ubuntu: ['Ubuntu'],
      },
    },
  },
  plugins: [],
}

