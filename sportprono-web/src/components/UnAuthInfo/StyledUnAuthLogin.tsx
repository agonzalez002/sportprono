import { styled, Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHeight: '100%',
    textAlign: 'left',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.data': {
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        'p': {
            textAlign: 'justify',
        },

        '.buttons': {
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }
    }
}));

export default StyledBox;