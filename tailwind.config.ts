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
        'dark-foreground': 'hsl(var(--dark--foreground))',
        'dark-background': 'hsl(var(--dark-background))',
      },
      textColor: {
        default: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        dark: 'hsl(var(--dark-foreground))',
      },
      background: {
        default: 'hsl(var(--background))',
        dark: 'hsl(var(--dark-background))',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
} satisfies Config
