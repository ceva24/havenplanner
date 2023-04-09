import { render, screen } from "@testing-library/react";
import AbilityCard from "@/client/components/ability-cards/ability-card";
import { createTestCharacter } from "@/test/create-test-fixtures";

describe("ability card", () => {
    it("renders", () => {
        const character: Character = createTestCharacter();

        render(<AbilityCard abilityCard={character.characterClass.abilityCards[0]} character={character} />);

        const card = screen.queryByRole("img", { name: "Trample" });

        expect(card).toBeInTheDocument();
    });
});
