import { render, screen, within } from "@testing-library/react";
import AttackModifiersGrid, { applyPerksTo } from "@/components/perks/attack-modifiers-grid";
import { attackModifiers } from "@/loaders/attack-modifiers";
import { baseAttackModifierDeck } from "@/constants";

describe("attack modifiers", () => {
    it("renders the attack modifier cards", () => {
        const deck: AttackModifierDeckCard[] = [baseAttackModifierDeck[0]];

        render(<AttackModifiersGrid initialDeck={deck} gainedPerks={[]} orderedCardNames={[]} />);

        const attackModifierCard = screen.getByRole("img", { name: `${baseAttackModifierDeck[0].card.name} card` });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("1 x");

        expect(countResult).toBeInTheDocument();
    });

    it("renders attack modifier cards in the correct order", () => {
        const deck: AttackModifierDeckCard[] = [baseAttackModifierDeck[2], baseAttackModifierDeck[3]]; // +1

        render(<AttackModifiersGrid initialDeck={deck} gainedPerks={[]} orderedCardNames={["+0", "+1"]} />);

        const attackModifierCards = screen.getAllByRole("img");

        expect(attackModifierCards[0].getAttribute("alt")).toEqual("+0 card");
        expect(attackModifierCards[1].getAttribute("alt")).toEqual("+1 card");
    });

    it("renders the attack modifier cards accounting for gained perks", () => {
        const deck: AttackModifierDeckCard[] = [baseAttackModifierDeck[2]]; // +1

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                description: "",
                count: 1,
                add: [baseAttackModifierDeck[2].card],
                remove: [],
            },
        };

        render(<AttackModifiersGrid initialDeck={deck} gainedPerks={[gainedPerk]} orderedCardNames={["+1"]} />);

        const attackModifierDeckCard = screen
            .getByRole("img", { name: `+1 card` })
            .closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText(
            `${baseAttackModifierDeck[2].count + 1} x`
        );

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

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, [], ["+0"]);

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
                    description: "",
                    count: 1,
                    add: [],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+0"]);

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
                    description: "",
                    count: 1,
                    add: [attackModifiers[3]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+0"]);

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
                    description: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[3]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+0"]);

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
                    description: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+0", "+1"]);

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
                    description: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[2]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+1"]);

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
                    description: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    description: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[3]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+0", "+1"]);

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
                    description: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
            {
                checkboxIndex: 0,
                perk: {
                    description: "",
                    count: 1,
                    add: [attackModifiers[2]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+1"]);

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
                    description: "",
                    count: 1,
                    add: [],
                    remove: [attackModifiers[3]],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+1"]);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });

    it("ignores an attempt to add a card that doesn't exist", () => {
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
                    description: "",
                    count: 1,
                    add: [attackModifiers[3]],
                    remove: [],
                },
            },
        ];

        const attackModifierDeckWithPerks = applyPerksTo(attackModifierDeck, gainedPerks, ["+1"]);

        expect(attackModifierDeckWithPerks).toEqual(attackModifierDeck);
    });
});
