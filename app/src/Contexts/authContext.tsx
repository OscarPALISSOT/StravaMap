'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean | null;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/auth/status');
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (error) {
                console.error('Failed to check authentication status:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    const signOut = async () => {
        try {
            const response = await fetch('/api/auth/strava/signout', { method: 'POST' });
            if (response.ok) {
                setIsAuthenticated(false);
            } else {
                console.error('Failed to sign out');
            }
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};