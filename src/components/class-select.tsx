import {
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ClassSelectProps {
    characterClass: CharacterClass | undefined;
    setCharacterClass: Dispatch<SetStateAction<CharacterClass | undefined>>;
    characterClasses: CharacterClass[];
}

const ClassSelect: React.FC<ClassSelectProps> = ({
    characterClass,
    setCharacterClass,
    characterClasses,
}: ClassSelectProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        findAndSetCharacter(event, setCharacterClass, characterClasses);
    };

    return (
        <FormControl style={{ minWidth: "10rem" }}>
            <InputLabel id="select-class-label">Class</InputLabel>
            <Select
                value={characterClass?.name ?? ""}
                label="Class"
                labelId="select-class-label"
                onChange={handleChange}
            >
                <MenuItem key="" value="">
                    None
                </MenuItem>
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
    setCharacterClass: Dispatch<SetStateAction<CharacterClass | undefined>>,
    characterClasses: CharacterClass[]
) => {
    const selectedChar: CharacterClass | undefined = characterClasses.find(
        (character: CharacterClass) => {
            return character.name === event.target.value;
        }
    );

    setCharacterClass(selectedChar);
};

export default ClassSelect;
export { findAndSetCharacter };
