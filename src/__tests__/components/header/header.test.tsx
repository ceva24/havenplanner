import { render, screen } from "@testing-library/react";
import Header from "@/components/header/header";
import { characterClasses } from "@/loaders/character-classes";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

describe("header", () => {
    it("renders the heading as a link", () => {
        render(<Header character={character} />);

        const headerLink = screen.queryByRole("link", {
            name: "Gloomhaven Character Planner",
        });

        expect(headerLink).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<Header character={character} />);

        const shareButton = screen.queryByRole("button", {
            name: "Share",
        });

        expect(shareButton).toBeInTheDocument();
    });

    it("renders the spoiler toggle", () => {
        render(<Header character={character} />);

        const spoilerToggle = screen.queryByRole("checkbox", {
            name: "Show spoilers",
        });

        expect(spoilerToggle).toBeInTheDocument();
    });
});
