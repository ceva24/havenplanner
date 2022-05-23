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
        const selectedChar: CharacterClass | undefined = characterClasses.find(
            (character: CharacterClass) => {
                return character.name === event.target.value;
            }
        );

        setCharacterClass(selectedChar);
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

export { ClassSelect };
