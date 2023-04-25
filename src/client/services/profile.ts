import {
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    calculateMaximumUnlockCount,
} from "@/client/services/ability-cards/ability-card";

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

const getExperienceForLevel = (level: number): number => {
    switch (level) {
        case 1:
            return 0;
        case 2:
            return 45;
        case 3:
            return 95;
        case 4:
            return 150;
        case 5:
            return 210;
        case 6:
            return 275;
        case 7:
            return 345;
        case 8:
            return 420;
        case 9:
            return 500;
        default:
            return 0;
    }
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

const updateHand = (hand: AbilityCard[], newCharacterLevel: number): AbilityCard[] => {
    return hand.filter((card: AbilityCard) => abilityCardLevelCanBeUnlockedByCharacter(card.level, newCharacterLevel));
};

export { calculateLevel, getExperienceForLevel, updateUnlockedAbilityCards, updateHand };
