import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";
import { calculateLevel } from "@/client/services/profile";
import {
    abilityCardLevelCanBeUnlockedByCharacter,
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
        currentOrHigherLevelUnlockExists(abilityCard, character, characterLevel)
    );
};

const characterHasAbilityCardUnlocksRemaining = (character: Character, characterLevel: number): boolean => {
    return calculateMaximumUnlockCount(characterLevel) - character.unlockedAbilityCards.length >= 1;
};

const currentOrHigherLevelUnlockExists = (
    abilityCard: AbilityCard,
    character: Character,
    characterLevel: number
): boolean => {
    const levelUnlocksUsed: number[] = characterLevelsWhereAbilityCardUnlockHasBeenUsed(character);

    const abilityCardLevel = Number.parseInt(abilityCard.level, 10);

    const levelsFromCurrentCardLevelToCharacterLevel = Array.from<unknown, number>(
        { length: characterLevel - abilityCardLevel + 1 },
        (array: unknown, value: number) => value + abilityCardLevel
    );

    return levelsFromCurrentCardLevelToCharacterLevel.some((level: number) => !levelUnlocksUsed.includes(level));
};

const characterLevelsWhereAbilityCardUnlockHasBeenUsed = (character: Character): number[] => {
    const sortedCards: AbilityCard[] = character.unlockedAbilityCards
        .slice()
        .sort((a: AbilityCard, b: AbilityCard) => (a.level < b.level ? -1 : 1));

    const levelsWhereUnlockUsed: number[] = [];

    for (const card of sortedCards) {
        const cardLevel: number = Number.parseInt(card.level, 10);

        const levelUnlockUsedOnThisCard: number = levelsWhereUnlockUsed.includes(cardLevel) ? cardLevel + 1 : cardLevel;

        levelsWhereUnlockUsed.push(levelUnlockUsedOnThisCard);
    }

    return levelsWhereUnlockUsed;
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
