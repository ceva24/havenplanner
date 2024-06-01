import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";
import ClassSelect from "@/client/components/profile/class-select";
import ExperienceField from "@/client/components/profile/experience-field";
import { calculateLevel, getExperienceForLevel } from "@/client/services/profile";

interface CharacterDetailsProperties {
    readonly character: Character;
    readonly setCharacter: Dispatch<SetStateAction<Character>>;
}

const CharacterDetails = ({ character, setCharacter }: CharacterDetailsProperties) => {
    const handleChange = (fieldName: string, isNumber: boolean) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = isNumber ? Number.parseInt(event.target.value, 10) || 0 : event.target.value;

        setCharacter({ ...character, [fieldName]: value });
    };

    const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateLevel(event.target.value, character, setCharacter);
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
                    sx={{ width: "48%", margin: "1%" }}
                    id="level"
                    label="Level"
                    type="number"
                    value={calculateLevel(character.experience)}
                    onChange={handleLevelChange}
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

const updateLevel = (value: string, character: Character, setCharacter: Dispatch<SetStateAction<Character>>) => {
    const newLevel: number = Number.parseInt(value, 10) || 0;

    if (newLevel < 1 || newLevel > 9) return;

    if (calculateLevel(character.experience) === newLevel) return;

    setCharacter({
        ...character,
        experience: getExperienceForLevel(newLevel),
    });
};

export default CharacterDetails;
export { updateLevel };
