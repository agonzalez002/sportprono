import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledGroupContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '5px',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    color: '#000',
    ":hover": theme.palette.secondary.main,
}))