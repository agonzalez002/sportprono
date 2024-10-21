import { AlternateEmail } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { StyledTextField } from "./StyledLoginDialog";
import { LoadingButton } from "@mui/lab";
import { forgotPwd } from "../../services/userServices";

interface ForgotPasswordType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function ForgotPasswordDialog({open, setOpen}: ForgotPasswordType) {
    const [ email, setEmail ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    
    const handleClose = () => {
        setEmail('');
        setOpen(false);
    };

    const handleSubmit = async () =>{
        setLoading(true)
        try {
            const forgotPassword = await forgotPwd({email});
            if (forgotPassword) {
                toast.success(forgotPassword.message || 'Nouveau mot de passe envoyé par mail !');
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error('Email incorrect !')
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Mot de passe oublié</DialogTitle>
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
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>Valider</LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ForgotPasswordDialog;