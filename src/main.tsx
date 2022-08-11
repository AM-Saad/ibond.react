import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import './normalize.css'
import { UserContextProvider } from './store/user-context'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="87231620963-rd7m2qmjk0nabct0npjeljs7guhvucn0.apps.googleusercontent.com"> */}


      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    {/* </GoogleOAuthProvider>; */}


  </React.StrictMode>
)
