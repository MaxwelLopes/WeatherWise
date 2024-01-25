import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'

process.env.API_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



