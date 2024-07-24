import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7A3BFF',
        secondary: '#DDE20A',
        'secondary-active': '#E9EE19',
      },
      textColor: {
        default: '#210E4A',
        primary: '#7A3BFF',
        accent: '#7A3BFF',
      },
    },
  },
  plugins: [],
} satisfies Config
