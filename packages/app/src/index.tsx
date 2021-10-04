import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Providers from './Providers'

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
