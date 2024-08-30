import { styled } from "@mui/material";

const StyledSidebar = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    width: '300px',
    height: '100%',
    borderRight: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.text.primary,
}));

export default StyledSidebar;