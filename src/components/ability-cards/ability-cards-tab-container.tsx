import { useState, type SyntheticEvent, type Dispatch, type SetStateAction } from "react";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@/components/tabs/tab-panel";
import Deck from "@/components/ability-cards/deck/deck";
import Hand from "@/components/ability-cards/hand/hand";
import Enhancements from "@/components/ability-cards/enhancements/enhancements";
import EditHandDialog from "@/components/ability-cards/hand/edit-hand-dialog";
import { useAppSettingsContext } from "@/hooks/app-settings";

interface AbilityCardsTabContainerProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCardsTabContainer = ({ character, setCharacter }: AbilityCardsTabContainerProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();
    const [editHandDialogOpen, setEditHandDialogOpen] = useState<boolean>(false);

    const handleChange = (event: SyntheticEvent, value: number) => {
        setAppSettings({ ...appSettings, selectedAbilityCardsTabIndex: value });
    };

    return (
        <>
            <Tabs centered value={appSettings.selectedAbilityCardsTabIndex} onChange={handleChange}>
                <Tab
                    disableRipple
                    label="Deck"
                    id="deck-tab"
                    aria-controls="deck-tabpanel"
                    sx={{ typography: "body2", width: { md: "15%" } }}
                />
                <Tab
                    disableRipple
                    label="Hand"
                    id="hand-tab"
                    aria-controls="hand-tabpanel"
                    sx={{ typography: "body2", width: { md: "15%" } }}
                />
                <Tab
                    disableRipple
                    label="Enhancements"
                    id="enhancements-tab"
                    aria-controls="enhancements-tabpanel"
                    sx={{ typography: "body2", width: { md: "15%" } }}
                />
            </Tabs>

            <TabPanel
                currentTabIndex={appSettings.selectedAbilityCardsTabIndex}
                index={0}
                id="deck-tabpanel"
                ariaLabelledBy="deck-tab"
            >
                <Deck character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel
                currentTabIndex={appSettings.selectedAbilityCardsTabIndex}
                index={1}
                id="hand-tabpanel"
                ariaLabelledBy="hand-tab"
            >
                <Hand
                    character={character}
                    openEditHandDialog={() => {
                        setEditHandDialogOpen(true);
                    }}
                />
                <EditHandDialog
                    character={character}
                    setCharacter={setCharacter}
                    isOpen={editHandDialogOpen}
                    handleClose={() => {
                        setEditHandDialogOpen(false);
                    }}
                />
            </TabPanel>
            <TabPanel
                currentTabIndex={appSettings.selectedAbilityCardsTabIndex}
                index={2}
                id="enhancements-tabpanel"
                ariaLabelledBy="enhancements-tab"
            >
                <Enhancements character={character} setCharacter={setCharacter} />
            </TabPanel>
        </>
    );
};

export default AbilityCardsTabContainer;
