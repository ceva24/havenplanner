const calculateLevel = (character: Character): number => {
    const experience = character.experience;

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

const isUnlockedAbilityCardForCharacter = (character: Character, abilityCard: AbilityCard) => {
    return character.unlockedAbilityCards.includes(abilityCard);
};

const abilityCardCanBeUnlockedForCharacter = (abilityCard: AbilityCard, character: Character): boolean => {
    const characterLevel = calculateLevel(character);
    const numericCardLevel = Number.parseInt(abilityCard.level, 10);

    const characterHasUnlocksRemaining = characterLevel - character.unlockedAbilityCards.length - 1 >= 1;

    const cardLevelCanBeUnlocked = numericCardLevel <= characterLevel;

    const isTheSecondCardOfCurrentCharacterLevel =
        numericCardLevel === characterLevel &&
        character.unlockedAbilityCards.some((card: AbilityCard) => {
            return card.level === abilityCard.level && card.id !== abilityCard.id;
        });

    return characterHasUnlocksRemaining && cardLevelCanBeUnlocked && !isTheSecondCardOfCurrentCharacterLevel;
};

export { calculateLevel, isUnlockedAbilityCardForCharacter, abilityCardCanBeUnlockedForCharacter };
