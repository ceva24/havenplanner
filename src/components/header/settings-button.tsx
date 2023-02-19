import { type Dispatch, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextButton } from "@/components/core/button";
import SettingsDrawer from "@/components/settings/settings-drawer";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

interface SettingsButtonProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const SettingsButton = ({ character, setCharacter }: SettingsButtonProps) => {
    const [settingsDrawerIsOpen, setSettingsDrawerIsOpen] = useState<boolean>(false);
    const [appSettings, setAppSettings] = useAppSettingsContext();

    const handleClose = () => {
        removeItemsAboveProsperityLevel(character, setCharacter, appSettings.spoilerSettings.prosperity);
        setSettingsDrawerIsOpen(false);
    };

    return (
        <Box>
            <TextButton
                id="open-settings-button"
                text="Settings"
                startIcon={<SettingsIcon />}
                onClick={() => {
                    setSettingsDrawerIsOpen(true);
                }}
            />
            <SettingsDrawer isOpen={settingsDrawerIsOpen} onClose={handleClose} />
        </Box>
    );
};

const removeItemsAboveProsperityLevel = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    prosperity: number
) => {
    const newCharacter = {
        ...character,
        items: character.items.filter(
            (characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10) <= prosperity
        ),
    };

    setCharacter(newCharacter);
};

export default SettingsButton;
export { removeItemsAboveProsperityLevel };
