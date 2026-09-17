import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // K Mart brand palette — from the approved mockups
        kmart: {
          navy: '#1B2A5B',
          red: '#E11B22',
          lightblue: '#EAF2FB',
          gray: '#F5F6F8',
        },
      },
    },
  },
  plugins: [],
}
export default config
