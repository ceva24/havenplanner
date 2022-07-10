import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { loadCharacter } from "@/services/character";
import { defaultCharacter } from "@/utils/constants";
import TabbedContent from "@/components/tabbed-content";
import Footer from "@/components/footer";
import Header from "@/components/header";
import theme from "@/styles/theme";

interface IndexProps {
    initialCharacter: Character;
}

const Index: NextPage<IndexProps> = ({ initialCharacter }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    useClearQueryString();

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

            <Header character={character} />

            <Container component="main" maxWidth="xl">
                <Grid container height="100%" minHeight="45rem" justifyContent="center">
                    <Grid item lg={12}>
                        <TabbedContent character={character} setCharacter={setCharacter} />
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </ThemeProvider>
    );
};

const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let character = defaultCharacter;

    const characterDataToLoad: string | string[] | undefined = context.query.character;

    if (typeof characterDataToLoad === "string") {
        try {
            character = loadCharacter(characterDataToLoad);
        } catch (error: unknown) {
            console.error(`Failed to load character details from data '${characterDataToLoad}':`, error);
        }
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
