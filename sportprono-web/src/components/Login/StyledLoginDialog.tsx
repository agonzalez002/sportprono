import { styled, TextField, InputLabel, Popper } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const StyledTextField = styled(TextField)(({theme}) => ({
    width: '100%',
    marginTop: '10px',
    '& .MuiInputLabel-root': {
        color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change la couleur du label
    },
}));

export const StyledInputLabel = styled(InputLabel)(({theme}) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Blanc en mode sombre, noir en mode clair
    '& .MuiInputBase-input': {
        color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Applique la couleur au texte à l'intérieur du champ
    },
}));

export const StyledPopper = styled(Popper)(() => ({
    potion: 'fixed',
    top: '65px !important',
    right: '20px',
    left: 'unset !important',
}));

export const StyledAccountCircleIcon = styled(AccountCircleIcon)(() => ({
    marginRight: "10px",
}));
