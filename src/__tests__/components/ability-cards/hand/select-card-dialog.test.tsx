import { render, screen } from "@testing-library/react";
import SelectCardDialog from "@/components/ability-cards/hand/select-card-dialog";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

describe("select card dialog", () => {
    it("renders", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const selectCardDialog = screen.queryByRole("dialog", { name: "Select ability cards" });

        expect(selectCardDialog).toBeInTheDocument();
    });

    it("renders the card total", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const cardTotal = screen.queryByText("0 / 10");

        expect(cardTotal).toBeInTheDocument();
    });

    it("renders available ability cards", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const abilityCard = screen.queryByRole("checkbox", { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(<SelectCardDialog isOpen character={character} setCharacter={setCharacter} handleClose={() => ""} />);

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });
});
