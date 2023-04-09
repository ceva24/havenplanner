import { type Dispatch, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { TextButton } from "@/client/components/core/button";
import SettingsDialog from "@/client/components/settings/settings-dialog";
import { findAndSetCharacterClass } from "@/client/components/profile/class-select";
import { useSettingsContext } from "@/client/hooks/use-settings";
import { itemShouldBeHidden } from "@/shared/services/items";
import { isInitialOrUnlockedClass } from "@/shared/services/character-classes";

interface SettingsButtonProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const SettingsButton = ({ character, setCharacter }: SettingsButtonProps) => {
    const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState<boolean>(false);
    const [settings] = useSettingsContext();

    const handleClose = async () => {
        await updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);
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

const updateCharacterAfterChangingSpoilerSettings = async (
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

    if (isInitialOrUnlockedClass(character.characterClass, settings.spoilerSettings)) {
        setCharacter(newCharacter);
    } else {
        await findAndSetCharacterClass(
            settings.gameData.defaultCharacter.name,
            [{ ...settings.gameData.defaultCharacter.characterClass }],
            newCharacter,
            setCharacter,
            settings
        );
    }
};

export default SettingsButton;
export { updateCharacterAfterChangingSpoilerSettings };
