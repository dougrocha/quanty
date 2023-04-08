const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './theme.config.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDownAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideRightAndFade: {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      willChange: {
        opacity: 'opacity',
        'transform-opacity': 'transform, opacity',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
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
        theme: {
          primary: '#6635F0',
          secondary: '#C335F0',
          accent: '#3562F0',
          neutral: '#2B303A',
          base: '#17151E',
          info: '#2196F3',
          success: '#35F066',
          warning: '#FFC107',
          error: '#F06635',
        },
        'dark-purple': {
          50: '#E6E4EC',
          100: '#CCC9D9',
          200: '#9C96B5',
          300: '#6B638D',
          400: '#443F5A',
          500: '#1C1A25',
          600: '#17151E',
          700: '#100F15',
          800: '#0B0B0F',
          900: '#050406',
        },
        'dark-gray': {
          50: '#f7f7f8',
          100: '#eeedf1',
          200: '#d8d7e0',
          300: '#b6b5c4',
          400: '#7f7e99',
          500: '#6f6e89',
          600: '#5a5871',
          700: '#4a485c',
          800: '#403e4e',
          900: '#383743',
        },
        purple: {
          50: '#f0f3fd',
          100: '#e4e9fb',
          200: '#cfd6f6',
          300: '#b2bbef',
          400: '#9298e7',
          500: '#8585e0',
          600: '#655dce',
          700: '#574db5',
          800: '#484192',
          900: '#3d3a75',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('daisyui'),
    require('@headlessui/tailwindcss'),
    require('tailwindcss-radix')(),
  ],
}
