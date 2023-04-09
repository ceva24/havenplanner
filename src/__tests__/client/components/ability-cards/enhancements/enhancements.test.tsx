import { render, screen } from "@testing-library/react";
import Enhancements from "@/client/components/ability-cards/enhancements/enhancements";
import { createTestCharacter } from "@/test/create-test-fixtures";

const setCharacter = jest.fn();

describe("enhancements", () => {
    it("renders the enhancements", () => {
        const character: Character = createTestCharacter();
        character.characterClass.abilityCards = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                enhancementSlots: [],
            },
            {
                id: 11,
                name: "Skewer",
                level: "X",
                imageUrl: "/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                enhancementSlots: [],
            },
        ];

        render(<Enhancements character={character} setCharacter={setCharacter} />);

        const trampleEnhancenments = screen.queryByRole("region", { name: "Trample Enhancements" });
        const skewerEnhancements = screen.queryByRole("region", { name: "Skewer Enhancements" });

        expect(trampleEnhancenments).toBeInTheDocument();
        expect(skewerEnhancements).toBeInTheDocument();
    });
});
