import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";
import Image from "@/components/core/image";
import { characterClasses } from "@/loaders/character-classes";
import { defaultCharacter } from "@/constants";
import { useAppSettingsContext } from "@/hooks/app-settings";
import { createDefaultBattleGoals } from "@/services/character";

interface ClassSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ClassSelect: FC<ClassSelectProps> = ({ character, setCharacter }: ClassSelectProps) => {
    const { appSettings, setAppSettings } = useAppSettingsContext();

    const handleChange = (event: SelectChangeEvent) => {
        findAndSetCharacter(event, character, setCharacter);
        resetAbilityCardsTabConfig(appSettings, setAppSettings);
    };

    return (
        <Box>
            <FormControl sx={{ margin: "1%", width: "60%" }}>
                <InputLabel id="select-class-label">Class</InputLabel>
                <Select
                    value={character.characterClass.name}
                    label="Class"
                    labelId="select-class-label"
                    onChange={handleChange}
                >
                    {characterClasses.map((characterClass: CharacterClass) => (
                        <MenuItem key={characterClass.id} value={characterClass.name}>
                            {characterClass.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Image
                webpPath={character.characterClass.imageUrl}
                fallbackImageType="png"
                altText="Class icon"
                width={70}
                height={70}
            />
        </Box>
    );
};

const findAndSetCharacter = (
    event: SelectChangeEvent,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>
) => {
    const selectedCharacterClass: CharacterClass | undefined = characterClasses.find(
        (characterClass: CharacterClass) => {
            return characterClass.name === event.target.value;
        }
    );

    const newCharacter: Character = {
        ...character,
        characterClass: selectedCharacterClass ?? defaultCharacter.characterClass,
        unlockedAbilityCards: [],
        hand: [],
        gainedEnhancements: [],
        gainedPerks: [],
        battleGoalCheckmarkGroups: createDefaultBattleGoals(),
    };

    setCharacter(newCharacter);
};

const resetAbilityCardsTabConfig = (
    appSettings: AppSettings,
    setAppSettings: Dispatch<SetStateAction<AppSettings>>
) => {
    setAppSettings({ ...appSettings, selectedAbilityCardsTabIndex: 0 });
};

export default ClassSelect;
export { findAndSetCharacter, resetAbilityCardsTabConfig };
