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
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        "bid-gradient": "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
        "green-g":
          "linear-gradient(180deg, rgba(37, 23, 255, 0.1) -61.88%, rgba(21, 241, 149, 0.1) 93.88%)",
        "auction-gradient":
          "linear-gradient(180deg, #2517FF -61.88%, #15F195 93.88%)",
        new: "linear-gradient(268.95deg, #2517FF 0.43%, #1D84CA 49.76%, #1FDD8E 99.1%)",
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
        "muted-20": "#9E9FA0",
        "muted-40": "#A4A7AE",
        "muted-50": "#979797",
        "dark-pink": "#EF466F",
        orange: "#FF592C",
        "dark-blue": "#020F2C",
        "butter-white": "#FCFCFD",
        butter: "#9497A8",
        dark: "#000",
        steel: "#797979",
        "zoo-green": "#15F195",
        "zoo-green-1": "#1FDD8E",
        "zoo-yellow": "#F3B04E",
        "dark-gray": "#6D7278",
        "grey-400": "#878787",
        "grey-300": "#353945",
        "grey-50": "#7A7585",
        "grey-80": "#3C3844",
        "glass-50": "rgba(137, 136, 136, 0.5)",
        "trading-history": "#1F2126",
        "trading-history-border-b": "#E6E8EC",
        "nft-card-border": "#A67CED",
        a1: "#A1A1A1",
        "cut-grey": "#292A31",
        "white-30": "rgba(255, 255, 255, 0.3)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-2": "rgba(255, 255, 255, 0.02)",
        "white-5": "rgba(255, 255, 255, 0.05)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-60": "rgba(255, 255, 255, 0.6)",
        "opaque-blue": "#0993ec80",
        "opaque-pink": "#f338c380",
        "pink-red": "#FE5A75",
        "light-brown": "#FEC464",
        "light-yellow": "#FFD166",
        "cyan-blue": "#0993EC",
        "dark-pink": "#221825",
        "dark-blue": "#0F182A",
        "dark-1000": "#0D0415",
        "dark-900": "#161522",
        "dark-850": "#1d1e2c",
        "dark-800": "#202231",
        "dark-700": "#2E3348",
        "dark-600": "#1C2D49",
        "dark-500": "#223D5E",
        "dark-400": "#939393",
        "dark-300": "#1D1F2E",
        "gray-50": "rgba(50, 53, 70, 0.5)",
        "gray-100": "#424141",
        "gray-150": "#272726",
        "low-emphesis": "#575757",
        green: "#14F195",
        activeGreen: "#15F195",
        blue: "#2517FF",
        black: "#000000",
        black100: "#1F2030",
        black200: "#292A3E",
        white: "#fff",
        silverish: "#2C2A2A",
        "dark-white": "rgba(252, 252, 253, 0.1)",
        primary: "#161827",
        "primary-300": "#4F46E5",
        "primary-500": "#414B50",
        secondary: "#26293B",
        "high-emphesis": "#E3E3E3",
        "vote-button": "rgb(74, 169, 86)",
        accent: "#4F46E5",
        16: "#161616",
        33: "#333333",
      },
      lineHeight: {
        "48px": "48px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "4.5xl": [
          "40px",
          {
            lineHeight: "48px",
          },
        ],
        label: [
          "12px",
          {
            fontWeight: "bold",
          },
        ],
        hero: [
          "48px",
          {
            letterSpacing: "-0.05em",
            lineHeight: "96px",
            fontWeight: 700,
          },
        ],
      },
      borderRadius: {
        none: "0",
        px: "2px",
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
