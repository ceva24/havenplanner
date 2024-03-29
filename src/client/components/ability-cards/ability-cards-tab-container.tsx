import { useState, type SyntheticEvent, type Dispatch, type SetStateAction } from "react";
import { Tabs, Tab, type TabsTypeMap, useMediaQuery, useTheme } from "@mui/material";
import { type DefaultComponentProps } from "@mui/material/OverridableComponent";
import TabPanel from "@/client/components/tabs/tab-panel";
import Deck from "@/client/components/ability-cards/deck/deck";
import Hand from "@/client/components/ability-cards/hand/hand";
import Enhancements from "@/client/components/ability-cards/enhancements/enhancements";
import EditHandDialog from "@/client/components/ability-cards/hand/edit-hand-dialog";
import { useSettingsContext } from "@/client/hooks/use-settings";

interface AbilityCardsTabContainerProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const AbilityCardsTabContainer = ({ character, setCharacter }: AbilityCardsTabContainerProps) => {
    const [settings, setSettings] = useSettingsContext();

    const [editHandDialogOpen, setEditHandDialogOpen] = useState<boolean>(false);
    const responsiveTabProps = useResponsiveTabsProps();

    const handleChange = (event: SyntheticEvent, value: number) => {
        setSettings({ ...settings, userSettings: { ...settings.userSettings, selectedAbilityCardsTabIndex: value } });
    };

    return (
        <>
            <Tabs
                centered
                value={settings.userSettings.selectedAbilityCardsTabIndex}
                onChange={handleChange}
                {...responsiveTabProps}
            >
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
                currentTabIndex={settings.userSettings.selectedAbilityCardsTabIndex}
                index={0}
                id="deck-tabpanel"
                ariaLabelledBy="deck-tab"
            >
                <Deck character={character} setCharacter={setCharacter} />
            </TabPanel>
            <TabPanel
                currentTabIndex={settings.userSettings.selectedAbilityCardsTabIndex}
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
                currentTabIndex={settings.userSettings.selectedAbilityCardsTabIndex}
                index={2}
                id="enhancements-tabpanel"
                ariaLabelledBy="enhancements-tab"
            >
                <Enhancements character={character} setCharacter={setCharacter} />
            </TabPanel>
        </>
    );
};

const useResponsiveTabsProps = (): Partial<DefaultComponentProps<TabsTypeMap>> => {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down(500));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

    switch (true) {
        case isSmallScreen:
            return { variant: "scrollable", allowScrollButtonsMobile: true };
        case isMediumScreen:
            return { variant: "fullWidth" };
        default:
            return {};
    }
};

export default AbilityCardsTabContainer;
