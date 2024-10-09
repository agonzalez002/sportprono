import React, {createContext, useEffect, useState } from 'react';
import { UserType, AuthContextType } from "../interfaces";

interface AuthProviderType {
    user?: UserType;
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const setItemWithExpiration = (key: string, value: any, expirationInMinutes: number) => {
    const now = new Date();
    const item = {
        value: value,
        expiration: now.getTime() + expirationInMinutes * 60 * 1000, // en millisecondes
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiration = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Vérifie si l'élément a expiré
    if (now.getTime() > item.expiration) {
        localStorage.removeItem(key); // Supprime si expiré
        return null;
    }

    return item.value; // Retourne la valeur si elle est toujours valide
};

export const AuthProvider = ({user, children}: AuthProviderType) => {

    const [ authData, setAuthData ] = useState<UserType | null>(() => {
        const storedUser = getItemWithExpiration('sportprono-user');
        return storedUser || user || null;
    });

    const setAuth = (newUser: UserType | null) => {
        if (newUser) {
            // Sauvegarder les informations de l'utilisateur avec une expiration (par exemple, 1 heure)
            setItemWithExpiration('sportprono-user', newUser, 60);
        } else {
            localStorage.removeItem('sportprono-user');
        }
        setAuthData(newUser);
    }

    useEffect(() => {
        const storedUser = getItemWithExpiration('sportprono-user');
        if (storedUser) {
            setAuthData(storedUser);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{authData, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};