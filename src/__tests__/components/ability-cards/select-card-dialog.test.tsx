import { render, screen } from "@testing-library/react";
import SelectCardDialog from "@/components/ability-cards/select-card-dialog";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter();

describe("select card dialog", () => {
    it("renders", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const selectCardDialog = screen.queryByRole("dialog", { name: "Select ability card" });

        expect(selectCardDialog).toBeInTheDocument();
    });

    it("renders available ability cards", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const abilityCard = screen.queryByRole("button", { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });
});
