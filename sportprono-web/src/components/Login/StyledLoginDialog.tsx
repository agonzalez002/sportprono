import { styled, TextField, InputLabel } from "@mui/material";


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
