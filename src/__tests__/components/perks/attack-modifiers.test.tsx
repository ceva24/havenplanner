import { render, screen, within } from "@testing-library/react";
import AttackModifiers, {
    applyPerksTo,
    splitAttackModifierDeckIntoBaseAndClass,
} from "@/components/perks/attack-modifiers";
import { createTestCharacter } from "@/testutils";
import { attackModifiers } from "@/loaders/attack-modifiers";
import { defaultCharacter } from "@/constants";

describe("attack modifiers", () => {
    it("renders the base attack modifiers", () => {
        render(<AttackModifiers character={createTestCharacter()} />);

        const attackModifierCard = screen.getByRole("img", { name: "+1 card" });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("5 x");

        expect(countResult).toBeInTheDocument();
    });

    it("renders the class attack modifiers", () => {
        const perk: Perk = {
            id: 0,
            name: "Add one {+1} Shield {shield} 1, self card",
            count: 1,
            add: [
                {
                    id: 22,
                    name: "+1 shield 1 self",
                    imageUrl: "/attack-modifiers/gloomhaven/BR/gh-am-br-22.webp",
                },
            ],
            remove: [],
        };

        const character = createTestCharacter();
        character.characterClass.perks = [perk];
        character.gainedPerks = [{ checkboxIndex: 0, perk }];

        render(<AttackModifiers character={character} />);

        const attackModifierCard = screen.getByRole("img", { name: "+1 shield 1 self card" });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("1 x");

        expect(countResult).toBeInTheDocument();
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
});

describe("splitAttackModifierDeckIntoBaseAndClass", () => {
    it("returns cards from the base modifier deck", () => {
        const deck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
        ];

        const [initialAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck);

        expect(initialAttackModifiers).toHaveLength(1);
        expect(initialAttackModifiers[0]).toEqual(deck[0]);
    });

    it("returns cards from the class modifier deck", () => {
        const deck: AttackModifierDeckCard[] = [
            {
                card: defaultCharacter.characterClass.perks[3].add[0], // +3
                count: 1,
            },
        ];

        const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck);

        expect(classAttackModifiers).toHaveLength(1);
        expect(classAttackModifiers[0]).toEqual(deck[0]);
    });

    it("splits the deck into base attack modifiers and class attack modifiers", () => {
        const deck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
            {
                card: defaultCharacter.characterClass.perks[3].add[0], // +3
                count: 1,
            },
        ];

        const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck);

        expect(initialAttackModifiers).toHaveLength(1);
        expect(initialAttackModifiers[0]).toEqual(deck[0]);

        expect(classAttackModifiers).toHaveLength(1);
        expect(classAttackModifiers[0]).toEqual(deck[1]);
    });

    it("returns an empty list when there are no class modifiers", () => {
        const deck: AttackModifierDeckCard[] = [
            {
                card: attackModifiers[2], // +1
                count: 5,
            },
        ];

        const [initialAttackModifiers, classAttackModifiers] = splitAttackModifierDeckIntoBaseAndClass(deck);

        expect(classAttackModifiers).toHaveLength(0);
    });
});
