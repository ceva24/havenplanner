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

const setCharacter = jest.fn();

describe("hand", () => {
    it("renders unselected cards equal to the character class hand size", () => {
        render(<Hand character={character} setCharacter={setCharacter} />);

        const unselectedCards = screen.queryAllByRole("button", { name: "Select card" });

        expect(unselectedCards).toHaveLength(10);
    });
});
