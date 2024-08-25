import '../styles/globals.css';
import { ColorModeProvider } from '../context/ThemeContext';
import { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ColorModeProvider>
            <Component {...pageProps} />
        </ColorModeProvider>
    );
}

export default MyApp;
