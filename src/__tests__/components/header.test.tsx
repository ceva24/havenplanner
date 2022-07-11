import { render, screen } from "@testing-library/react";
import Header from "@/components/header";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
};

describe("Header", () => {
    it("renders the heading", () => {
        render(<Header character={character} />);

        const heading = screen.queryByRole("heading", {
            name: "Gloomhaven Character Planner",
        });

        expect(heading).toBeInTheDocument();
    });

    it("renders the share button", () => {
        render(<Header character={character} />);

        const shareButton = screen.queryByRole("button", {
            name: "Share",
        });

        expect(shareButton).toBeInTheDocument();
    });
});
