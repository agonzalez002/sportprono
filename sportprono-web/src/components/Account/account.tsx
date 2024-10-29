import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { 
    Box,
    TextField
} from "@mui/material";
import { changeUserData, uploadAvatar } from "../../services/userServices";
import { toast } from 'react-toastify';
import { 
    StyledH1, 
    HiddenTextfield, 
    StyledAvatar, 
    StyledAvatarBox, 
    StyledBoxAvatar,
    StyledUserInfo,
    StyledBox,
} from './StyledAccount';
import { LoadingButton } from "@mui/lab";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChangePassword from "./changePassword";

function Account() {
    const { authData, setAuth } = useAuth();
    const [ username, setUsername ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ firstname, setFirstname ] = useState<string>('');
    const [ lastname, setLastname ] = useState<string>('');
    const [ imageUrl, setImageUrl ] = useState<string>('');
    const [ open, setOpen ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (authData && authData.user) {
            if (authData.user.profile && authData.user.profile.image) {
                setImageUrl(authData.user.profile.image_url);
            } else {
                setImageUrl("http://localhost:8000/mediafiles/male.png");
            }
            setUsername(authData.user.username);
            setEmail(authData.user.email);
            setFirstname(authData.user.first_name);
            setLastname(authData.user.last_name);
        }
    }, [authData]);

    if (!authData) {
        return <h1>Vous devez être connecté pour accéder à cette page !</h1>
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {            
            const userData = await changeUserData(
                {username, email, first_name: firstname, last_name: lastname},
                authData.user.id,
                authData.token,
            );
            if (userData) {
                const storedData = JSON.parse(localStorage.getItem('sportprono-user') || '{}');

                if (storedData && storedData.value && storedData.value.user) {
                    const updatedUser = {
                        ...storedData.value.user,
                        ...userData.result
                    };

                    const updatedStoredData = {
                        ...storedData,
                        value: {
                            ...storedData.value,
                            user: updatedUser
                        }
                    };

                    localStorage.setItem('sportprono-user', JSON.stringify(updatedStoredData));

                    toast.success(userData.message || 'Profil mis à jour avec succès !');
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Une erreur inconnue est survenue !');
            }
        } finally {
            setLoading(false);
        }
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
                const storedData = JSON.parse(localStorage.getItem('sportprono-user') || '{}');

                if (storedData && storedData.value && storedData.value.user.profile) {
                    const updatedProfile = {
                        ...storedData.value.user.profile,
                        ...uploaded,
                    };

                    const updatedUser = {
                        ...storedData.value.user,
                        profile: updatedProfile,
                    };

                    const updatedStoredData = {
                        ...storedData,
                        value: {
                            ...storedData.value,
                            user: updatedUser
                        }
                    };

                    localStorage.setItem('sportprono-user', JSON.stringify(updatedStoredData));

                    setAuth(updatedStoredData.value);

                    toast.success(uploaded.message || 'Avatar mis à jour avec succès !');
                }
            }
        }
    };

    const handleOpenPopup = () => {
        setOpen(true);
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
                    {authData.user.last_name}
                </TextField>
                <TextField 
                    variant="outlined" 
                    label="Prenom" 
                    className="input" 
                    size="small"
                    value={firstname}
                    onChange={event => setFirstname(event.target.value)}
                >
                    {authData.user.first_name}
                </TextField>
            </StyledUserInfo>
            <p className="change-password" onClick={handleOpenPopup}>Changer mon mot de passe</p>
            <LoadingButton
                loading={loading}
                variant='contained' 
                color='primary' 
                onClick={handleSubmit}
            >
                Valider
            </LoadingButton>
            <ChangePassword open={open} setOpen={setOpen} />
        </StyledBox>
    );
}

export default Account;