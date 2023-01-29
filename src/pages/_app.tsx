import { type AppProps } from "next/app";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import ErrorTemplate from "@/components/error/error-template";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Gloomhaven Character Planner</title>
                <meta
                    name="description"
                    content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ErrorBoundary fallback={<ErrorTemplate message="Sorry, an unexpected error has occurred" />}>
                    <Component {...pageProps} />
                </ErrorBoundary>
            </ThemeProvider>
        </>
    );
};

export default App;
