import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import MainContent from "../MainContent/main-content";
import UnAuthInfo from "../UnAuthInfo/UnAuthInfo";
import { useNavigate } from "react-router-dom";

function Content() {
    const { authData, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authData) {
            const storedUser =  localStorage.getItem('sportprono-user');
            if (storedUser) {
                setAuth(JSON.parse(storedUser).value);
            } else {
                navigate('/');
            }
        }
    }, [authData, setAuth, navigate]);

    return (    
        <div className='content'>
            { authData ? <MainContent /> : <UnAuthInfo /> }
        </div>
    )
};

export default Content;