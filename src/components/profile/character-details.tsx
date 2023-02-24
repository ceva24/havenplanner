import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";
import ClassSelect from "@/components/profile/class-select";
import ExperienceField from "@/components/profile/experience-field";
import { calculateLevel } from "@/services/profile";

interface CharacterDetailsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const CharacterDetails = ({ character, setCharacter }: CharacterDetailsProps) => {
    const handleChange = (fieldName: string, isNumber: boolean) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = isNumber ? Number.parseInt(event.target.value, 10) || 0 : event.target.value;

        setCharacter({ ...character, [fieldName]: value });
    };

    return (
        <Box id="character-details-form" aria-label="Character Details" component="form">
            <Box>
                <ClassSelect character={character} setCharacter={setCharacter} />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "98%", margin: "1%" }}
                    id="name"
                    label="Name"
                    value={character.name}
                    onChange={handleChange("name", false)}
                />
            </Box>
            <Box>
                <ExperienceField character={character} setCharacter={setCharacter} handleChange={handleChange} />
                <TextField
                    disabled
                    sx={{ width: "48%", margin: "1%" }}
                    id="level"
                    label="Level"
                    value={calculateLevel(character.experience)}
                />
            </Box>
            <Box>
                <TextField
                    sx={{ width: "48%", margin: "1%" }}
                    id="gold"
                    label="Gold"
                    value={character.gold || ""}
                    onChange={handleChange("gold", true)}
                />
            </Box>
            <Box>
                <TextField
                    multiline
                    sx={{ width: "98%", margin: "1%" }}
                    minRows={8}
                    maxRows={8}
                    id="notes"
                    label="Notes"
                    value={character.notes}
                    onChange={handleChange("notes", false)}
                />
            </Box>
        </Box>
    );
};

export default CharacterDetails;
