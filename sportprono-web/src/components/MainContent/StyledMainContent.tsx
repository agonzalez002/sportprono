import { styled } from "@mui/material";

const StyledMainContent = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100vh - 80px)',
    padding: '20px',
    textAlign: 'left',
    color: theme.palette.text.primary
}));

export default StyledMainContent;