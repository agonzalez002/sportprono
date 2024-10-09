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
import { StyledTextField, StyledInputLabel } from './StyledLoginDialog';
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";


interface LoginDialogType {
    open: boolean;
    setOpen: (open: boolean) => void;
    setRegisterOpen: (open: boolean) => void;
}

function LoginDialog({ open, setOpen, setRegisterOpen }: LoginDialogType,) {
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
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
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
    }
    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <StyledTextField 
                        id="input-with-sx" 
                        className='username' 
                        label="Username" 
                        variant="standard" 
                        onChange={ e => setUsername(e.target.value) } 
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ mt: 1 }} variant="standard">
                        <StyledInputLabel htmlFor="standard-adornment-password">Password</StyledInputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>Login</LoadingButton>
                <Button variant='outlined' color='primary' onClick={handleRegister}>Register</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;