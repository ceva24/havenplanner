import { render, screen } from "@testing-library/react";
import Hand from "@/components/ability-cards/hand/hand";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

describe("hand", () => {
    it("renders the edit hand button", () => {
        render(<Hand character={character} openEditHandDialog={jest.fn()} />);

        const editHandButton = screen.queryByRole("button", { name: "Edit hand" });

        expect(editHandButton).toBeInTheDocument();
    });

    it("renders unselected cards equal to the character class hand size", () => {
        render(<Hand character={character} openEditHandDialog={jest.fn()} />);

        const unselectedCards = screen.queryAllByRole("img", { name: "Unselected card" });

        expect(unselectedCards).toHaveLength(10);
    });
});
