const getAllAvailableAbilityCardsForCharacter = (character: Character) => {
    return character.characterClass.abilityCards
        .filter((abilityCard: AbilityCard) => {
            return abilityCard.level === "1" || abilityCard.level === "X";
        })
        .concat(character.unlockedAbilityCards)
        .sort((a: AbilityCard, b: AbilityCard) => a.id - b.id);
};

const isCardInHandForCharacter = (character: Character, abilityCard: AbilityCard): boolean => {
    return character.hand.some((card: AbilityCard) => card.id === abilityCard.id);
};

export { getAllAvailableAbilityCardsForCharacter, isCardInHandForCharacter };
