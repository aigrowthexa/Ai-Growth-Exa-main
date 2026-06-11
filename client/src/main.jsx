import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals.css'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAuthConfigProvider } from './context/GoogleAuthContext.jsx';

const fallbackApiUrl = import.meta.env.PROD
    ? 'https://ai-growth-exa-1.onrender.com/api'
    : 'http://localhost:5011/api';

function Root() {
    const envClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    const [googleClientId, setGoogleClientId] = useState(envClientId);
    const [googleConfigLoading, setGoogleConfigLoading] = useState(!envClientId);

    useEffect(() => {
        if (envClientId) {
            setGoogleConfigLoading(false);
            return;
        }

        const loadGoogleConfig = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_URL || fallbackApiUrl;
                const response = await fetch(`${apiBaseUrl}/auth/google-config`);
                const data = await response.json();

                if (data?.clientId) {
                    setGoogleClientId(data.clientId);
                }
            } catch (error) {
                console.error('Failed to load Google auth config:', error);
            } finally {
                setGoogleConfigLoading(false);
            }
        };

        loadGoogleConfig();
    }, [envClientId]);

    const googleAuthConfig = useMemo(() => ({
        clientId: googleClientId,
        enabled: Boolean(googleClientId),
        loading: googleConfigLoading,
    }), [googleClientId, googleConfigLoading]);

    const app = (
        <GoogleAuthConfigProvider value={googleAuthConfig}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
            </BrowserRouter>
        </GoogleAuthConfigProvider>
    );

    if (!googleClientId) {
        return app;
    }

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            {app}
        </GoogleOAuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
)
