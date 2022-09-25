import { render, screen } from "@testing-library/react";
import { createTestCharacter } from "@/testutils";
import SelectedAbilityCard from "@/components/ability-cards/hand/selected-ability-card";

const character: Character = createTestCharacter();

describe("selected ability card", () => {
    it("renders", () => {
        render(<SelectedAbilityCard abilityCard={character.characterClass.abilityCards[0]} />);

        const card = screen.queryByRole("img", { name: character.characterClass.abilityCards[0].name });

        expect(card).toBeInTheDocument();
    });
});
