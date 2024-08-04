import typography from '@tailwindcss/typography'

import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(var(--primary), <alpha-value>)',
        secondary: 'hsla(var(--secondary), <alpha-value>)',
        'secondary-active': 'hsla(var(--secondary-active), <alpha-value>)',
        background: 'hsla(var(--background), <alpha-value>)',
        foreground: 'hsla(var(--foreground), <alpha-value>)',
        'dark-foreground': 'hsla(var(--dark--foreground), <alpha-value>)',
        'dark-background': 'hsla(var(--dark-background), <alpha-value>)',
      },
      textColor: {
        default: 'hsla(var(--foreground), <alpha-value>)',
        primary: 'hsla(var(--primary), <alpha-value>)',
        dark: 'hsla(var(--dark-foreground), <alpha-value>)',
      },
      background: {
        default: 'hsla(var(--background), <alpha-value>)',
        dark: 'hsla(var(--dark-background), <alpha-value>)',
      },
    },
  },
  plugins: [typography],
  darkMode: 'media',
} satisfies Config
