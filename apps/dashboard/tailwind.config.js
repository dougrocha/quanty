// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          darkPurpleBg: '#1C1A25',
          'lime-green': '#7BFF88',
          'pale-purple': '#3B3256',
          yellow: '#FFD233',
          white: '#F8F8F8',
          'purple-10': '#3E3A4B',
          'purple-20': '#494555',
          'purple-6': '#363243',
          'bright-purple': '#6635F0',
        },
        secondary: { white: '#AEAEAE' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
