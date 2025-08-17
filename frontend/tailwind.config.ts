import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primaryDark': 'var(--primaryDark)',
        'primaryHover': 'var(--primaryHover)',
        'primaryDarkHover': 'var(--primaryDarkHover)',
        'background': 'var(--background)',
        'text': 'var(--text)',
        'background-glass': 'var(--background-glass)',
        'text-glass': 'var(--text-glass)',
        'primary-glass': 'var(--primary-glass)',
        'primaryDark-glass': 'var(--primaryDark-glass)',
        'primaryHover-glass': 'var(--primaryHover-glass)',
        'primaryDarkHover-glass': 'var(--primaryDarkHover-glass)',
      },
      fontFamily: {
        geistMono: ['var(--inter)', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
