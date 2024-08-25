import React, { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

interface ColorModeContextType {
    toggleColorMode: () => void;
}

interface ColorModeProviderProps {
    children: ReactNode;
}

const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => { } });

const getDesignTokens = (mode: 'light' | 'dark') => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#dc004e',
                },
                selectedChat: {
                    main: '#e6eaeb',
                },
                background: {
                    default: '#121212',
                    paper: '#333',
                },
            }
            : {
                primary: {
                    main: '#f0f2f5',
                },
                secondary: {
                    main: '#f48fb1',
                },
                background: {
                    default: '#121212',
                    paper: '#333',
                },
                text: {
                    primary: '#ffffff',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                },
                selectedChat: {
                    main: '#393939',
                },
            }),
    },
    typography: {
        fontFamily: 'Work Sans, sans-serif',
    },
});

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const savedMode = (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';
        setMode(savedMode);
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('themeMode', newMode);
                    return newMode;
                });
            },
        }),
        []
    );

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeContext;
