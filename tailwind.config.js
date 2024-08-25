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
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.overflow-wrap-anywhere': {
          'overflow-wrap': 'anywhere',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}