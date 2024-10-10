import { Box, Divider, Grow, IconButton, MenuItem, MenuList, Paper } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import User from "../User/user";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from "react-router-dom";
import { StyledPopper, StyledAccountCircleIcon } from "./StyledLoginDialog";


interface LoginType {
    setLoginOpen: (open: boolean) => void;
}

function Login({setLoginOpen}: LoginType) {
    const navigate = useNavigate();

    const { authData, setAuth } = useAuth();
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);

    const handleOpenLoginDialog = () => {
        setLoginOpen(true);
        setOpenMenu(false);
    };

    const handleAccount = () => {
        navigate('/my-account');
    };

    const handleLogout = () => {
        setAuth(null);
    }

    const handleClose = () => {
        setOpenMenu(false);
    };
 

    return (
        <>
            { !authData ?
                <>
                    <IconButton aria-label="login" onClick={handleOpenLoginDialog}>
                        <PowerSettingsNewIcon color="primary" />
                    </IconButton>
                </>
                :
                <Box>
                    <User user={authData.user} accessAccount setOpenMenu={setOpenMenu} />
                    <StyledPopper
                        open={openMenu}
                        role={undefined}
                        transition
                        disablePortal
                        sx={{
                            position: "fixed",
                            top: "65px !important",
                            right: "20px",
                            left: "unset !important", 
                        }}
                    >
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocus={openMenu}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                        >
                                            <MenuItem onClick={handleAccount}>
                                                <StyledAccountCircleIcon /> Mon Compte
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </StyledPopper>
                </Box>
            }
        </>
    );
}

export default Login;