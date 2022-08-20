import { Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";
import ClassSelect from "@/components/profile/class-select";
import { calculateLevel } from "@/services/character";

interface CharacterDetailsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const CharacterDetails = ({ character, setCharacter }: CharacterDetailsProps) => {
    const handleChange = (fieldName: string, isNumber: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = isNumber ? Number.parseInt(event.target.value, 10) || 0 : event.target.value;

        setCharacter({ ...character, [fieldName]: value });
    };

    const updateUnlockedAbilityCards = () => {
        const newLevel = calculateLevel(character.experience);
        const validCards = filterInvalidUnlockedAbilityCardsOnLevelChange(character.unlockedAbilityCards, newLevel);

        setCharacter({ ...character, unlockedAbilityCards: validCards });
    };

    return (
        <Box id="character-details-form" aria-label="Character details form" component="form">
            <Box sx={{ marginBottom: 2 }}>
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
                <TextField
                    sx={{ width: "48%", margin: "1%" }}
                    id="experience"
                    label="Experience"
                    value={character.experience || ""}
                    onChange={handleChange("experience", true)}
                    onBlur={updateUnlockedAbilityCards}
                />
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
                    minRows={6}
                    maxRows={6}
                    id="notes"
                    label="Notes"
                    value={character.notes}
                    onChange={handleChange("notes", false)}
                />
            </Box>
        </Box>
    );
};

const filterInvalidUnlockedAbilityCardsOnLevelChange = (
    unlockedAbilityCards: AbilityCard[],
    newCharacterLevel: number
) => {
    if (newCharacterLevel < 2) return [];

    let validUnlockedAbilityCards;

    validUnlockedAbilityCards = unlockedAbilityCards.filter(
        (abilityCard: AbilityCard) => Number.parseInt(abilityCard.level, 10) <= newCharacterLevel
    );

    const cardsAtCurrentLevel = validUnlockedAbilityCards.filter(
        (abilityCard: AbilityCard) => Number.parseInt(abilityCard.level, 10) === newCharacterLevel
    );

    if (cardsAtCurrentLevel.length > 1) {
        const cardsToRemove = new Set(cardsAtCurrentLevel.slice(1));

        validUnlockedAbilityCards = validUnlockedAbilityCards.filter(
            (abilityCard: AbilityCard) => !cardsToRemove.has(abilityCard)
        );
    }

    const maxUnlocks = newCharacterLevel - 1;

    if (validUnlockedAbilityCards.length > maxUnlocks) {
        validUnlockedAbilityCards = validUnlockedAbilityCards.slice(0, maxUnlocks);
    }

    return validUnlockedAbilityCards;
};

export default CharacterDetails;
export { filterInvalidUnlockedAbilityCardsOnLevelChange };
