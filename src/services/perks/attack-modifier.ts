import partition from "lodash.partition";

const baseAttackModifierDeckOrder = ["2x", "+2", "+1", "+0", "-1", "-2", "Miss"];

const classAttackModifierCardNames = (characterClass: CharacterClass): string[] => {
    return Array.from(
        new Set(
            characterClass.perks
                .flatMap((perk: Perk) => perk.add)
                .map((attackModifierCard: AttackModifierCard) => attackModifierCard.name)
                .filter((name: string) => !baseAttackModifierDeckOrder.includes(name))
        )
    );
};

const splitAttackModifierDeckIntoBaseAndClass = (
    deck: AttackModifierDeckCard[],
    baseAttackModifierDeck: AttackModifierDeckCard[]
): [AttackModifierDeckCard[], AttackModifierDeckCard[]] => {
    return partition(deck, (card: AttackModifierDeckCard) =>
        baseAttackModifierDeck.some((baseCard: AttackModifierDeckCard) => card.card.id === baseCard.card.id)
    );
};

const orderAttackModifierCards = (
    deck: AttackModifierDeckCard[],
    orderedCardNames: string[]
): AttackModifierDeckCard[] => {
    return deck
        .slice()
        .sort(
            (a: AttackModifierDeckCard, b: AttackModifierDeckCard) =>
                orderedCardNames.indexOf(a.card.name) - orderedCardNames.indexOf(b.card.name)
        );
};

export {
    baseAttackModifierDeckOrder,
    classAttackModifierCardNames,
    splitAttackModifierDeckIntoBaseAndClass,
    orderAttackModifierCards,
};
