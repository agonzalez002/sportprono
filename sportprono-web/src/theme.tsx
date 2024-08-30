import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#00796B',
        },
        background: {
            default: '#fff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000',
            secondary: '#424242',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#dcb253',
        },
        secondary: {
            main: '#00BFAE',
        },
        background: {
            default: '#242424',
            paper: '#2E2E2E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#FF5722',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
    },
  });