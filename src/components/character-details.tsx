import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import ClassSelect from "./class-select";

interface CharacterDetailsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    characterClasses: CharacterClass[];
}

const CharacterDetails = ({
    character,
    setCharacter,
    characterClasses,
}: CharacterDetailsProps) => {
    const handleChange =
        (fieldName: string, isNumber: boolean) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = isNumber
                ? Number.parseInt(event.target.value, 10) || 0
                : event.target.value;

            setCharacter({ ...character, [fieldName]: value });
        };

    return (
        <Box
            id="character-details-form"
            aria-label="Character details form"
            component="form"
            textAlign="left"
            sx={{
                "& .MuiFormControl-root": { margin: "0.5rem" },
            }}
        >
            <div>
                <ClassSelect
                    character={character}
                    setCharacter={setCharacter}
                    characterClasses={characterClasses}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    value={character.name}
                    onChange={handleChange("name", false)}
                />
            </div>
            <div>
                <TextField
                    sx={{ width: "10rem" }}
                    id="experience"
                    label="Experience"
                    value={character.experience || ""}
                    onChange={handleChange("experience", true)}
                />
                <TextField
                    disabled
                    sx={{ width: "10rem" }}
                    id="level"
                    label="Level"
                    value={calculateLevel(character.experience)}
                />
            </div>
            <div>
                <TextField
                    sx={{ width: "10rem" }}
                    id="gold"
                    label="Gold"
                    value={character.gold || ""}
                    onChange={handleChange("gold", true)}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    id="notes"
                    label="Notes"
                    value={character.notes}
                    onChange={handleChange("notes", false)}
                />
            </div>
        </Box>
    );
};

const calculateLevel = (experience: number): number => {
    switch (true) {
        case experience < 45:
            return 1;
        case experience < 95:
            return 2;
        case experience < 150:
            return 3;
        case experience < 210:
            return 4;
        case experience < 275:
            return 5;
        case experience < 345:
            return 6;
        case experience < 420:
            return 7;
        case experience < 500:
            return 8;
        case experience >= 500:
            return 9;
        default:
            return 1;
    }
};

export default CharacterDetails;
export { calculateLevel };
