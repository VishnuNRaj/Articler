import React, { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

interface ColorModeContextType {
    toggleColorMode: () => void;
}

interface ColorModeProviderProps {
    children: ReactNode;
}

const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => {} });

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
                background: {
                    default: '#f0f0f0',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#000000',
                    secondary: '#555555',
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
                    paper: '#333333',
                },
                text: {
                    primary: '#ffffff',
                    secondary: 'rgba(255, 255, 255, 0.7)',
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
