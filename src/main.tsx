import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import './normalize.css'
import { UserContextProvider } from './store/user-context'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>

  </React.StrictMode>
)
