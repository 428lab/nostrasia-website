import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        'secondary-active': 'hsl(var(--secondary-active))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      textColor: {
        default: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
      },
      background: 'hsl(var(--background))',
    },
  },
  plugins: [],
} satisfies Config
