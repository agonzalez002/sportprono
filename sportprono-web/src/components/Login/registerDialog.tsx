import { AccountCircle, AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material";
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
    InputAdornment 
} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from "react";
import { signUp } from "../../services/userServices";
import { auth } from '../../services/userServices';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { StyledInputLabel, StyledTextField } from "./StyledLoginDialog";
import { LoadingButton } from "@mui/lab";


interface RegisterType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function RegisterDialog({open, setOpen}: RegisterType) {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [ email, setEmail ] = useState<string>('');
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ password2, setPassword2 ] = useState<string>('');
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleClose = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setPassword('');
        setShowPassword(false);
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const passwordMatch = () => {
        return password === password2;
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (passwordMatch()) {
                const signUpData = await signUp({username, password, email});
                if (signUpData) {
                  const data = await auth({username, password});
                  setAuth(data);
                  setOpen(false);
                  navigate('/my-account');
                }
              } else {
                  toast.error("Password don't match")
              }
        } catch (error) {
            toast.error("Register fail !");
        } finally {
            setLoading(false);
        }
        
    };
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <StyledTextField 
                        id="input-with-sx-sign-up-email" 
                        label="Email" 
                        variant="standard" 
                        onChange={ e => setEmail(e.target.value) }
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <StyledTextField 
                        id="input-with-sx-sign-up-username" 
                        label="Username" 
                        variant="standard" 
                        onChange={ e => setUsername(e.target.value) }
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ mt: 1 }} variant="standard">
                        <StyledInputLabel htmlFor="password">Password</StyledInputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ mt: 1 }} variant="standard">
                    <StyledInputLabel htmlFor="password2">Confirm password</StyledInputLabel>
                    <Input
                        id="password2"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        onChange={ e => setPassword2(e.target.value) }
                    />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>Register</LoadingButton>
            </DialogActions>               
        </Dialog>
    )
}

export default RegisterDialog;