
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'

// console.log = function() {};
// console.warn = function() {};
// console.error = function() {};

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
