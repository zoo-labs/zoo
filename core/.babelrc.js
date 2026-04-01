module.exports = {
  presets: ["next/babel"],
  plugins: ["macros", ["styled-components", { ssr: true }]],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
};
