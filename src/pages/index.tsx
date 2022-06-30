import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
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
        void router?.replace("/", undefined, { shallow: true });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={10} height="100%" minHeight="45rem" justifyContent="center">
            <Grid item lg={12}>
                <Tabs
                    centered
                    value={value}
                    variant="fullWidth"
                    textColor="secondary"
                    indicatorColor="secondary"
                    onChange={handleChange}
                >
                    <Tab disableRipple label="Profile" sx={{ typography: "body2" }} />
                    <Tab disabled disableRipple label="Deck" sx={{ typography: "body2" }} />
                    <Tab disabled disableRipple label="Perks" sx={{ typography: "body2" }} />
                </Tabs>
                <Divider />

                <TabPanel value={value} index={0}>
                    <Grid container spacing={10}>
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
                </TabPanel>
                <TabPanel value={value} index={1} />
                <TabPanel value={value} index={2} />
            </Grid>
        </Grid>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
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
