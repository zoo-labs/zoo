import { modalAnatomy } from '@chakra-ui/anatomy';
import {
  theme as defaultTheme,
  mergeThemeOverride,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const { definePartsStyle } = createMultiStyleConfigHelpers(modalAnatomy.keys);

// Import theme parts
import breakpoints from './breakpoints';
import colors, { semanticColors } from './colors';
import components from './components';
import styles from './global';
import { textStyles } from './textStyles';

// Filter out components we want to override
const filteredDefaultComponents = Object.fromEntries(
  Object.entries(defaultTheme.components).filter(([key]) => !['Menu'].includes(key)),
);

export const luxTheme = mergeThemeOverride({
  ...defaultTheme,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  shadows: {
    'content-box-shadow':
      '0px 0px 0px 1px rgba(248, 244, 252, 0.04), 0px 0px 0px 1px var(--colors-color-alpha-white-950), inset, 0px 2px 4px -2px var(--colors-color-alpha-black-800), 0px 4px 6px -1px var(--colors-color-alpha-black-800);',
    layeredShadowBorder:
      '0px 0px 0px 1px #100414, inset 0px 0px 0px 1px rgba(248, 244, 252, 0.04), inset 0px 1px 0px rgba(248, 244, 252, 0.04)',
  },
  styles,
  breakpoints,
  colors,
  semanticTokens: {
    ...defaultTheme.semanticTokens,
    colors: semanticColors,
  },
  textStyles,
  components: {
    ...Object.assign(filteredDefaultComponents, components),
    Modal: {
      ...defaultTheme.components.Modal,
      sizes: {
        ...defaultTheme.components.Modal.sizes,
        max: definePartsStyle({
          dialog: {
            maxW: '90vw',
            minH: '90vh',
          },
        }),
      },
    },
  },
});

export { colors, textStyles, components, breakpoints };
export default luxTheme;