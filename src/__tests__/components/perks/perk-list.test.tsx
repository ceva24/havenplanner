import { render, screen } from "@testing-library/react";
import Perks from "@/components/perks/perks";
import { createTestCharacter } from "@/testutils";

describe("perk list", () => {
    it("renders a perk", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Remove two <-1> cards",
                count: 1,
            },
        ];

        render(<Perks character={character} />);

        const perk = screen.queryByRole("checkbox", { name: "Remove two <-1> cards" });

        expect(perk).toBeInTheDocument();
    });

    it("renders multiple perks", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Remove two <-1> cards",
                count: 1,
            },
            {
                description: "Replace one <-1> card with one <+1> card",
                count: 1,
            },
            {
                description: "Add one <+3> card",
                count: 1,
            },
            {
                description: "Add two <chain> PIERCE <pierce> 3 cards",
                count: 1,
            },
        ];

        render(<Perks character={character} />);

        const perkOne = screen.queryByRole("checkbox", { name: "Remove two <-1> cards" });
        const perkTwo = screen.queryByRole("checkbox", { name: "Replace one <-1> card with one <+1> card" });
        const perkThree = screen.queryByRole("checkbox", { name: "Add one <+3> card" });
        const perkFour = screen.queryByRole("checkbox", { name: "Add two <chain> PIERCE <pierce> 3 cards" });

        expect(perkOne).toBeInTheDocument();
        expect(perkTwo).toBeInTheDocument();
        expect(perkThree).toBeInTheDocument();
        expect(perkFour).toBeInTheDocument();
    });

    it("renders perks with multiple checkboxes", () => {
        const character = createTestCharacter();
        character.characterClass.perks = [
            {
                description: "Add two <+1> cards",
                count: 2,
            },
        ];

        render(<Perks character={character} />);

        const checkboxes = screen.queryAllByRole("checkbox");

        expect(checkboxes).toHaveLength(2);
    });
});
