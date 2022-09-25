import { render, screen } from "@testing-library/react";
import Hand from "@/components/ability-cards/hand/hand";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("hand", () => {
    it("renders the edit hand button", () => {
        render(<Hand character={character} setCharacter={setCharacter} openSelectCardDialog={() => ""} />);

        const editHandButton = screen.queryByRole("button", { name: "Edit hand" });

        expect(editHandButton).toBeInTheDocument();
    });
});
