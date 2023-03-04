import type { SelectChangeEvent } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";
import Image from "@/components/core/image";
import { useSettingsContext } from "@/hooks/use-settings";

interface ClassSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ClassSelect: FC<ClassSelectProps> = ({ character, setCharacter }: ClassSelectProps) => {
    const [settings, setSettings] = useSettingsContext();

    const handleChange = (event: SelectChangeEvent) => {
        findAndSetCharacterClass(event, character, setCharacter, settings);
        resetAbilityCardsTabConfig(settings, setSettings);
    };

    return (
        <FormControl sx={{ margin: "1%", width: "98%" }}>
            <InputLabel id="select-class-label">Class</InputLabel>
            <Select
                value={character.characterClass.name}
                label="Class"
                labelId="select-class-label"
                onChange={handleChange}
            >
                {settings.gameData.characterClasses.map((characterClass: CharacterClass) => (
                    <MenuItem key={characterClass.id} value={characterClass.name}>
                        <Image
                            webpPath={characterClass.imageUrl}
                            fallbackImageType="png"
                            altText={`${characterClass.name} Class Icon`}
                            style={{ verticalAlign: "middle", marginRight: 10, flexShrink: 0 }}
                            height={30}
                            width={30}
                            aria-hidden="true"
                        />
                        {characterClass.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const findAndSetCharacterClass = (
    event: SelectChangeEvent,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    settings: Settings
) => {
    const selectedCharacterClass: CharacterClass | undefined = settings.gameData.characterClasses.find(
        (characterClass: CharacterClass) => {
            return characterClass.name === event.target.value;
        }
    );

    const updatedCharacter: Character = {
        ...character,
        characterClass: selectedCharacterClass ?? settings.gameData.defaultCharacter.characterClass,
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: settings.gameData.battleGoalCheckmarks.slice(),
    };

    setCharacter(updatedCharacter);
};

const resetAbilityCardsTabConfig = (settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    setSettings({ ...settings, selectedAbilityCardsTabIndex: 0 });
};

export default ClassSelect;
export { findAndSetCharacterClass as findAndSetCharacter, resetAbilityCardsTabConfig };
