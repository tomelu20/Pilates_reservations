import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

// Pune aici Client ID-ul tău real copiat din Google Cloud Console
const GOOGLE_CLIENT_ID = "343817662587-p38fe7o8nef673t5ir5fjqsmptv5nsde.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
)