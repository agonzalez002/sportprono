import { LoadingButton } from "@mui/lab";
import { 
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    RadioGroup,
} from "@mui/material";
import { useRef, useState } from "react";
import { 
    StyledTooltip, 
    StyledRadio, 
    StyledFormLabel, 
    StyledTextField 
} from "./StyledAddNewGroupDialog";
import { HiddenTextfield, StyledAvatar, StyledAvatarBox, StyledBoxAvatar } from "../Account/StyledAccount";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import emptyFile from '../../assets/images/empty-file.png';
import { createGroup } from "../../services/groupServices";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

interface AddNewGroupType {
    open: boolean,
    setOpen: (open: boolean) => void;
}

function AddNewGroupDialog({open, setOpen}: AddNewGroupType) {
    const { authData } = useAuth();
    const [ name, setName ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ access, setAccess ] = useState<string>('private');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [ imageUrl, setImageUrl ] = useState<string>(emptyFile);
    const [ groupLogo, setGroupLogo ] = useState<File | undefined>();


    if (!authData) {
        return <h1>Vous devez être connecté pour accéder à cette page !</h1>
    }
    
    const handleClose = () => {
        setName('');
        setImageUrl(emptyFile);
        setAccess('private');
        setGroupLogo(undefined);
        setOpen(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const uploadData = new FormData();
            if (groupLogo) {
                uploadData.append('image', groupLogo, groupLogo.name);
            }
            uploadData.append('name', name);
            uploadData.append('access', access);
            const created = await createGroup(uploadData, authData.token);
            if (created) {
                setName('');
                setImageUrl(emptyFile);
                setAccess('private');
                setGroupLogo(undefined);
                setOpen(false);
                toast.success(created.message || 'Nouveau Groupe créé !');
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

    const private_text = "Seul les personnes possédant le code d'accés pourront rejoindre votre groupe."
    const public_text = "Toutes les personnes pourront rejoindre votre groupe."

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
            setGroupLogo(file);
            return () => URL.revokeObjectURL(newImageUrl);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Ajouter un nouveau Groupe</DialogTitle>
            <DialogContent>
                <StyledBoxAvatar>
                    <StyledAvatarBox className="group">
                        <StyledAvatar src={imageUrl} />
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
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <StyledTextField 
                        id="input-with-sx-sign-up-email" 
                        label="Nom" 
                        variant="standard" 
                        onChange={ e => setName(e.target.value) }
                    />
                </Box>
                <br/>
                <StyledFormLabel>Accessibilité</StyledFormLabel>
                <RadioGroup row value={access} onChange={ e => setAccess(e.target.value) }>
                    <StyledTooltip title={public_text}>
                        <FormControlLabel value="public" control={<StyledRadio />} label="Public" />
                    </StyledTooltip>
                    <StyledTooltip title={private_text}>
                        <FormControlLabel value="private" control={<StyledRadio />} label="Privé" />
                    </StyledTooltip>
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>Valider</LoadingButton>
                <Button variant='outlined' color='primary' onClick={handleClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddNewGroupDialog;