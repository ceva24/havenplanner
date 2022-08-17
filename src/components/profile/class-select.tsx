import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { characterClasses, defaultCharacter } from "@/utils/constants";
import AppImage from "@/components/app-image";

interface ClassSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ClassSelect: React.FC<ClassSelectProps> = ({ character, setCharacter }: ClassSelectProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        findAndSetCharacter(event, character, setCharacter);
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
                    {characterClasses.map((characterClass: CharacterClass) => {
                        return (
                            <MenuItem key={characterClass.id} value={characterClass.name}>
                                {characterClass.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <AppImage
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
    };

    setCharacter(newCharacter);
};

export default ClassSelect;
export { findAndSetCharacter };
