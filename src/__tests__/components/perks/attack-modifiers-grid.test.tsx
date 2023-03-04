import { render, screen, within } from "@testing-library/react";
import AttackModifiersGrid from "@/components/perks/attack-modifiers-grid";
import { createTestAttackModifierDeckCard } from "@/test/test-fixtures";

describe("attack modifiers", () => {
    it("renders the attack modifier cards", () => {
        const deck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+1")];

        render(<AttackModifiersGrid deck={deck} orderedCardNames={[]} />);

        const attackModifierCard = screen.getByRole("img", { name: "+1 card" });

        const attackModifierDeckCard = attackModifierCard.closest("[id^=attack-modifier-card-details]");

        const countResult = within(attackModifierDeckCard as HTMLElement).queryByText("1 x");

        expect(countResult).toBeInTheDocument();
    });

    it("renders attack modifier cards in the correct order", () => {
        const deck: AttackModifierDeckCard[] = [
            createTestAttackModifierDeckCard(1, "+1"),
            createTestAttackModifierDeckCard(1, "+0"),
        ];

        render(<AttackModifiersGrid deck={deck} orderedCardNames={["+0", "+1"]} />);

        const attackModifierCards = screen.getAllByRole("img");

        expect(attackModifierCards[0].getAttribute("alt")).toEqual("+0 card");
        expect(attackModifierCards[1].getAttribute("alt")).toEqual("+1 card");
    });
});
