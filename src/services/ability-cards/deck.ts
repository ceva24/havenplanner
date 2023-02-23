import { calculateLevel } from "@/services/profile";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
} from "@/services/ability-cards/ability-card";

const isUnlockedAbilityCardForCharacter = (character: Character, abilityCard: AbilityCard): boolean => {
    return character.unlockedAbilityCards.some((card: AbilityCard) => card.id === abilityCard.id);
};

const abilityCardCanBeUnlockedForCharacter = (character: Character, abilityCard: AbilityCard): boolean => {
    const characterLevel = calculateLevel(character.experience);

    return (
        characterHasAbilityCardUnlocksRemaining(character, characterLevel) &&
        abilityCardLevelCanBeUnlockedByCharacter(abilityCard.level, characterLevel) &&
        !isTheSecondCardOfCurrentCharacterLevel(abilityCard, character, characterLevel)
    );
};

const characterHasAbilityCardUnlocksRemaining = (character: Character, characterLevel: number): boolean => {
    return calculateMaximumUnlockCount(characterLevel) - character.unlockedAbilityCards.length >= 1;
};

const isTheSecondCardOfCurrentCharacterLevel = (
    abilityCard: AbilityCard,
    character: Character,
    characterLevel: number
): boolean => {
    const unlocksAtCurrentLevel = new Set(
        abilityCardsUnlockedAtLevel(character.unlockedAbilityCards, abilityCard.level)
    );

    const hasAlreadyUnlockedOtherCardAtThisLevel =
        unlocksAtCurrentLevel.size > 0 && !unlocksAtCurrentLevel.has(abilityCard);

    return abilityCard.level === characterLevel.toString() && hasAlreadyUnlockedOtherCardAtThisLevel;
};

export { isUnlockedAbilityCardForCharacter, abilityCardCanBeUnlockedForCharacter };
