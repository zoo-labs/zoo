import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
