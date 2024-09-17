import { useContext, createContext, useState } from "react";
import { UserType, AuthContextType } from "../interfaces";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({user, children}: any) => {

    const [ authData, setAuthData ] = useState<UserType>(user);

    const setAuth = (newUser: UserType) => {
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

export const useAuth = () => useContext(AuthContext);
