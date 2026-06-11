import React, { createContext, useContext } from 'react';

const GoogleAuthContext = createContext({
    clientId: '',
    enabled: false,
    loading: true,
});

export const GoogleAuthConfigProvider = ({ value, children }) => (
    <GoogleAuthContext.Provider value={value}>
        {children}
    </GoogleAuthContext.Provider>
);

export const useGoogleAuthConfig = () => useContext(GoogleAuthContext);
