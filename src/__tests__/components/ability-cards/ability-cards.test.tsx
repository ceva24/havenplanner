import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/ability-cards/ability-cards";
import { defaultCharacter } from "@/utils/constants";

const setCharacter = jest.fn();

describe("ability cards", () => {
    it("renders the show hand switch", () => {
        render(<AbilityCards character={defaultCharacter} setCharacter={setCharacter} />);

        const handSwitch = screen.queryByRole("checkbox", { name: "Show hand" });

        expect(handSwitch).toBeInTheDocument();
    });

    it("renders the deck by default", () => {
        render(<AbilityCards character={defaultCharacter} setCharacter={setCharacter} />);

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });
});
