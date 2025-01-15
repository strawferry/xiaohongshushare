import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0f2',
          100: '#ffe1e6',
          200: '#ffc8d1',
          300: '#ffa3b2',
          400: '#ff6c85',
          500: '#ff2e4d', // 主色
          600: '#ed1133',
          700: '#c80d2b',
          800: '#a50f29',
          900: '#8a1328',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
