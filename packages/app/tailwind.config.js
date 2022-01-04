const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  // important: '#__next',
  // darkMode: true,
  mode: "jit",
  // future: {
  //   purgeLayersByDefault: true,
  //   applyComplexClasses: true,
  // },
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      linearBorderGradients: {
        directions: {
          tr: "to top right",
          r: "to right",
          t: 'to top',
          b: 'to bottom'
        },
        colors: {
          "blue-pink": ["#27B0E6", "#FA52A0"],
          "pink-red-light-brown": ["#FE5A75", "#FEC464"],
          "purple-blue": ["#462CA9", "#2517FF"]
        },
        background: {
          "dark-1000": "#0D0415",
          "dark-900": "#161522",
          "dark-800": "#202231",
          "dark-pink-red": "#4e3034",
        },
        border: {
          1: "1px",
          2: "2px",
          3: "3px",
          4: "4px",
        },
      },
      backgroundImage: {
        'marketplace-section': "url(/img/leaves.png)"
      },
      colors: {
        purple: "#462CA9",
        purple100: '#8C4FF8;',
        grey:"#777E91",
        grey100:"#F7F8FC",
        pink: "#f338c3",
        red: "crimson",
        yellow: "#ffd166",
        green: "#14F195",
        blue: "#2517FF",
        black: "#000000",
        black100: '#1F2030',
        white: "#fff"
      },
      lineHeight: {
        "48px": "48px",
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        hero: [
          "48px",
          {
            letterSpacing: "-0.02em;",
            lineHeight: "96px",
            fontWeight: 700,
          },
        ],
      },
      borderRadius: {
        none: "0",
        px: "1px",
        DEFAULT: "0.625rem",
      },
      boxShadow: {
        swap: "0px 50px 250px -47px rgba(39, 176, 230, 0.29)",
        liquidity: "0px 50px 250px -47px rgba(123, 97, 255, 0.23)",
        "pink-glow": "0px 57px 90px -47px rgba(250, 82, 160, 0.15)",
        "blue-glow": "0px 57px 90px -47px rgba(39, 176, 230, 0.17)",
        "pink-glow-hovered": "0px 57px 90px -47px rgba(250, 82, 160, 0.30)",
        "blue-glow-hovered": "0px 57px 90px -47px rgba(39, 176, 230, 0.34)",
      },
      ringWidth: {
        DEFAULT: "1px",
      },
      padding: {
        px: "1px",
        "3px": "3px",
      },
      minHeight: {
        empty: "128px",
        cardContent: "230px",
        fitContent: "fit-content",
      },
      minHeight: {
        5: "1.25rem",
      },
      minWidth: {
        5: "1.25rem",
      },
      dropShadow: {
        currencyLogo: "0px 3px 6px rgba(15, 15, 15, 0.25)",
      },
      screens: {
        "3xl": "1600px",
      },
      animation: {
        ellipsis: "ellipsis 1.25s infinite",
        "spin-slow": "spin 2s linear infinite",
        fade: "opacity 150ms linear",
      },
      keyframes: {
        ellipsis: {
          "0%": { content: '"."' },
          "33%": { content: '".."' },
          "66%": { content: '"..."' },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
    },
  },
  variants: {
    linearBorderGradients: ["responsive", "hover", "dark"], // defaults to ['responsive']
    extend: {
      backgroundColor: ["checked", "disabled"],
      backgroundImage: ["hover", "focus"],
      borderColor: ["checked", "disabled"],
      cursor: ["disabled"],
      opacity: ["hover", "disabled"],
      placeholderColor: ["hover", "active"],
      ringWidth: ["disabled"],
      ringColor: ["disabled"],
    },
  },
  plugins: [
    // require('tailwindcss-border-gradient-radius'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".header-border-b": {
          background:
            "linear-gradient(to right, rgba(39, 176, 230, 0.2) 0%, rgba(250, 82, 160, 0.2) 100%) left bottom no-repeat",
          backgroundSize: "100% 1px",
        },
      });
    }),
  ],
};
