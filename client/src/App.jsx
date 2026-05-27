import React, { useCallback, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';
import ChatWidget from './components/ChatWidget';


function App() {
    const [loading, setLoading] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return sessionStorage.getItem('hasLoaded') !== 'true';
    });

    const handleLoaderComplete = useCallback(() => {
        sessionStorage.setItem('hasLoaded', 'true');
        setLoading(false);
    }, []);

    return (
        <ThemeProvider>
            {loading && <Loader onComplete={handleLoaderComplete} />}
            <AppRoutes />
            <ChatWidget />
        </ThemeProvider>
    );
}

export default App;
