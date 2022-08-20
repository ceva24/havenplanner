import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { TextField } from "@mui/material";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateLevel,
    calculateMaximumUnlockCount,
} from "@/services/character";

interface ExperienceFieldProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    handleChange: (field: string, isNumber: boolean) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const ExperienceField: FC<ExperienceFieldProps> = ({ character, setCharacter, handleChange }: ExperienceFieldProps) => {
    const handleExperienceLoseBlur = () => {
        const newLevel = calculateLevel(character.experience);
        const validCards = filterInvalidUnlockedAbilityCardsOnLevelChange(character.unlockedAbilityCards, newLevel);

        setCharacter({ ...character, unlockedAbilityCards: validCards });
    };

    return (
        <TextField
            sx={{ width: "48%", margin: "1%" }}
            id="experience"
            label="Experience"
            value={character.experience || ""}
            onChange={handleChange("experience", true)}
            onBlur={handleExperienceLoseBlur}
        />
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

export default ExperienceField;
export { filterInvalidUnlockedAbilityCardsOnLevelChange };
