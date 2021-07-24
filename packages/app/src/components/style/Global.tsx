import { createGlobalStyle } from 'styled-components'

import { Theme } from 'theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: MyMP16OSFFont;
    color: #FFFFF;
  }
  body {
    background-color: #040404;
  overflow-x: hidden;

  position: relative
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
