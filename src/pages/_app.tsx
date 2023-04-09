import { type AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;
