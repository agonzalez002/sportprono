import { styled } from "@mui/material";
import { Link } from "react-router-dom";


export const StyledLink = styled(Link)(({ theme }) => ({
    color: '#000',
    ":hover": theme.palette.secondary.main,
}));