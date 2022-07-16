import { Tabs, Tab, Divider, Box } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import Items from "@/components/items";
import Profile from "@/components/profile";

interface TabbedContentProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const TabbedContent = ({ character, setCharacter }: TabbedContentProps) => {
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
                    sx={{ margin: "0.5rem", typography: "body2" }}
                />
                <Tab
                    disableRipple
                    label="Items"
                    id="items-tab"
                    aria-controls="items-tabpanel"
                    sx={{ margin: "0.5rem", typography: "body2" }}
                />
                <Tab
                    disabled
                    disableRipple
                    label="Deck"
                    id="deck-tab"
                    aria-controls="deck-tabpanel"
                    sx={{ margin: "0.5rem", typography: "body2" }}
                />
                <Tab
                    disabled
                    disableRipple
                    label="Perks"
                    id="perks-tab"
                    aria-controls="perks-tabpanel"
                    sx={{ margin: "0.5rem", typography: "body2" }}
                />
            </Tabs>

            <Divider />

            <TabPanel currentTabIndex={currentTabIndex} index={0} id="profile-tabpanel" ariaLabelledBy="profile-tab">
                <Profile character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={1} id="items-tabpanel" ariaLabelledBy="items-tab">
                <Items character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={2} id="deck-tabpanel" ariaLabelledBy="deck-tab" />
            <TabPanel currentTabIndex={currentTabIndex} index={3} id="perks-tabpanel" ariaLabelledBy="perks-tab" />
        </>
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
            {currentTabIndex === index && <Box sx={{ padding: 5 }}>{children}</Box>}
        </div>
    );
};

export default TabbedContent;
