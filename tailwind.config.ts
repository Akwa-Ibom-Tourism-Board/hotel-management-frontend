import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#00563b',
        primaryOrange: '#e77818',
      },
    },
  },
  plugins: [],
}
export default config