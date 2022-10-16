import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { decode } from "@/services/encoder";
import { defaultCharacter } from "@/constants";
import TabContainer from "@/components/tabs/tab-container";
import Header from "@/components/header/header";
import AppSettingsProvider from "@/hooks/app-settings";
import theme from "@/styles/theme";
import { useClearQueryString } from "@/hooks/use-clear-query-string";

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
                    <meta
                        name="description"
                        content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                    />
                    <link rel="shortcut icon" href="/favicon.png" />
                </Head>

                <Header character={character} />

                <Container component="main" maxWidth="xl">
                    <Grid container height="100%" minHeight="45rem" justifyContent="center">
                        <Grid item xs={12}>
                            <TabContainer character={character} setCharacter={setCharacter} />
                        </Grid>
                    </Grid>
                </Container>
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

export default Index;
export { getServerSideProps };
