import { render, screen } from "@testing-library/react";
import AbilityCards from "@/components/tabs/ability-cards";

describe("AbilityCards", () => {
    it("renders cards of a level", () => {
        const character: Character = {
            name: "My Char",
            experience: 25,
            gold: 50,
            notes: "Hello haven",
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/worldhaven/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute-back.webp",
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level: "1",
                        imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                    },
                ],
            },
            items: [],
        };

        render(<AbilityCards character={character} />);

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
    });

    it("renders cards of multiple levels", () => {
        const character: Character = {
            name: "My Char",
            experience: 25,
            gold: 50,
            notes: "Hello haven",
            characterClass: {
                id: 0,
                name: "Brute",
                imageUrl: "/worldhaven/images/character-icons/gloomhaven/gh-brute.webp",
                characterMatFrontImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.webp",
                characterMatBackImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute-back.webp",
                abilityCards: [
                    {
                        id: 1,
                        name: "Trample",
                        level: "1",
                        imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
                    },
                    {
                        id: 11,
                        name: "Skewer",
                        level: "X",
                        imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-skewer.webp",
                    },
                ],
            },
            items: [],
        };

        render(<AbilityCards character={character} />);

        const level1Cards = screen.queryByRole("region", { name: "Level 1 Ability Cards" });
        const levelxCards = screen.queryByRole("region", { name: "Level X Ability Cards" });

        expect(level1Cards).toBeInTheDocument();
        expect(levelxCards).toBeInTheDocument();
    });
});
