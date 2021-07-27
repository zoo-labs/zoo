import { createGlobalStyle } from 'styled-components'

import { Theme } from 'theme'

import MyMP16OSFFont from '../../fonts/MP16OSF.ttf'
import ConsolasFont from '../../fonts/Consolas.ttf'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}

const GlobalStyle = createGlobalStyle`
  @font-face{
      font-family: ${fontFamily};
      src:url('${fontFamily}') format('TrueType');
  }
  @font-face{
    font-family:'ConsolasFont';
    src:url('${ConsolasFont}') format('TrueType');   
  }
  * {
    font-family: 'ConsolasFont';
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
