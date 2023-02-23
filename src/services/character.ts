import { calculateLevel } from "@/services/profile";

const getAllAvailableAbilityCardsForCharacter = (character: Character) => {
    return character.characterClass.abilityCards
        .filter((abilityCard: AbilityCard) => {
            return abilityCard.level === "1" || abilityCard.level === "X";
        })
        .concat(character.unlockedAbilityCards)
        .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id);
};

const isUnlockedAbilityCardForCharacter = (character: Character, abilityCard: AbilityCard): boolean => {
    return character.unlockedAbilityCards.some((card: AbilityCard) => card.id === abilityCard.id);
};

const isCardInHandForCharacter = (character: Character, abilityCard: AbilityCard): boolean => {
    return character.hand.some((card: AbilityCard) => card.id === abilityCard.id);
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

const calculateMaximumUnlockCount = (characterLevel: number): number => {
    return characterLevel - 1;
};

const abilityCardLevelCanBeUnlockedByCharacter = (abilityCardLevel: string, characterLevel: number): boolean => {
    return abilityCardLevel === "X" || Number.parseInt(abilityCardLevel, 10) <= characterLevel;
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

const abilityCardsUnlockedAtLevel = (unlockedAbilityCards: AbilityCard[], abilityCardLevel: string) => {
    return unlockedAbilityCards.filter((card: AbilityCard) => card.level === abilityCardLevel);
};

export {
    getAllAvailableAbilityCardsForCharacter,
    isUnlockedAbilityCardForCharacter,
    isCardInHandForCharacter,
    abilityCardCanBeUnlockedForCharacter,
    calculateMaximumUnlockCount,
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
};
