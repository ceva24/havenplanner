import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { loadCharacter } from "@/services/character";
import { defaultCharacter } from "@/utils/constants";
import TabbedContent from "@/components/tabbed-content";

interface IndexProps {
    initialCharacter: Character;
}

const Index: NextPage<IndexProps> = ({ initialCharacter }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);

    const router = useRouter();
    useEffect(() => {
        void router?.replace("/", undefined, { shallow: true });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid container spacing={10} height="100%" minHeight="45rem" justifyContent="center">
            <Grid item lg={12}>
                <TabbedContent character={character} setCharacter={setCharacter} />
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
        },
    };
};

// Todo move share button below tabbed content
// todo investigate moving character to global state - context/recoil?

export default Index;
export { getServerSideProps };
