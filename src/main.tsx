import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MantineProvider } from '@mantine/core'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Atkinson Hyperlegible',
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
