import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { 
    Box, 
    Button, 
    FormControl, 
    IconButton, 
    OutlinedInput, 
    InputAdornment, 
    InputLabel, 
    TextField 
} from "@mui/material";
import { uploadAvatar, changePassword } from "../../services/userServices";
import PasswordIcon from '@mui/icons-material/Password';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { 
    StyledH1, 
    HiddenTextfield, 
    StyledAvatar, 
    StyledAvatarBox, 
    StyledBoxAvatar,
    StyledUserInfo,
    StyledBox,
    StyledPasswordBox,
} from './StyledAccount';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function Account() {
    const { authData } = useAuth() || { authData: null };
    const [ oldPassword, setOldPassword ] = useState<string>();
    const [ newPassword1, setNewPassword1 ] = useState<string>();
    const [ newPassword2, setNewPassword2 ] = useState<string>();
    const [ username, setUsername ] = useState<string>();
    const [ email, setEmail ] = useState<string>();
    const [ firstname, setFirstname ] = useState<string>();
    const [ lastname, setLastname ] = useState<string>();
    const [ showOldPassword, setShowOldPassword ] = useState<boolean>(false);
    const [ showNewPassword, setShowNewPassword ] = useState<boolean>(false);
    const [ imageUrl, setImageUrl ] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    if (!authData) {
        return <h1>Vous devez être connecté pour accéder à cette page !</h1>
    }

    useEffect(() => {
        if (authData.user) {
            if (authData.user.profile && authData.user.profile.image) {
                setImageUrl(authData.user.profile.image_url);
            } else {
                setImageUrl("http://localhost:8000/mediafiles/male.png");
            }
            setUsername(authData.user.username);
            setEmail(authData.user.email);
            setFirstname(authData.user.firstname);
            setLastname(authData.user.lastname);
        }
    }, [authData.user]);

    const passwordMatch = () => {
        return newPassword1 === newPassword2;
    }

    const handleSubmit = async () => {
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
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const uploadData = new FormData();
            uploadData.append('image', file, file.name);
            const uploaded = await uploadAvatar(authData.user.profile.id, uploadData, authData.token);
            if (uploaded) {
                toast.success("Image uploadée !");
            }
        }
    }

    return (
        <StyledBox>
            <StyledH1>Mon compte</StyledH1>

            <StyledBoxAvatar>
                <StyledAvatarBox>
                    <StyledAvatar 
                        alt={authData.user.username}
                        src={imageUrl}
                    />
                    <Box className="overlay" onClick={handleAvatarClick}>
                        <EditOutlinedIcon className="edit-icon" />
                    </Box>
                </StyledAvatarBox>
                
                <HiddenTextfield
                    type="file"
                    id="input-avatar"
                    inputRef={fileInputRef}
                    onChange={handleFileChange}
                />
            </StyledBoxAvatar>
            <StyledUserInfo>
                <Box className="infos">
                    <TextField 
                        variant="outlined" 
                        label="Nom d'utilisateur"
                        size="small"
                        className="input"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    >
                        {authData.user.username}
                    </TextField>
                    <TextField 
                        variant="outlined" 
                        label="Email"
                        size="small"
                        className="input"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    >
                        {authData.user.email}
                    </TextField>
                    <TextField 
                        variant="outlined" 
                        label="Nom" 
                        className="input" 
                        size="small"
                        value={lastname}
                        onChange={event => setLastname(event.target.value)}
                    >
                        {authData.user.lastname}
                    </TextField>
                    <TextField 
                        variant="outlined" 
                        label="Prenom" 
                        className="input" 
                        size="small"
                        value={firstname}
                        onChange={event => setFirstname(event.target.value)}
                    >
                        {authData.user.firstname}
                    </TextField>
                </Box>
                <Box className="infos">
                    <StyledPasswordBox>
                        <PasswordIcon />
                        <FormControl variant="outlined" size="small" className="password">
                            <InputLabel htmlFor="password" className="password-label">Old Password</InputLabel>
                            <OutlinedInput
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
                        <FormControl variant="outlined" size="small" className="password">
                            <InputLabel htmlFor="password" className="password-label">New Password</InputLabel>
                            <OutlinedInput
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
                                onChange={ e => setNewPassword1(e.target.value) }
                            />
                        </FormControl>
                    </StyledPasswordBox>

                    <StyledPasswordBox>
                        <PasswordIcon />
                        <FormControl variant="outlined" size="small" className="password">
                            <InputLabel htmlFor="password2" className="password-label">Confirm new password</InputLabel>
                            <OutlinedInput
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
                </Box>
            </StyledUserInfo>
            <Button 
                variant='contained' 
                color='primary' 
                onClick={handleSubmit}
            >
                Valider
            </Button>
        </StyledBox>
    );
}

export default Account;