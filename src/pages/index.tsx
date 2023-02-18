import { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Container, Grid } from "@mui/material";
import { decode } from "@/services/codec";
import { defaultCharacter } from "@/constants";
import TabContainer from "@/components/tabs/tab-container";
import Header from "@/components/header/header";
import AppSettingsProvider from "@/hooks/app-settings";
import { useClearQueryString } from "@/hooks/use-clear-query-string";

interface IndexProps {
    initialCharacter: Character;
}

const Index: NextPage<IndexProps> = ({ initialCharacter }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    useClearQueryString();

    return (
        <AppSettingsProvider character={character}>
            <Header character={character} setCharacter={setCharacter} />

            <Container component="main" maxWidth="xl">
                <Grid container height="100%" minHeight="45rem" justifyContent="center">
                    <Grid item xs={12}>
                        <TabContainer character={character} setCharacter={setCharacter} />
                    </Grid>
                </Grid>
            </Container>
        </AppSettingsProvider>
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
