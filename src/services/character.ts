const calculateLevel = (experience: number): number => {
    switch (true) {
        case experience < 45: {
            return 1;
        }

        case experience < 95: {
            return 2;
        }

        case experience < 150: {
            return 3;
        }

        case experience < 210: {
            return 4;
        }

        case experience < 275: {
            return 5;
        }

        case experience < 345: {
            return 6;
        }

        case experience < 420: {
            return 7;
        }

        case experience < 500: {
            return 8;
        }

        case experience >= 500: {
            return 9;
        }

        default: {
            return 1;
        }
    }
};

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
    calculateLevel,
    getAllAvailableAbilityCardsForCharacter,
    isUnlockedAbilityCardForCharacter,
    isCardInHandForCharacter,
    abilityCardCanBeUnlockedForCharacter,
    calculateMaximumUnlockCount,
    abilityCardLevelCanBeUnlockedByCharacter,
    abilityCardsUnlockedAtLevel,
};
