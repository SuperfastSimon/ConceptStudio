import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cs: {
          bg: 'var(--cs-bg)',
          card: 'var(--cs-card)',
          border: 'var(--cs-border)',
          text: 'var(--cs-text)',
          'text-muted': 'var(--cs-text-muted)',
          accent: 'var(--cs-accent)',
          'accent-hover': 'var(--cs-accent-hover)',
          success: 'var(--cs-success)',
        },
      },
    },
  },
  plugins: [],
}

export default config