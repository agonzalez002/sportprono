import { styled } from "@mui/material";

const StyledMainContent = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

export default StyledMainContent;