import { render, screen } from "@testing-library/react";
import SelectCardDialog from "@/components/ability-cards/select-card-dialog";

const character: Character = {
    name: "My Char",
    experience: 25,
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
        abilityCards: [
            {
                id: 1,
                name: "Trample",
                level: "1",
                imageUrl: "/images/character-ability-cards/gloomhaven/BR/gh-trample.webp",
            },
        ],
    },
    items: [],
    unlockedAbilityCards: [],
};

describe("select card dialog", () => {
    it("renders", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const selectCardDialog = screen.queryByRole("dialog", { name: "Select ability card" });

        expect(selectCardDialog).toBeInTheDocument();
    });

    it("renders available ability cards", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const abilityCard = screen.queryByRole("button", { name: "Trample" });

        expect(abilityCard).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(<SelectCardDialog isOpen character={character} handleClose={() => ""} />);

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });
});
