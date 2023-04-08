import { applyPerksTo, characterHasGainedPerk, findCharacterGainedPerk } from "@/client/services/perks/perk";
import { createTestAttackModifierDeckCard, createTestCharacter } from "@/test/create-test-fixtures";

const plusOne: AttackModifierCard = createTestAttackModifierDeckCard(1, "+1").card;
const plusZero: AttackModifierCard = createTestAttackModifierDeckCard(2, "+0").card;

describe("characterHasGainedPerk", () => {
    it("returns true when the character has gained the perk", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = characterHasGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(true);
    });

    it("returns false when the character has not gained the perk", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        const result = characterHasGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(false);
    });

    it("returns false when the perk exists but the checkbox number is different", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = characterHasGainedPerk(character, gainedPerk.perk, 1);

        expect(result).toEqual(false);
    });
});

describe("findCharacterGainedPerk", () => {
    it("returns the gained perk that matches the perk and checkbox number", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(gainedPerk);
    });

    it("returns undefined when the perk does not exist", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toBeUndefined();
    });

    it("returns undefined when the perk exists but the checkbox number is different", () => {
        const character: Character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 1);

        expect(result).toBeUndefined();
    });
});

describe("applyPerksTo", () => {
    it("applies empty gained perks", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+0")];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, []);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });

    it("applies a gained perk that does not affect the attack modifier deck", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+0")];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });

    it("applies a perk that adds another copy of an existing card", () => {
        const deckCard: AttackModifierDeckCard = createTestAttackModifierDeckCard(1, "+0", 6);

        const attackModifierDeck: AttackModifierDeckCard[] = [deckCard];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [deckCard.card],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(7);
    });

    it("applies a perk that removes a copy of an existing card", () => {
        const deckCard: AttackModifierDeckCard = createTestAttackModifierDeckCard(1, "+0", 6);

        const attackModifierDeck: AttackModifierDeckCard[] = [deckCard];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [deckCard.card],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(5);
    });

    it("applies a perk that adds a new card", () => {
        const deckCard: AttackModifierDeckCard = createTestAttackModifierDeckCard(1, "+0", 6);

        const attackModifierDeck: AttackModifierDeckCard[] = [deckCard];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [createTestAttackModifierDeckCard(2, "+1").card],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(2);
        expect(attackModifierDeckWithPerks[1].card).toEqual(gainedPerks[0].perk.add[0]);
        expect(attackModifierDeckWithPerks[1].count).toEqual(1);
    });

    it("applies a perk that removes the last copy of an existing card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1")];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [attackModifierDeck[0].card],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(0);
    });

    it("applies a perk that both adds and removes cards", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            createTestAttackModifierDeckCard(1, "+1", 5),
            createTestAttackModifierDeckCard(2, "+0", 6),
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifierDeck[0].card],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [attackModifierDeck[1].card],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(6);
        expect(attackModifierDeckWithPerks[1].count).toEqual(5);
    });

    it("applies multiple perks that affect the same card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1", 5)];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifierDeck[0].card],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifierDeck[0].card],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(7);
    });

    it("ignores an attempt to remove a card that doesn't exist", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1", 5)];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [createTestAttackModifierDeckCard(2, "+2").card],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });

    it("does not apply perks if the deck does not contain the card to remove when a single card is being replaced", () => {
        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [plusOne],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 1,
                    add: [plusZero],
                    remove: [plusOne],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(plusZero);
    });

    it("applies a perk if the perk that adds the card to be removed is gained afterwards", () => {
        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 1,
                    add: [plusOne],
                    remove: [plusZero],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [plusZero],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(plusOne);
    });

    it("only applies one instance of a perk if both checkboxes have been gained but the prerequisite has only been gained once", () => {
        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 1,
                perk: {
                    id: 1,
                    name: "",
                    count: 2,
                    add: [plusOne],
                    remove: [plusZero],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 2,
                    add: [plusOne],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 2,
                    add: [plusOne],
                    remove: [plusZero],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(plusOne);
    });
});
