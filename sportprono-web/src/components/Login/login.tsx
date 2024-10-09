import { IconButton } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import User from "../User/user";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface LoginType {
    setLoginOpen: (open: boolean) => void;
}

function Login({setLoginOpen}: LoginType) {
    const { authData } = useAuth();

    const handleOpenLoginDialog = () => {
        setLoginOpen(true);
    }

    return (
        <>
            { !authData ?
                <>
                    <IconButton aria-label="login" onClick={handleOpenLoginDialog}>
                        <PowerSettingsNewIcon color="primary" />
                    </IconButton>
                </>
                :
                <>
                    <User user={authData.user} accessAccount={false} />
                </>
            }
        </>
    );
}

export default Login;