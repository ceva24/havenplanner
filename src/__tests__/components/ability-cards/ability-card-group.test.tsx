import { render, screen } from "@testing-library/react";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

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
        abilityCards: [],
    },
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

describe("ability card group", () => {
    it("renders", () => {
        const cards: AbilityCard[] = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
        ];

        render(
            <AbilityCardGroup
                level="1"
                cards={cards}
                character={character}
                setCharacter={setCharacter}
                isSelectable={false}
            />
        );

        const abilityCardGroup = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(abilityCardGroup).toBeInTheDocument();
    });

    it("renders the level heading", () => {
        render(
            <AbilityCardGroup
                level="1"
                cards={[]}
                character={character}
                setCharacter={setCharacter}
                isSelectable={false}
            />
        );

        const level1Cards = screen.queryByRole("heading", { name: "Level 1" });

        expect(level1Cards).toBeInTheDocument();
    });

    it("renders cards", () => {
        const cards: AbilityCard[] = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
            {
                id: 2,
                name: "Eye for an Eye",
                level: "1",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-eye-for-an-eye.webp",
            },
        ];

        render(
            <AbilityCardGroup
                level="1"
                cards={cards}
                character={character}
                setCharacter={setCharacter}
                isSelectable={false}
            />
        );

        const firstCard = screen.queryByRole("img", { name: "Trample" });
        const secondCard = screen.queryByRole("img", { name: "Eye for an Eye" });

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
    });

    it("renders selectable cards for a selectable group", () => {
        const cards: AbilityCard[] = [
            {
                id: 14,
                name: "Fatal Advance",
                level: "2",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-fatal-advance.webp",
            },
        ];

        render(
            <AbilityCardGroup isSelectable level="2" cards={cards} character={character} setCharacter={setCharacter} />
        );

        const selectableAbilityCard = screen.queryByRole("checkbox", { name: "Fatal Advance" });

        expect(selectableAbilityCard).toBeInTheDocument();
    });
});
