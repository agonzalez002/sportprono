import React, {createContext, useState } from 'react';
import { UserType, AuthContextType } from "../interfaces";

interface AuthProviderType {
    user?: UserType;
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({user, children}: AuthProviderType) => {

    const [ authData, setAuthData ] = useState<UserType | null>(user || null);

    const setAuth = (newUser: UserType | null) => {
        if (newUser) {
            localStorage.setItem('sportprono-user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('sportprono-user');
        }
        setAuthData(newUser);
    }
    
    return (
        <AuthContext.Provider value={{authData, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};