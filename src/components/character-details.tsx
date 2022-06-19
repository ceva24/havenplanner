import { Box, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface CharacterDetailsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const CharacterDetails = ({
    character,
    setCharacter,
}: CharacterDetailsProps) => {
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter({ ...character, name: event.target.value });
    };

    const handleExperienceChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCharacter({
            ...character,
            experience: Number.parseInt(event.target.value, 10) || 0,
        });
    };

    const handleGoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCharacter({
            ...character,
            gold: Number.parseInt(event.target.value, 10) || 0,
        });
    };

    return character.characterClass ? (
        <Box
            id="character-details-form"
            aria-label="Character details form"
            component="form"
            textAlign="left"
            sx={{
                "& .MuiTextField-root": { margin: 1 },
            }}
        >
            <TextField
                fullWidth
                id="name"
                label="Name"
                value={character.name}
                onChange={handleNameChange}
            />
            <div>
                <TextField
                    multiline
                    id="experience"
                    label="Experience"
                    type="number"
                    value={character.experience || ""}
                    onChange={handleExperienceChange}
                />
                <TextField
                    multiline
                    disabled
                    id="level"
                    label="Level"
                    value={calculateLevel(character.experience)}
                />
            </div>
            <div>
                <TextField
                    multiline
                    id="gold"
                    label="Gold"
                    value={character.gold || ""}
                    onChange={handleGoldChange}
                />
            </div>
        </Box>
    ) : null;
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
