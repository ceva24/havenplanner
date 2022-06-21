import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { Grid } from "@mui/material";
import { loadCharacterClasses } from "../utils/data-loader";
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
        <Grid container spacing={10} height="40rem" textAlign="center">
            <Grid item xs={4}>
                <CharacterDetails
                    character={character}
                    setCharacter={setCharacter}
                    characterClasses={characterClasses}
                />
            </Grid>
            <Grid item xs={8}>
                <CharacterMat characterClass={character.characterClass} />
            </Grid>
        </Grid>
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

export default Index;
export { getStaticProps };
