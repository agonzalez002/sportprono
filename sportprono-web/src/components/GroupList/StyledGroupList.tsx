import { Box, Paper, Grid2, styled } from "@mui/material";

export const StyledGroupContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    flexGrow: '1',
}));

export const Card = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    ...theme.applyStyles('light', {
        backgroundColor: 'transparent',
    }),
    ':hover': {
        cursor: 'pointer',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(26, 32, 39, 0.2)',
        }),
        ...theme.applyStyles('light', {
            backgroundColor: theme.palette.secondary.light,
        }),
    },
    '.icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45px',
        height: '45px',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        marginBottom: '20px',
    },
    '.text': {
        fontWeight: '700',
    }
}));

export const StyledBox = styled(Box)(() => ({
    minWidth: '1200px',
}));

export const StyledGrid2 = styled(Grid2)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));