import React from 'react'
import { withThemesProvider } from 'themeprovider-storybook'
import lightTheme from '../src/theme/light'
import darkTheme from '../src/theme/dark'
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { StaticStore, store, intState } from './staticstore'
import { Provider } from 'react-redux'
import addons from '@storybook/addons'
import withRedux from 'addon-redux/withRedux'
import { HelmetProvider } from 'react-helmet-async'

const withReduxSettings = {
  Provider,
  store,
  state: intState,
}

const globalDecorator = (StoryFn) => (
  <HelmetProvider>
    <MemoryRouter initialEntries={['/']}>
      <StoryFn />
    </MemoryRouter>
  </HelmetProvider>
)

const withReduxDecorator = withRedux(addons)(withReduxSettings)

addDecorator(withReduxDecorator)
// addDecorator(story => <StaticStore>{story()}</StaticStore>);

// export const parameters = {
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }

const themes = [
  {
    name: 'Light',
    backgroundColor: lightTheme.colors.background,
    ...lightTheme,
  },
  {
    name: 'Dark',
    backgroundColor: darkTheme.colors.background,
    ...darkTheme,
  },
]

export const decorators = [globalDecorator, withThemesProvider(themes)]

// export const decorators = [
//   (Story) => (
//     <StaticStore>
//       <ThemeContextProvider>
//         <Story />
//       </ThemeContextProvider>
//     </StaticStore>
//   ),
// ]
