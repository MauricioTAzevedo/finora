/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        primary: {
          DEFAULT: '#059669', // Emerald accent
          hover: '#047857',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0f172a', // Slate graphite
          foreground: '#f8fafc',
        },
        warning: {
          DEFAULT: '#d97706', // Amber
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#dc2626', // Red
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
