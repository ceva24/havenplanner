import { type Dispatch, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { itemShouldBeHidden } from "@/services/items";
import { TextButton } from "@/components/core/button";
import SettingsDialog from "@/components/settings/settings-dialog";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

interface SettingsButtonProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const SettingsButton = ({ character, setCharacter }: SettingsButtonProps) => {
    const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState<boolean>(false);
    const [appSettings] = useAppSettingsContext();

    const handleClose = () => {
        removeSpoilerItems(character, setCharacter, appSettings.spoilerSettings);
        setSettingsDialogIsOpen(false);
    };

    return (
        <Box>
            <TextButton
                id="open-settings-button"
                text="Settings"
                startIcon={<SettingsIcon />}
                onClick={() => {
                    setSettingsDialogIsOpen(true);
                }}
            />
            <SettingsDialog isOpen={settingsDialogIsOpen} onClose={handleClose} />
        </Box>
    );
};

const removeSpoilerItems = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    spoilerSettings: SpoilerSettings
) => {
    const newCharacter = {
        ...character,
        items: character.items.filter(
            (characterItem: CharacterItem) => !itemShouldBeHidden(characterItem.item, spoilerSettings)
        ),
    };

    setCharacter(newCharacter);
};

export default SettingsButton;
export { removeSpoilerItems };
