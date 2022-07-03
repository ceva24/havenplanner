import { render, screen } from "@testing-library/react";
import Profile from "@/components/profile";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
};

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />);

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character mat", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat",
        });

        expect(characterMat).toBeInTheDocument();
    });

    it("renders the personal quest", () => {
        render(<Profile character={character} setCharacter={jest.fn()} />);

        const personalQuest = screen.queryByRole("button", {
            name: "Personal quest",
        });

        expect(personalQuest).toBeInTheDocument();
    });
});
