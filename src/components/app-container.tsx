import { type Dispatch, type SetStateAction, type SyntheticEvent, useState } from "react";
import { Container, Divider, Grid, Tab, Tabs } from "@mui/material";
import TabPanel from "@/components/tabs/tab-panel";
import Profile from "@/components/profile/profile";
import AbilityCards from "@/components/ability-cards/ability-cards";
import Items from "@/components/items/items";
import Perks from "@/components/perks/perks";

interface AppContainerProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AppContainer = ({ character, setCharacter }: AppContainerProps) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, value: number) => {
        setCurrentTabIndex(value);
    };

    return (
        <Container component="main" maxWidth="xl">
            <Grid container height="100%" justifyContent="center">
                <Grid item xs={12}>
                    <Tabs centered value={currentTabIndex} variant="fullWidth" onChange={handleChange}>
                        <Tab
                            disableRipple
                            label="Profile"
                            id="profile-tab"
                            aria-controls="profile-tabpanel"
                            sx={{ typography: "body2" }}
                        />
                        <Tab
                            disableRipple
                            label="Perks"
                            id="perks-tab"
                            aria-controls="perks-tabpanel"
                            sx={{ typography: "body2" }}
                        />
                        <Tab
                            disableRipple
                            label="Ability Cards"
                            id="ability-cards-tab"
                            aria-controls="ability-cards-tabpanel"
                            sx={{ typography: "body2" }}
                        />
                        <Tab
                            disableRipple
                            label="Items"
                            id="items-tab"
                            aria-controls="items-tabpanel"
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
                        <Profile character={character} setCharacter={setCharacter} />
                    </TabPanel>
                    <TabPanel
                        currentTabIndex={currentTabIndex}
                        index={1}
                        id="perks-tabpanel"
                        ariaLabelledBy="perks-tab"
                    >
                        <Perks character={character} setCharacter={setCharacter} />
                    </TabPanel>
                    <TabPanel
                        currentTabIndex={currentTabIndex}
                        index={2}
                        id="ability-cards-tabpanel"
                        ariaLabelledBy="ability-cards-tab"
                    >
                        <AbilityCards character={character} setCharacter={setCharacter} />
                    </TabPanel>
                    <TabPanel
                        currentTabIndex={currentTabIndex}
                        index={3}
                        id="items-tabpanel"
                        ariaLabelledBy="items-tab"
                    >
                        <Items character={character} setCharacter={setCharacter} />
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AppContainer;
