import { render, screen } from "@testing-library/react";
import Enhancements from "@/components/ability-cards/enhancements/enhancements";
import { createTestCharacter } from "@/testutils";

describe("enhancements", () => {
    it("renders the deck", () => {
        const character = createTestCharacter();
        character.characterClass.abilityCards = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
            {
                id: 11,
                name: "Skewer",
                level: "X",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
            },
        ];

        render(<Enhancements character={character} />);

        const cardOne = screen.queryByRole("img", { name: "Trample" });
        const cardTwo = screen.queryByRole("img", { name: "Skewer" });

        expect(cardOne).toBeInTheDocument();
        expect(cardTwo).toBeInTheDocument();
    });
});
