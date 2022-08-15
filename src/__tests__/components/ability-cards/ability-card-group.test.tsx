import { render, screen } from "@testing-library/react";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

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
        abilityCards: [],
    },
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

describe("AbilityCardGroup", () => {
    it("renders", () => {
        const cards: AbilityCard[] = [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
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
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
            {
                id: 2,
                name: "Eye for an Eye",
                level: "1",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-eye-for-an-eye.webp",
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
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/worldhaven/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
        ];

        render(
            <AbilityCardGroup isSelectable level="1" cards={cards} character={character} setCharacter={setCharacter} />
        );

        const selectableAbilityCard = screen.queryByRole("button", { name: "Trample" });

        expect(selectableAbilityCard).toBeInTheDocument();
    });
});
