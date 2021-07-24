import { createGlobalStyle } from 'styled-components'

import { Theme } from 'theme'
import MyMP16OSFFont from '../../fonts/MP16OSF.ttf'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}

const GlobalStyle = createGlobalStyle`
  @font-face{
      font-family:'MyMP16OSFFont';
      src:url('${MyMP16OSFFont}') format('TrueType');   
  }
  * {
    font-family: 'MyMP16OSFFont';
    color: #FFFFF;
  }
  body {
    background-color: #040404;
    overflow-x: hidden;
    position: relative;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
