import { Dispatch, SetStateAction } from "react";
import { Box, TextField } from "@mui/material";
import ClassSelect from "@/components/profile/class-select";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateLevel,
    calculateMaximumUnlockCount,
} from "@/services/character";

interface CharacterDetailsProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const CharacterDetails = ({ character, setCharacter }: CharacterDetailsProps) => {
    const handleChange = (fieldName: string, isNumber: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = isNumber ? Number.parseInt(event.target.value, 10) || 0 : event.target.value;

        setCharacter({ ...character, [fieldName]: value });
    };

    const handleExperienceLoseBlur = () => {
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
                    onBlur={handleExperienceLoseBlur}
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

    const abilityCardsAtOrBelowCurrentLevel = filterAbilityCardsAtOrBelowCurrentLevel(
        unlockedAbilityCards,
        newCharacterLevel
    );

    const abilityCardsWithOneUnlockAtCurrentLevel = filterAbilityCardsWithOnlyOneAtCurrentLevel(
        abilityCardsAtOrBelowCurrentLevel,
        newCharacterLevel
    );

    return filterAbilityCardsToMaximumUnlockCount(abilityCardsWithOneUnlockAtCurrentLevel, newCharacterLevel);
};

const filterAbilityCardsAtOrBelowCurrentLevel = (
    unlockedAbilityCards: AbilityCard[],
    newCharacterLevel: number
): AbilityCard[] => {
    return unlockedAbilityCards.filter((abilityCard: AbilityCard) =>
        abilityCardLevelCanBeUnlockedByCharacter(abilityCard.level, newCharacterLevel)
    );
};

const filterAbilityCardsWithOnlyOneAtCurrentLevel = (
    unlockedAbilityCards: AbilityCard[],
    newCharacterLevel: number
): AbilityCard[] => {
    const abilityCardsUnlockedAtCurrentLevel = abilityCardsUnlockedAtLevel(
        unlockedAbilityCards,
        newCharacterLevel.toString()
    );

    if (abilityCardsUnlockedAtCurrentLevel.length <= 1) return unlockedAbilityCards;

    const cardsToRemove = new Set(abilityCardsUnlockedAtCurrentLevel.slice(1));

    return unlockedAbilityCards.filter((abilityCard: AbilityCard) => !cardsToRemove.has(abilityCard));
};

const filterAbilityCardsToMaximumUnlockCount = (
    unlockedAbilityCards: AbilityCard[],
    newCharacterLevel: number
): AbilityCard[] => {
    const maxUnlocks = calculateMaximumUnlockCount(newCharacterLevel);

    if (unlockedAbilityCards.length <= maxUnlocks) return unlockedAbilityCards;

    return unlockedAbilityCards.slice(0, maxUnlocks);
};

export default CharacterDetails;
export { filterInvalidUnlockedAbilityCardsOnLevelChange };
