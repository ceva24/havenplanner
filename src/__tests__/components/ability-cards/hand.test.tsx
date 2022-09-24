import { render, screen } from "@testing-library/react";
import Hand from "@/components/ability-cards/hand";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

describe("hand", () => {
    it("renders the add card button", () => {
        render(<Hand character={character} />);

        const addCardButton = screen.queryByRole("button", { name: "Add card" });

        expect(addCardButton).toBeInTheDocument();
    });
});
