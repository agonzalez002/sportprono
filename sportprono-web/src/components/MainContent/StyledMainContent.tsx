import { styled } from "@mui/material";

const StyledMainContent = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHeight: '100%',
    textAlign: 'left',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default StyledMainContent;