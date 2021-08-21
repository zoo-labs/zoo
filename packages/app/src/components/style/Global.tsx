import { createGlobalStyle } from 'styled-components'

import { Theme } from 'theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#040404')};
  }

  body {
    background-color: ${({ theme }) => (theme.isDark ? '#040404' : '#FFFFFF')};
    overflow-x: hidden;
    position: relative;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
