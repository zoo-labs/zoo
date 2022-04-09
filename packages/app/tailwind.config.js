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
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      margin: {
        "5em": "5em",
      },
      linearBorderGradients: {
        directions: {
          tr: "to top right",
          r: "to right",
          t: "to top",
          b: "to bottom",
        },
        colors: {
          "blue-pink": ["#27B0E6", "#FA52A0"],
          "pink-red-light-brown": ["#FE5A75", "#FEC464"],
          "purple-blue": ["#462CA9", "#2517FF"],
          "blue-green": ["#2517FF", "#15F195"],
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
        "marketplace-section": "url(/img/leaves.png)",
        "nft-gradient":
          "linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%)",
        "leader-board": "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
      },
      colors: {
        purple: "#462CA9",
        purple100: "#8C4FF8;",
        grey: "#777E91",
        grey100: "#F7F8FC",
        pink: "#f338c3",
        red: "crimson",
        yellow: "#ffd166",
        green: "#1EE9B6",
        blue: "#2517ff",
        black: "#1F2030",
        "deep-gray": "#23262F",
        muted: "#777E91",
        "dark-pink": "#EF466F",
        orange: "#FF592C",
        "dark-blue": "#020F2C",
        "butter-white": "#FCFCFD",
        dark: "#000",
        steel: "#797979",

        "dark-gray": "#6D7278",
        "grey-400": "#878787",
        "grey-300": "#353945",
        "grey-50": "#7A7585",
        "grey-80": "#3C3844",
        "trading-history": "#1F2126",
        "trading-history-border-b": "#E6E8EC",
        "nft-card-border": "#A67CED",

        // "opaque-blue": "#0993ec80",
        // "opaque-pink": "#f338c380",
        // "pink-red": "#FE5A75",
        // "light-brown": "#FEC464",
        // "light-yellow": "#FFD166",
        // "cyan-blue": "#0993EC",
        // "dark-pink": "#221825",
        // "dark-blue": "#0F182A",
        // "dark-1000": "#0D0415",
        // "dark-900": "#161522",
        // "dark-850": "#1d1e2c",
        // "dark-800": "#202231",
        // "dark-700": "#2E3348",
        // "dark-600": "#1C2D49",
        // "dark-500": "#223D5E",
        // "low-emphesis": "#575757",
        // primary: "#BFBFBF",
        // secondary: "#7F7F7F",
        // "high-emphesis": "#E3E3E3",
        green: "#14F195",
        blue: "#2517FF",
        black: "#000000",
        black100: "#1F2030",
        black200: "#292A3E",
        white: "#fff",
      },
      lineHeight: {
        "48px": "48px",
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        label: [
          "12px",
          {
            fontWeight: "bold",
          },
        ],
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
        5: "1.25rem",
        empty: "128px",
        cardContent: "230px",
        fitContent: "fit-content",
        nftContainer: "503px",
      },
      minWidth: {
        5: "1.25rem",
      },
      maxWidth: {
        22: "22.06rem",
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
      zIndex: {
        999: "999",
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
