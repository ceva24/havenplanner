import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { Grid } from "@mui/material";
import CharacterMat from "../components/character-mat";
import CharacterDetails from "../components/character-details";
import { characterClasses, initialCharacter } from "../utils/constants";

interface IndexProps {
    initialCharacter: Character;
    characterClasses: CharacterClass[];
}

const Index: NextPage<IndexProps> = ({ initialCharacter, characterClasses }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    return (
        <Grid container spacing={10} height="100%" minHeight="40rem" justifyContent="center">
            <Grid item lg={4}>
                <CharacterDetails
                    character={character}
                    setCharacter={setCharacter}
                    characterClasses={characterClasses}
                />
            </Grid>
            <Grid item lg={8} textAlign="center">
                <CharacterMat characterClass={character.characterClass} />
            </Grid>
        </Grid>
    );
};

const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            initialCharacter,
            characterClasses,
        },
    };
};

export default Index;
export { getStaticProps };
