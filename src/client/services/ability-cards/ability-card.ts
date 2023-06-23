import {
    abilityCardHasGainedEnhancements,
    createEnhancedAbilityCardImageUrl,
} from "@/client/services/ability-cards/enhancement";

const calculateMaximumUnlockCount = (characterLevel: number): number => {
    return characterLevel - 1;
};

const abilityCardLevelCanBeUnlockedByCharacter = (abilityCardLevel: string, characterLevel: number): boolean => {
    return abilityCardLevel === "X" || Number.parseInt(abilityCardLevel, 10) <= characterLevel;
};

const abilityCardsUnlockedAtLevel = (unlockedAbilityCards: AbilityCard[], abilityCardLevel: string): AbilityCard[] => {
    return unlockedAbilityCards.filter((card: AbilityCard) => card.level === abilityCardLevel);
};

const determineAbilityCardImageUrl = (abilityCard: AbilityCard, character: Character): string => {
    return process.env.NEXT_PUBLIC_FEATURE_FLAG_ENHANCED_CARD_IMAGES === "true" &&
        character.gainedEnhancements &&
        abilityCardHasGainedEnhancements(abilityCard, character)
        ? createEnhancedAbilityCardImageUrl(abilityCard, character)
        : abilityCard.imageUrl;
};

export {
    calculateMaximumUnlockCount,
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
    determineAbilityCardImageUrl,
};
