import { Tabs, Tab, Divider } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import TabPanel from "@/components/tabs/tab-panel";
import Profile from "@/components/tabs/profile";
import Items from "@/components/tabs/items";
import AbilityCards from "@/components/tabs/ability-cards";

interface TabContainerProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const TabContainer = ({ character, setCharacter }: TabContainerProps) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTabIndex(value);
    };

    return (
        <>
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
                    disableRipple
                    label="Items"
                    id="items-tab"
                    aria-controls="items-tabpanel"
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
                    disabled
                    disableRipple
                    label="Perks"
                    id="perks-tab"
                    aria-controls="perks-tabpanel"
                    sx={{ typography: "body2" }}
                />
            </Tabs>

            <Divider />

            <TabPanel currentTabIndex={currentTabIndex} index={0} id="profile-tabpanel" ariaLabelledBy="profile-tab">
                <Profile character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={1} id="items-tabpanel" ariaLabelledBy="items-tab">
                <Items character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel
                currentTabIndex={currentTabIndex}
                index={2}
                id="ability-cards-tabpanel"
                ariaLabelledBy="ability-cards-tab"
            >
                <AbilityCards character={character} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={3} id="perks-tabpanel" ariaLabelledBy="perks-tab" />
        </>
    );
};

export default TabContainer;
