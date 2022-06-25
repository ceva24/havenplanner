import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { loadCharacter } from "@/services/character";
import CharacterMat from "@/components/character-mat";
import CharacterDetails from "@/components/character-details";
import { characterClasses, defaultCharacter } from "@/utils/constants";

interface IndexProps {
    initialCharacter: Character;
    characterClasses: CharacterClass[];
}

const Index: NextPage<IndexProps> = ({ initialCharacter, characterClasses }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    const router = useRouter();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router?.replace("/", undefined, { shallow: true });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            characterClasses,
        },
    };
};

export default Index;
export { getServerSideProps };
