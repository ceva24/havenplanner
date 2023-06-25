import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";
import { calculateLevel } from "@/client/services/profile";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
} from "@/client/services/ability-cards/ability-card";

const abilityCardGroupOrder = ["1", "M", "X", "2", "3", "4", "5", "6", "7", "8", "9"];

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

const abilityCardCanBeToggled = (abilityCard: AbilityCard, character: Character): boolean => {
    return (
        isUnlockedAbilityCardForCharacter(character, abilityCard) ||
        abilityCardCanBeUnlockedForCharacter(character, abilityCard)
    );
};

const groupCharacterCardsByLevel = (character: Character): Dictionary<AbilityCard[]> => {
    return groupBy(character.characterClass.abilityCards, (abilityCard: AbilityCard) => abilityCard.level);
};

const uniqueOrderedCardLevels = (cardsByLevel: Dictionary<AbilityCard[]>) => {
    const uniqueLevels = Object.keys(cardsByLevel);

    return uniqueLevels
        .slice()
        .sort((a: string, b: string) => abilityCardGroupOrder.indexOf(a) - abilityCardGroupOrder.indexOf(b));
};

const abilityCardLevelIsSelectable = (level: string): boolean => {
    return ["2", "3", "4", "5", "6", "7", "8", "9"].includes(level);
};

export {
    isUnlockedAbilityCardForCharacter,
    abilityCardCanBeUnlockedForCharacter,
    abilityCardCanBeToggled,
    groupCharacterCardsByLevel,
    uniqueOrderedCardLevels,
    abilityCardLevelIsSelectable,
};
