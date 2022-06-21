import {
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { initialCharacter } from "../utils/constants";

interface ClassSelectProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    characterClasses: CharacterClass[];
}

const ClassSelect: React.FC<ClassSelectProps> = ({
    character,
    setCharacter,
    characterClasses,
}: ClassSelectProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        findAndSetCharacter(event, character, setCharacter, characterClasses);
    };

    const matchesBreakpoint = useMediaQuery(useTheme().breakpoints.up("lg"));

    return (
        <FormControl
            sx={{ margin: "1%", width: matchesBreakpoint ? "60%" : "98%" }}
        >
            <InputLabel id="select-class-label">Class</InputLabel>
            <Select
                value={character.characterClass.name}
                label="Class"
                labelId="select-class-label"
                onChange={handleChange}
            >
                {characterClasses.map((characterClass: CharacterClass) => {
                    return (
                        <MenuItem
                            key={characterClass.id}
                            value={characterClass.name}
                        >
                            {characterClass.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

const findAndSetCharacter = (
    event: SelectChangeEvent,
    character: Character,
    setCharacter: Dispatch<SetStateAction<Character>>,
    characterClasses: CharacterClass[]
) => {
    const selectedCharacterClass: CharacterClass | undefined =
        characterClasses.find((characterClass: CharacterClass) => {
            return characterClass.name === event.target.value;
        });

    const newCharacter = {
        ...character,
        characterClass:
            selectedCharacterClass ?? initialCharacter.characterClass,
    };

    setCharacter(newCharacter);
};

export default ClassSelect;
export { findAndSetCharacter };
