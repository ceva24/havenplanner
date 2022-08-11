import { render, screen } from "@testing-library/react";
import AbilityCardGroup from "@/components/ability-cards/ability-card-group";

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

        render(<AbilityCardGroup level="1" cards={cards} />);

        const abilityCardGroup = screen.queryByRole("region", { name: "Level 1 Ability Cards" });

        expect(abilityCardGroup).toBeInTheDocument();
    });

    it("renders the level heading", () => {
        render(<AbilityCardGroup level="1" cards={[]} />);

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

        render(<AbilityCardGroup level="1" cards={cards} />);

        const firstCard = screen.queryByRole("img", { name: "Trample" });
        const secondCard = screen.queryByRole("img", { name: "Eye for an Eye" });

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
    });
});
