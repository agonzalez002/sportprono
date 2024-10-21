import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';
import { 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormControl, 
    IconButton, 
    Input, 
    InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../services/userServices";
import { StyledTextField, StyledInputLabel, StyledBox } from './StyledLoginDialog';
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";


interface LoginDialogType {
    open: boolean;
    setOpen: (open: boolean) => void;
    setRegisterOpen: (open: boolean) => void;
    setForgotPasswordOpen: (open: boolean) => void;
}

function LoginDialog({ open, setOpen, setRegisterOpen, setForgotPasswordOpen }: LoginDialogType,) {
    const { setAuth } = useAuth();
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const data = await auth({username, password});
            if (data) {
                setAuth(data);
                setPassword('');
                setUsername('');
                setOpen(false);
            }
        } catch (error: unknown) {
            setUsername('');
            setPassword('');
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Une erreur inconnue est survenue !');
            }
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        setPassword('');
        setUsername('');
        setOpen(false);
    }

    const handleRegister = () => {
        setPassword('');
        setUsername('');
        setOpen(false);
        setRegisterOpen(true);
    };

    const handleForgotPassword = () => {
        setPassword('');
        setUsername('');
        setOpen(false);
        setForgotPasswordOpen(true);
    };

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Connexion</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <StyledTextField 
                        id="input-with-sx" 
                        className='username' 
                        label="Nom d'utilisateur" 
                        variant="standard"
                        value={username}
                        onChange={ e => setUsername(e.target.value) }
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ mt: 1 }} variant="standard">
                        <StyledInputLabel htmlFor="standard-adornment-password">Mot de passe</StyledInputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </FormControl>
                </Box>
                <StyledBox>
                    <p className="forgot-password" onClick={handleForgotPassword}>Mot de passe oublié !</p>
                </StyledBox>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>Connexion</LoadingButton>
                <Button variant='outlined' color='primary' onClick={handleRegister}>Inscription</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;