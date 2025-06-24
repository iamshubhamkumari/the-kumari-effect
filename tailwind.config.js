/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        secondary: "#1e293b",
        dark: "#0f172a",
        light: "#f8fafc",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neumorph': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neumorph-inset': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff'
      },
    },
  },
  plugins: [],
}