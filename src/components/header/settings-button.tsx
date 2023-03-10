import { type Dispatch, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { itemShouldBeHidden } from "@/services/items";
import { TextButton } from "@/components/core/button";
import SettingsDialog from "@/components/settings/settings-dialog";
import { findAndSetCharacterClass } from "@/components/profile/class-select";
import { useSettingsContext } from "@/hooks/use-settings";
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
    removeSpoilerItems(character, setCharacter, settings.spoilerSettings);
    resetCharacterClassIfLocked(character, setCharacter, settings);
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

const resetCharacterClassIfLocked = (
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    settings: Settings
) => {
    if (!isUnlocked(character.characterClass, settings)) {
        findAndSetCharacterClass(settings.gameData.defaultCharacter.name, character, setCharacter, settings);
    }
};

export default SettingsButton;
export { updateCharacterAfterChangingSpoilerSettings };
