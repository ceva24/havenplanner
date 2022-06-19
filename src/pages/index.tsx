import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { loadCharacterClasses } from "../utils/data-loader";
import theme from "../styles/theme";
import Header from "../components/header";
import Footer from "../components/footer";
import CharacterMat from "../components/character-mat";
import CharacterDetails from "../components/character-details";
import { initialCharacter } from "../utils/constants";

interface IndexProps {
    initialCharacter: Character;
    characterClasses: CharacterClass[];
}

const Index: NextPage<IndexProps> = ({
    initialCharacter,
    characterClasses,
}: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Head>
                <title>Gloomhaven Character Planner</title>
                <meta
                    name="description"
                    content="A web application to create character builds for the popular tabletop and digital game Gloomhaven"
                />
            </Head>

            <Header />

            <Container component="main" maxWidth={false}>
                <Grid container spacing={10} height="40rem" textAlign="center">
                    <Grid item xs={4}>
                        <CharacterDetails
                            character={character}
                            setCharacter={setCharacter}
                            characterClasses={characterClasses}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CharacterMat
                            characterClass={character.characterClass}
                        />
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </Container>

            <Footer />
        </ThemeProvider>
    );
};

const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            initialCharacter,
            characterClasses: loadCharacterClasses(),
        },
    };
};

export { getStaticProps };
export default Index;
