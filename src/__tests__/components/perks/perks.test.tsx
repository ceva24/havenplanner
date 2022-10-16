import { render, screen } from "@testing-library/react";
import Perks from "@/components/perks/perks";

describe("perks", () => {
    it("renders the attack modifier deck", () => {
        render(<Perks />);

        const attackModifierCards = screen.queryByRole("region", { name: "Attack Modifier Deck" });

        expect(attackModifierCards).toBeInTheDocument();
    });
});
