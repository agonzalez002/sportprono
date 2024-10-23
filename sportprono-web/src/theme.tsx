import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#009688',
            light: 'rgba(0, 150, 136, 0.2)',
        },
        secondary: {
            main: '#00796B',
            light: 'rgba(0, 121, 107, 0.2)',
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
            light: 'rgba(220, 178, 83, 0.2)',
        },
        secondary: {
            main: '#00BFAE',
            light: 'rgba(0, 191, 174, 0.2)',
        },
        background: {
            default: '#242424',
            paper: '#2E2E2E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#dcb253',
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