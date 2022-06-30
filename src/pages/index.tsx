import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { loadCharacter } from "@/services/character";
import { characterClasses, defaultCharacter } from "@/utils/constants";
import Profile from "@/components/profile";

interface IndexProps {
    initialCharacter: Character;
    characterClasses: CharacterClass[];
}

const Index: NextPage<IndexProps> = ({ initialCharacter, characterClasses }: IndexProps) => {
    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const router = useRouter();
    useEffect(() => {
        void router?.replace("/", undefined, { shallow: true });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTabIndex(value);
    };

    return (
        <Grid container spacing={10} height="100%" minHeight="45rem" justifyContent="center">
            <Grid item lg={12}>
                <Tabs
                    centered
                    value={currentTabIndex}
                    variant="fullWidth"
                    textColor="secondary"
                    indicatorColor="secondary"
                    onChange={handleChange}
                >
                    <Tab
                        disableRipple
                        label="Profile"
                        id="profile-tab"
                        aria-controls="profile-tabpanel"
                        sx={{ typography: "body2" }}
                    />
                    <Tab
                        disabled
                        disableRipple
                        label="Deck"
                        id="deck-tab"
                        aria-controls="deck-tabpanel"
                        sx={{ typography: "body2" }}
                    />
                    <Tab
                        disabled
                        disableRipple
                        label="Perks"
                        id="perks-tab"
                        aria-controls="perks-tabpanel"
                        sx={{ typography: "body2" }}
                    />
                </Tabs>

                <Divider />

                <TabPanel
                    currentTabIndex={currentTabIndex}
                    index={0}
                    id="profile-tabpanel"
                    ariaLabelledBy="profile-tab"
                >
                    <Profile character={character} setCharacter={setCharacter} characterClasses={characterClasses} />
                </TabPanel>
                <TabPanel currentTabIndex={currentTabIndex} index={1} id="deck-tabpanel" ariaLabelledBy="deck-tab" />
                <TabPanel currentTabIndex={currentTabIndex} index={2} id="perks-tabpanel" ariaLabelledBy="perks-tab" />
            </Grid>
        </Grid>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    currentTabIndex: number;
    id: string;
    ariaLabelledBy: string;
}

const TabPanel = ({ children, index, currentTabIndex, id, ariaLabelledBy }: TabPanelProps) => {
    return (
        <div role="tabpanel" id={id} aria-labelledby={ariaLabelledBy} hidden={currentTabIndex !== index}>
            {currentTabIndex === index && <Box sx={{ p: 5 }}>{children}</Box>}
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
