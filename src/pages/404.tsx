import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import ErrorTemplate from "@/client/components/error/error-template";
import Header from "@/client/components/header/header";
import theme from "@/client/themes/default";

const NotFoundPage = () => {
    return (
        <>
            <Head>
                <title>Error - HavenPlanner</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header title="HavenPlanner" />
                <ErrorTemplate message="Page not found" />
            </ThemeProvider>
        </>
    );
};

export default NotFoundPage;
