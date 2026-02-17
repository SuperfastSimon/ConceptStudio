import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cs-bg': 'var(--cs-bg)',
        'cs-card': 'var(--cs-card)',
        'cs-border': 'var(--cs-border)',
        'cs-text': 'var(--cs-text)',
        'cs-text-muted': 'var(--cs-text-muted)',
        'cs-accent': 'var(--cs-accent)',
        'cs-accent-hover': 'var(--cs-accent-hover)',
      },
    },
  },
  plugins: [],
}
export default config