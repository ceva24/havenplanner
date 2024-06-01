import cloneDeep from "lodash.clonedeep";

const characterHasGainedPerk = (character: Character, perk: Perk, checkboxIndex: number): boolean => {
    return findCharacterGainedPerk(character, perk, checkboxIndex) !== undefined;
};

const findCharacterGainedPerk = (character: Character, perk: Perk, checkboxIndex: number): GainedPerk | undefined => {
    return character.gainedPerks.find(
        (gainedPerk: GainedPerk) => gainedPerk.perk.id === perk.id && gainedPerk.checkboxIndex === checkboxIndex,
    );
};

const applyPerksTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    gainedPerks: GainedPerk[],
): AttackModifierDeckCard[] => {
    const attackModifierDeckWithPerks = cloneDeep(attackModifierDeck);

    const sortedGainedPerks = gainedPerks.sort((a: GainedPerk, b: GainedPerk) => a.perk.id - b.perk.id);

    sortedGainedPerks.forEach((gainedPerk: GainedPerk) => {
        applyChangesOfPerkTo(attackModifierDeckWithPerks, gainedPerk.perk);
    });

    return attackModifierDeckWithPerks;
};

const applyChangesOfPerkTo = (attackModifierDeck: AttackModifierDeckCard[], perk: Perk) => {
    if (perk.remove.length > 0 && !attackModifierDeckMeetsRemovalPrerequisites(perk.remove, attackModifierDeck)) return;

    perk.add.forEach((attackModifierCard: AttackModifierCard) => {
        applyAttackModifierAdditionsTo(attackModifierDeck, attackModifierCard);
    });

    perk.remove.forEach((attackModifierCard: AttackModifierCard) => {
        applyAttackModifierRemovalsTo(attackModifierDeck, attackModifierCard);
    });
};

const attackModifierDeckMeetsRemovalPrerequisites = (
    remove: AttackModifierCard[],
    deck: AttackModifierDeckCard[],
): boolean => {
    return remove.every((card: AttackModifierCard) =>
        deck.some((deckCard: AttackModifierDeckCard) => deckCard.card.id === card.id),
    );
};

const applyAttackModifierAdditionsTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    cardToAdd: AttackModifierCard,
) => {
    const attackModifierDeckCardToAddTo = attackModifierDeck.find(
        (attackModifierDeckCard: AttackModifierDeckCard) => attackModifierDeckCard.card.id === cardToAdd.id,
    );

    if (attackModifierDeckCardToAddTo) {
        attackModifierDeckCardToAddTo.count++;
    } else {
        attackModifierDeck.push({
            card: cardToAdd,
            count: 1,
        });
    }
};

const applyAttackModifierRemovalsTo = (
    attackModifierDeck: AttackModifierDeckCard[],
    cardToRemove: AttackModifierCard,
) => {
    const attackModifierDeckCardToRemoveFrom = attackModifierDeck.find(
        (attackModifierDeckCard: AttackModifierDeckCard) => attackModifierDeckCard.card.id === cardToRemove.id,
    );

    if (!attackModifierDeckCardToRemoveFrom) return;

    if (attackModifierDeckCardToRemoveFrom.count > 1) {
        attackModifierDeckCardToRemoveFrom.count--;
    } else {
        const indexOfCardToRemove = attackModifierDeck.indexOf(attackModifierDeckCardToRemoveFrom);
        attackModifierDeck.splice(indexOfCardToRemove, 1);
    }
};

export { characterHasGainedPerk, findCharacterGainedPerk, applyPerksTo, applyAttackModifierRemovalsTo };
