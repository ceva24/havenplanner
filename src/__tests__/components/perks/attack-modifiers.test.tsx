import { render, screen, within } from "@testing-library/react";
import AttackModifiers from "@/components/perks/attack-modifiers";

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
            render(<AttackModifiers />);

            const attackModifierDeckCard = screen
                .getByRole("img", { name: `${attackModifierName} card` })
                .closest("[id^=attack-modifier-card-details]");

            expect(attackModifierDeckCard).toBeDefined();

            const countResult = within(attackModifierDeckCard as HTMLElement).queryByText(`${count} x`);

            expect(countResult).toBeInTheDocument();
        }
    );
});
