import { attackModifiers } from "@/loaders/attack-modifiers";
import { applyPerksTo, characterHasGainedPerk, findCharacterGainedPerk } from "@/services/perks/perk";
import { createTestCharacter } from "@/test/utils";

describe("characterHasGainedPerk", () => {
    it("returns true when the character has gained the perk", () => {
        const character = createTestCharacter();

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
        const character = createTestCharacter();

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
        const character = createTestCharacter();

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
        const character = createTestCharacter();

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
        const character = createTestCharacter();

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
        const character = createTestCharacter();

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
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, []);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });

    it("applies a gained perk that does not affect the attack modifier deck", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

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
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[3]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(7);
    });

    it("applies a perk that removes a copy of an existing card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[3]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(5);
    });

    it("applies a perk that adds a new card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(2);
        expect(attackModifierDeckWithPerks[1].card).toEqual(attackModifiers[2]);
        expect(attackModifierDeckWithPerks[1].count).toEqual(1);
    });

    it("applies a perk that removes the last copy of an existing card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 1,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[2]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(0);
    });

    it("applies a perk that both adds and removes cards", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
            {
                card: attackModifiers[3], // +0
                count: 6,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]],
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
                    remove: [attackModifiers[3]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(6);
        expect(attackModifierDeckWithPerks[1].count).toEqual(5);
    });

    it("applies multiple perks that affect the same card", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks);

        expect(attackModifierDeckWithPerks[0].count).toEqual(7);
    });

    it("ignores an attempt to remove a card that doesn't exist", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
        ];

        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[3]],
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
                    add: [attackModifiers[3]], // +0
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]], // +1
                    remove: [attackModifiers[3]], // +0
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(attackModifiers[2]);
    });

    it("applies a perk if the perk that adds the card to be removed is gained afterwards", () => {
        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 1,
                    add: [attackModifiers[2]], // +1
                    remove: [attackModifiers[3]], // +0
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 1,
                    add: [attackModifiers[3]], // +0
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(attackModifiers[2]);
    });

    it("only applies one instance of a perk if both checkboxes have been gained but the prerequisite has only been gained once", () => {
        const gainedPerks: GainedPerk[] = [
            {
                checkboxIndex: 1,
                perk: {
                    id: 1,
                    name: "",
                    count: 2,
                    add: [attackModifiers[2]], // +1
                    remove: [attackModifiers[3]], // +0
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 0,
                    name: "",
                    count: 2,
                    add: [attackModifiers[3]], // +0
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    id: 1,
                    name: "",
                    count: 2,
                    add: [attackModifiers[2]], // +1
                    remove: [attackModifiers[3]], // +0
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo([], gainedPerks);

        expect(attackModifierDeckWithPerks).toHaveLength(1);
        expect(attackModifierDeckWithPerks[0].card).toEqual(attackModifiers[2]);
    });
});
