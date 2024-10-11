import { styled, Avatar, TextField, Box } from "@mui/material";

export const StyledH1 = styled('h1')(() => ({
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
}));

export const HiddenTextfield = styled(TextField)(() => ({
    display: 'none',
}));

export const StyledAvatar = styled(Avatar)(() => ({
    width: '100%',
    height: '100%',
    display: 'block',
}));

export const StyledAvatarBox = styled(Box)(() => ({
    position: 'relative',
    width: '150px',
    height: '150px',
    '.overlay': {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        borderRadius: '50%',
        fontSize: '50px',
        '.edit-icon': {
            fontSize: '70px',
            color: 'white',
        }
    },
    '&:hover': {
        cursor: 'pointer',
        '.overlay': {
            opacity: '1',
        }
    }
    
}));

export const StyledBoxAvatar = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledUserInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    '.infos': {
        display: 'flex',
        flexDirection: 'column',
        width: '600px',
        '.input': {
            marginTop: '15px',
            '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change la couleur du label
            },
        },
        '&:first-child': {
            marginRight: '20px',
        }
    }
}));

export const StyledBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:'20px',
}));

export const StyledPasswordBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flexStart',
    marginTop: '15px',
    '.password': {
        width: '100%',
        marginLeft: '5px',
        '& .MuiInputLabel-root': {
            color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Change la couleur du label
        },
        '.password-label': {
            backgroundColor: theme.palette.background.default,
            padding: '0 5px',
        }
    }
}));