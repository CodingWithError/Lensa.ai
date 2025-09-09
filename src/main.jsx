import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

console.log('main.jsx loaded')

try {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  console.log('Root element found:', document.getElementById('root'))
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
  
  console.log('App rendered successfully')
} catch (error) {
  console.error('Error in main.jsx:', error)
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1 style="color: red;">Error Loading App</h1>
      <p>${error.message}</p>
    </div>
  `
}
