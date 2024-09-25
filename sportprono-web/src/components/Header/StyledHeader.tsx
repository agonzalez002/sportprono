import { styled } from "@mui/material";

const StyledHeader = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: '80px',
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    padding: '5px 20px',
    img: {
        ":hover": {cursor: "pointer"},
    }
}));

export default StyledHeader;