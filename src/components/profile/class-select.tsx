import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Box } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import Image from "@/components/core/image";
import { characterClasses } from "@/loaders/character-classes";
import { defaultCharacter } from "@/constants";
import { useAppSettingsContext } from "@/hooks/app-settings";

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

    const newCharacter = {
        ...character,
        characterClass: selectedCharacterClass ?? defaultCharacter.characterClass,
        unlockedAbilityCards: [],
        hand: [],
    };

    setCharacter(newCharacter);
};

const resetAbilityCardsTabConfig = (
    appSettings: AppSettings,
    setAppSettings: Dispatch<SetStateAction<AppSettings>>
) => {
    setAppSettings({ ...appSettings, showHand: false });
};

export default ClassSelect;
export { findAndSetCharacter, resetAbilityCardsTabConfig };
