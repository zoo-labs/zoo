export interface Theme {
  radii: {
    borderRadius: string
  }
  fonts: {
    body: string
    button: string
    headline: string
  }
  colors: ThemeColors
  assets: {
    ethIcon: 'glyph' | 'gray' | 'purple'
  }
}

export interface ThemeColors {
  // accent colors
  accentBase: string
  accentBgSubtle: string
  accentBg: string
  accentBgHover: string
  accentBgActive: string
  accentLine: string
  accentBorder: string
  accentBorderHover: string
  accentSolid: string
  accentSolidHover: string
  accentText: string
  accentTextContrast: string

  // neutral colors
  neutralBase: string
  neutralBgSubtle: string
  neutralBg: string
  neutralBgHover: string
  neutralBgActive: string
  neutalLine: string
  neutralBorder: string
  neutralBorderHover: string
  neutralSolid: string
  neutralSolidHover: string
  neutralText: string
  neutralTextContrast: string

  // secondary colors
  secondaryBase: string
  secondaryBgSubtle: string
  secondaryBg: string
  secondaryBgHover: string
  secondaryBgActive: string
  secondaryLine: string
  secondaryBorder: string
  secondaryBorderHover: string
  secondarySolid: string
  secondarySolidHover: string
  secondaryText: string
  secondaryTextContrast: string

  // general colors
  borderColor: string
  textColor: string
  focusColor: string
  errorText: string
  errorAccent: string
  successAccent: string

  // component colors
  reservoirLogoColor: string
  inputBackground: string
  buttonTextColor: string
  buttonTextHoverColor: string
  overlayBackground: string
  headerBackground: string
  footerBackground: string
  contentBackground: string
  wellBackground: string
  popoverBackground: string
}

export type ThemeOverrides = {
  borderRadius?: string
  font?: string
  buttonFont?: string
  buttonTextColor?: string
  buttonTextHoverColor?: string
  headlineFont?: string
  primaryColor?: string
  primaryHoverColor?: string
  wellBackground?: string
  textColor?: string
  headerBackground?: string
  contentBackground?: string
  footerBackground?: string
  overlayBackground?: string
  popoverBackground?: string
  borderColor?: string
  ethIcon?: Theme['assets']['ethIcon']
}

type SharedTheme = Pick<Theme, 'fonts' | 'radii'>

export const SharedThemeConfig = (
  overrides?: ThemeOverrides
): SharedTheme => {
  return {
    radii: {
      borderRadius: overrides?.borderRadius || '4px',
    },
    fonts: {
      body: overrides?.font || 'sans-serif',
      button: overrides?.buttonFont || overrides?.font || 'sans-serif',
      headline: overrides?.headlineFont || overrides?.font || 'sans-serif',
    },
  }
}
