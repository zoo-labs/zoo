import { createGlobalStyle } from 'styled-components'

import { Theme } from 'theme'

// import MyMP16OSFFont from '../../fonts/MP16OSF.ttf'

const fontFamily = 'Consolas';
import fontFamilySrc from '../../fonts/Consolas.ttf'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}

const GlobalStyle = createGlobalStyle`
  @font-face{
      font-family: ${fontFamily};
      src:url('${fontFamilySrc}') format('TrueType');
  }
  @font-face{
    font-family: ${fontFamily};
    src:url('${fontFamilySrc}') format('TrueType');
  }
  * {
    font-family: ${fontFamily};
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
