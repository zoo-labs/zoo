import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
import './index.css'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Providers>
        <App />
      </Providers>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
