/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Extend theme settings here if needed
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities(
        {
          // Custom utilities for hiding scrollbars
          '.hide-scrollbar': {
            /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
            '::-webkit-scrollbar': {
              display: 'none',
            },
            /* Hide scrollbar for Firefox */
            'scrollbar-width': 'none',
            /* Hide scrollbar for IE and Edge */
            '-ms-overflow-style': 'none',
          },
          // Custom utilities for text wrapping
          '.break-words': {
            'overflow-wrap': 'break-word',
            'word-break': 'break-word',
            'hyphens': 'auto',
          },
        },
        ['responsive', 'hover'] // Optional: add variants if needed
      )
    }
  ],
}
