import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({user, children}: any) => {

    const [ authData, setAuthData ] = useState<Object>(user);
    
    return (
        <AuthContext.Provider value={{authData, setAuthData}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
