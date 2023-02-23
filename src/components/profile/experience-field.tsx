import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { TextField } from "@mui/material";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
} from "@/services/character";
import { calculateLevel } from "@/services/profile";

interface ExperienceFieldProps {
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
    handleChange: (field: string, isNumber: boolean) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const ExperienceField: FC<ExperienceFieldProps> = ({ character, setCharacter, handleChange }: ExperienceFieldProps) => {
    const handleExperienceLoseBlur = () => {
        const newLevel = calculateLevel(character.experience);

        setCharacter({
            ...character,
            unlockedAbilityCards: updateUnlockedAbilityCards(character.unlockedAbilityCards, newLevel),
            hand: updateCardsInHand(character.hand, newLevel),
        });
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

const updateUnlockedAbilityCards = (unlockedAbilityCards: AbilityCard[], newCharacterLevel: number): AbilityCard[] => {
    if (newCharacterLevel < 2) return [];

    const abilityCardsAtOrBelowCurrentLevel = filterAbilityCardsAtOrBelowCurrentLevel(
        unlockedAbilityCards,
        newCharacterLevel
    );

    const abilityCardsWithOneUnlockAtCurrentLevel = filterAbilityCardsToHaveOnlyOneAtCurrentLevel(
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

const filterAbilityCardsToHaveOnlyOneAtCurrentLevel = (
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

    return unlockedAbilityCards.length <= maxUnlocks ? unlockedAbilityCards : unlockedAbilityCards.slice(0, maxUnlocks);
};

const updateCardsInHand = (hand: AbilityCard[], newCharacterLevel: number): AbilityCard[] => {
    return hand.filter((card: AbilityCard) => abilityCardLevelCanBeUnlockedByCharacter(card.level, newCharacterLevel));
};

export default ExperienceField;
export { updateUnlockedAbilityCards, updateCardsInHand };
