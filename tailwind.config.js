module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFA07A', // Light Salmon
          dark: '#E9967A', // Dark Salmon (for dark mode)
        },
      },
    },
  },
  plugins: [],
}