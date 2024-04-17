import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

// The env should always in the root of my project else it will show undefined
const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENTID} >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
