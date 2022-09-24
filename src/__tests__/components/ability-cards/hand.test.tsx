import { render, screen } from "@testing-library/react";
import Hand from "@/components/ability-cards/hand";

const character: Character = {
    name: "My Char",
    experience: 100,
    gold: 50,
    notes: "Hello haven",
    characterClass: {
        id: 0,
        name: "Brute",
        imageUrl: "/images/character-icons/gloomhaven/gh-brute.webp",
        characterMatFrontImageUrl: "/images/character-mats/gloomhaven/gh-brute.webp",
        characterMatBackImageUrl: "/images/character-mats/gloomhaven/gh-brute-back.webp",
        cardBackImageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-br-back.webp",
        handSize: 10,
        abilityCards: [],
    },
    items: [],
    unlockedAbilityCards: [],
};

describe("hand", () => {
    it("renders the add card button", () => {
        render(<Hand character={character} />);

        const addCardButton = screen.queryByRole("button", { name: "Add card" });

        expect(addCardButton).toBeInTheDocument();
    });
});
