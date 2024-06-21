import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_Auth}>

      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
