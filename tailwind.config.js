/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          green: '#073D31',
          dark: '#0B3028',
          secondary: '#174F3E',
          ivory: '#F5EEDC',
          paper: '#FBF7EA',
          orange: '#E65324',
          sun: '#F47A27',
          ink: '#102D27',
          muted: '#769487',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'goa-card': '0 8px 30px rgba(7, 61, 49, 0.12)',
        'goa-btn': '0 4px 14px rgba(230, 83, 36, 0.3)',
      }
    },
  },
  plugins: [],
}
