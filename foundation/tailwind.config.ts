import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // The token names the ROLE, not the face. `--font-zen-sans` is bound by
      // @hanzo/font in _app.tsx; nothing here spells a family.
      // `@hanzo/font` defines --font-zen-sans on the element it wraps, and
      // custom properties inherit DOWNWARDS only — so above that wrapper the
      // var is undefined, `var(--font-zen-sans)` computes to nothing, and the
      // declaration falls back to the initial value. That is how `body` came
      // to render in Times New Roman on a page that had Zen loaded. The
      // fallback names the loaded family, so the stack is valid everywhere.
      fontFamily: {
        primary: ['var(--font-zen-sans, Zen)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-zen-sans, Zen)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-zen-mono, ZenMono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          foreground: "var(--brand-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          // Legacy colors
          50: "rgb(var(--tw-color-primary-50) / <alpha-value>)",
          100: "rgb(var(--tw-color-primary-100) / <alpha-value>)",
          200: "rgb(var(--tw-color-primary-200) / <alpha-value>)",
          300: "rgb(var(--tw-color-primary-300) / <alpha-value>)",
          400: "rgb(var(--tw-color-primary-400) / <alpha-value>)",
          500: "rgb(var(--tw-color-primary-500) / <alpha-value>)",
          600: "rgb(var(--tw-color-primary-600) / <alpha-value>)",
          700: "rgb(var(--tw-color-primary-700) / <alpha-value>)",
          800: "rgb(var(--tw-color-primary-800) / <alpha-value>)",
          900: "rgb(var(--tw-color-primary-900) / <alpha-value>)",
          950: "rgb(var(--tw-color-primary-950) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        dark: '#222222',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
