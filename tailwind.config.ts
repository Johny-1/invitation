import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fcfaf2',
          100: '#f8f3df',
          200: '#f1e6be',
          300: '#e7d393',
          400: '#dbba66',
          500: '#d4af37',
          600: '#b88b28',
          700: '#936920',
          800: '#79541f',
          900: '#67461e',
          950: '#3c250d',
        },
        obsidian: {
          800: '#161922',
          900: '#0c0e14',
          950: '#06070a',
        },
        emerald: {
          900: '#064e3b',
          950: '#022c22',
        },
        burgundy: {
          800: '#4a0e17',
          900: '#2d080e',
          950: '#1a0408',
        },
        navy: {
          900: '#0b1329',
          950: '#060a17',
        }
      },
      fontFamily: {
        amiri: ['var(--font-amiri)', 'serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        reem: ['var(--font-reem)', 'sans-serif'],
        aref: ['var(--font-aref)', 'serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px -2px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 8px 25px -4px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 20px 45px -10px rgba(212, 175, 55, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        glow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s infinite linear',
      }
    },
  },
  plugins: [],
};
export default config;
