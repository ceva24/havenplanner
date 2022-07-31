import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { decode } from "@/services/character";
import { defaultCharacter } from "@/utils/constants";
import TabContainer from "@/components/tabs/tab-container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import AppSettingsProvider from "@/hooks/app-settings";
import theme from "@/styles/theme";

interface IndexProps {
    initialCharacter: Character;
}

const Index: NextPage<IndexProps> = ({ initialCharacter }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    useClearQueryString();

    return (
        <ThemeProvider theme={theme}>
            <AppSettingsProvider character={character}>
                <CssBaseline />

                <Head>
                    <title>Gloomhaven Character Planner</title>
                    <link rel="shortcut icon" href="/favicon.png" />
                    <meta
                        name="description"
                        content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                    />
                </Head>

                <Header character={character} />

                <Container component="main" maxWidth="xl">
                    <Grid container height="100%" minHeight="45rem" justifyContent="center">
                        <Grid item xs={12}>
                            <TabContainer character={character} setCharacter={setCharacter} />
                        </Grid>
                    </Grid>
                </Container>

                <Footer />
            </AppSettingsProvider>
        </ThemeProvider>
    );
};

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let character = defaultCharacter;

    const encodedCharacterData: string | string[] | undefined = context.query.character;

    if (typeof encodedCharacterData === "string") {
        try {
            character = decode(encodedCharacterData);
        } catch {}
    }

    return {
        props: {
            initialCharacter: character,
        },
    };
};

const useClearQueryString = () => {
    const router = useRouter();

    useEffect(() => {
        void router?.replace("/", undefined, { shallow: true });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default Index;
export { getServerSideProps };
