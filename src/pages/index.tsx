import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Container, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { loadCharacterClasses } from "../utils/loader/data-loader";
import { ClassSelect } from "../components/class-select";
import theme from "../styles/theme";
import Header from "../components/header";
import Footer from "../components/footer";
import CharacterMat from "../components/character-mat";

interface AppProps {
    characterClasses: CharacterClass[];
}

const App: NextPage<AppProps> = ({ characterClasses }: AppProps) => {
    const [characterClass, setCharacterClass] = useState<CharacterClass>();

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

            <Container component="main">
                <Grid container spacing={2} height="40rem" textAlign="center">
                    <Grid item xs={12}>
                        <ClassSelect
                            characterClass={characterClass}
                            setCharacterClass={setCharacterClass}
                            characterClasses={characterClasses}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CharacterMat characterClass={characterClass} />
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </ThemeProvider>
    );
};

const getStaticProps: GetStaticProps = async () => {
    return { props: { characterClasses: loadCharacterClasses() } };
};

export { getStaticProps };
export default App;
