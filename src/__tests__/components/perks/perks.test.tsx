import { render, screen } from "@testing-library/react";
import Perks from "@/components/perks/perks";
import { createTestCharacter } from "@/test/utils";

describe("perks", () => {
    it("renders the attack modifier deck", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const attackModifierCards = screen.queryByRole("region", { name: "Attack Modifier Deck" });

        expect(attackModifierCards).toBeInTheDocument();
    });

    it("renders the battle goal progress", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const battleGoalProgress = screen.queryByRole("region", { name: "Battle Goal Progress" });

        expect(battleGoalProgress).toBeInTheDocument();
    });

    it("renders the list of perks", () => {
        render(<Perks character={createTestCharacter()} setCharacter={jest.fn()} />);

        const perkList = screen.queryByRole("region", { name: "Perk List" });

        expect(perkList).toBeInTheDocument();
    });
});
