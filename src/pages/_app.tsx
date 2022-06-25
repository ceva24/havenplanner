import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "@/components/footer";
import Header from "@/components/header";
import theme from "@/styles/theme";

const GloomhavenCharacterPlanner = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Head>
                <title>Gloomhaven Character Planner</title>
                <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="description"
                    content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                />
            </Head>

            <Header />

            <Container component="main" maxWidth="xl">
                <Component {...pageProps} />
            </Container>

            <Footer />
        </ThemeProvider>
    );
};

export default GloomhavenCharacterPlanner;
