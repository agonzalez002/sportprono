import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, 
    IconButton, 
    Input, 
    InputAdornment, 
    InputLabel,
} from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledPasswordBox } from "./StyledAccount";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/userServices";
import { useAuth } from "../../hooks/useAuth";

interface ChangePasswordType {
    open: boolean,
    setOpen: (open: boolean) => void,
}

function ChangePassword({ open, setOpen }: ChangePasswordType) {
    const { authData } = useAuth();

    const [ oldPassword, setOldPassword ] = useState<string>('');
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ newPassword2, setNewPassword2 ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ showNewPassword, setShowNewPassword ] = useState<boolean>(false);
    const [ showOldPassword, setShowOldPassword ] = useState<boolean>(false);

    const handleClose = () => {
        setOldPassword('');
        setNewPassword('');
        setNewPassword2('');
        setOpen(false);
    };

    const passwordMatch = () => {
        return newPassword === newPassword2;
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (passwordMatch() && authData) {
                const passwordData = await changePassword(
                    {old_password: oldPassword, new_password: newPassword}, 
                    authData.user.id,
                    authData.token,
                );
                if (passwordData) {
                    toast.success("Mot de passe modifié !")
                    setOldPassword('');
                    setNewPassword('');
                    setNewPassword2('');
                    setOpen(false);
                }
            } else {
                toast.warning("Mots de passe différents !");
            }
        } catch (error: unknown) {
            setOldPassword('');
            setNewPassword('');
            setNewPassword2('');
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Une erreur inconnue est survenue !');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Changer le mot de passe</DialogTitle>
            <DialogContent>
                <StyledPasswordBox>
                    <PasswordIcon />
                    <FormControl className="password">
                        <InputLabel htmlFor="password">Ancien mot de passe</InputLabel>
                        <Input
                            id="old-password"
                            type={showOldPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle old-password visibility"
                                        onClick={handleClickShowOldPassword}
                                    >
                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={ e => setOldPassword(e.target.value) }
                        />
                    </FormControl>
                </StyledPasswordBox>
                
                <StyledPasswordBox>
                    <PasswordIcon />
                    <FormControl className="password">
                        <InputLabel htmlFor="password">Nouveau mot de passe</InputLabel>
                        <Input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end" className="input">
                                    <IconButton
                                        aria-label="toggle new-password visibility"
                                        onClick={handleClickShowNewPassword}
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={ e => setNewPassword(e.target.value) }
                        />
                    </FormControl>
                </StyledPasswordBox>

                <StyledPasswordBox>
                    <PasswordIcon />
                    <FormControl className="password">
                        <InputLabel htmlFor="password2">Confirmer le nouveau mdp</InputLabel>
                        <Input
                            id="new-password2"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle new-password2 visibility"
                                        onClick={handleClickShowNewPassword}
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={ e => setNewPassword2(e.target.value) }
                        />
                    </FormControl>
                </StyledPasswordBox>
            </DialogContent>
            <DialogActions>
                <LoadingButton 
                    loading={loading} 
                    variant='contained' 
                    color='primary'
                    onClick={handleSubmit}
                >
                    Valider
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePassword;