import { type Dispatch, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextButton } from "@/components/core/button";
import SettingsDialog from "@/components/settings/settings-dialog";
import { findAndSetCharacterClass } from "@/components/profile/class-select";
import { useSettingsContext } from "@/hooks/use-settings";
import { itemShouldBeHidden } from "@/services/items";
import { isUnlocked } from "@/services/character-classes";

interface SettingsButtonProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const SettingsButton = ({ character, setCharacter }: SettingsButtonProps) => {
    const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState<boolean>(false);
    const [settings] = useSettingsContext();

    const handleClose = () => {
        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);
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

const updateCharacterAfterChangingSpoilerSettings = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    settings: Settings
) => {
    const newCharacter = {
        ...character,
        items: character.items.filter(
            (characterItem: CharacterItem) => !itemShouldBeHidden(characterItem.item, settings.spoilerSettings)
        ),
    };

    if (isUnlocked(character.characterClass, settings.spoilerSettings)) {
        setCharacter(newCharacter);
    } else {
        findAndSetCharacterClass(settings.gameData.defaultCharacter.name, newCharacter, setCharacter, settings);
    }
};

export default SettingsButton;
export { updateCharacterAfterChangingSpoilerSettings };
