import { render, screen } from "@testing-library/react";
import Perks from "@/components/perks/perks";
import { createTestCharacter } from "@/testutils";

describe("perks", () => {
    it("renders the attack modifier deck", () => {
        render(<Perks character={createTestCharacter()} />);

        const attackModifierCards = screen.queryByRole("region", { name: "Attack Modifier Deck" });

        expect(attackModifierCards).toBeInTheDocument();
    });

    it("renders the list of perks", () => {
        render(<Perks character={createTestCharacter()} />);

        const perkList = screen.queryByRole("region", { name: "Perk List" });

        expect(perkList).toBeInTheDocument();
    });
});
