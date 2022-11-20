import { render, screen, within } from "@testing-library/react";
import AttackModifiers, { applyPerksTo } from "@/components/perks/attack-modifiers";
import { attackModifiers } from "@/loaders/attack-modifiers";

describe("attack modifiers", () => {
    interface AttackModifierNameCountProps {
        attackModifierName: string;
        count: string;
    }

    it.each`
        attackModifierName | count
        ${"2x"}            | ${"1"}
        ${"+2"}            | ${"1"}
        ${"+1"}            | ${"5"}
        ${"+0"}            | ${"6"}
        ${"-1"}            | ${"5"}
        ${"-2"}            | ${"1"}
        ${"Miss"}          | ${"1"}
    `(
        "renders the base attack modifier deck with $count $attackModifier cards",
        ({ attackModifierName, count }: AttackModifierNameCountProps) => {
            render(<AttackModifiers gainedPerks={[]} />);

            const attackModifierDeckCard = screen
                .getByRole("img", { name: `${attackModifierName} card` })
                .closest("[id^=attack-modifier-card-details]");

            expect(attackModifierDeckCard).toBeDefined();

            const countResult = within(attackModifierDeckCard as HTMLElement).queryByText(`${count} x`);

            expect(countResult).toBeInTheDocument();
        }
    );

    it("renders the correct attack modifier count when account for perks", () => {
        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                description: "",
                count: 1,
                add: [
                    {
                        id: 319,
                        name: "+1",
                        imageUrl: "/images/attack-modifiers/gloomhaven/base/player/gh-am-p1-07.webp",
                    },
                ],
                remove: [],
            },
        };

        render(<AttackModifiers gainedPerks={[gainedPerk]} />);

        const attackModifierDeckCard = screen
            .getByRole("img", { name: "+1 card" })
            .closest("[id^=attack-modifier-card-details]");

        expect(attackModifierDeckCard).toBeDefined();

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("6 x");

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
                    description: "",
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
                    description: "",
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
                    description: "",
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
                    description: "",
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
                    description: "",
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
                    description: "",
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
