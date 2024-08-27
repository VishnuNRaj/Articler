import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffff',
        },
        secondary: {
            main: '#222',
        },
        background: {
            default: '#1e1e1e',
            paper: '#121212',
        },
        text: {
            primary: '#b0b0b0', 
            secondary: '#ffffff',
        },
    },
});

export default theme;
