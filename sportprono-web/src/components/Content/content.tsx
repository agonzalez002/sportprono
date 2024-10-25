import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import MainContent from "../MainContent/main-content";
import UnAuthInfo from "../UnAuthInfo/UnAuthInfo";

function Content() {
    const { authData, setAuth } = useAuth();

    useEffect(() => {
        const storedUser =  localStorage.getItem('sportprono-user');
        if (storedUser) {
            setAuth(JSON.parse(storedUser).value);
        }
    }, [setAuth]);

    return (    
        <div className='content'>
            { authData ? <MainContent /> : <UnAuthInfo /> }
        </div>
    )
};

export default Content;