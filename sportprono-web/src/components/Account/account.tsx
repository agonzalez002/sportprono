import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { uploadAvatar, changePassword } from "../../services/userServices";
import PasswordIcon from '@mui/icons-material/Password';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from 'react-toastify';

function Account() {
    const { authData } = useAuth() || { authData: null };
    const [ image, setImage ] = useState<File>();
    const [ oldPassword, setOldPassword ] = useState<string>();
    const [ newPassword1, setNewPassword1 ] = useState<string>();
    const [ newPassword2, setNewPassword2 ] = useState<string>();
    const [ showOldPassword, setShowOldPassword ] = useState<boolean>(false);
    const [ showNewPassword, setShowNewPassword ] = useState<boolean>(false);

    if (!authData) {
        return <h1>Vous devez être connecté pour accéder à cette page !</h1>
    }

    const uploadFile = async () => {
        const uploadData = new FormData();
        if (image) {
            uploadData.append('image', image, image.name);
        }
        console.log(uploadData);
        const uploaded = await uploadAvatar(authData.user.profile.id, uploadData, authData.token);
        if (uploaded) {
            toast.success("Image uploadée !");
        }
    }

    const passwordMatch = () => {
        return newPassword1 === newPassword2;
    }

    const handleChangePassword = async () => {
        if (passwordMatch()) {
            const passwordData = await changePassword(
                {old_password: oldPassword, new_password: newPassword1}, 
                authData.user.id,
                authData.token,
            );
            if (passwordData) {
                toast.success("Mot de passe modifié !")
            }
        } else {
            toast.warning("Mots de passe différents !");
        }
    }

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    }

    return (
        <>
            <h1>My account</h1>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <p>Upload your avatar :</p>
                <TextField 
                    id="input-with-sx-avatar" 
                    type="file" 
                    label="Avatar" 
                    variant="standard" 
                    onChange={ (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                            setImage(file);
                        } 
                    }} 
                />
                <Button variant='contained' color='primary' onClick={uploadFile}>Save</Button>
            </Box>

            <br/>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="password">Old Password</InputLabel>
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
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="password">New Password</InputLabel>
                        <Input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle new-password visibility"
                                    onClick={handleClickShowNewPassword}
                                >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            onChange={ e => setNewPassword1(e.target.value) }
                        />
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="password2">Confirm new password</InputLabel>
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
                </Box>
                <Button variant='contained' color='primary' onClick={handleChangePassword}>Change Password</Button>
            </Box>
        </>
    );
}

export default Account;