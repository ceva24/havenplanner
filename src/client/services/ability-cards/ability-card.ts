const calculateMaximumUnlockCount = (characterLevel: number): number => {
    return characterLevel - 1;
};

const abilityCardLevelCanBeUnlockedByCharacter = (abilityCardLevel: string, characterLevel: number): boolean => {
    return abilityCardLevel === "X" || Number.parseInt(abilityCardLevel, 10) <= characterLevel;
};

const abilityCardsUnlockedAtLevel = (unlockedAbilityCards: AbilityCard[], abilityCardLevel: string): AbilityCard[] => {
    return unlockedAbilityCards.filter((card: AbilityCard) => card.level === abilityCardLevel);
};

export { calculateMaximumUnlockCount, abilityCardLevelCanBeUnlockedByCharacter, abilityCardsUnlockedAtLevel };
