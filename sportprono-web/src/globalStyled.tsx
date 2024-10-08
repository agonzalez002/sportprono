import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
    width: '65px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#000',
    ":hover": theme.palette.secondary.main,
}))