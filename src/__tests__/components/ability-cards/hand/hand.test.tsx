import { render, screen } from "@testing-library/react";
import Hand from "@/components/ability-cards/hand/hand";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("hand", () => {
    it("renders the add card button", () => {
        render(<Hand character={character} setCharacter={setCharacter} />);

        const addCardButton = screen.queryByRole("button", { name: "Add card" });

        expect(addCardButton).toBeInTheDocument();
    });
});
