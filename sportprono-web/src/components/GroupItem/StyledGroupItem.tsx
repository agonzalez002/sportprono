import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    width: '150px',
    height: '200px',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
    }
}));