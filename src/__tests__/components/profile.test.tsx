import { render, screen } from "@testing-library/react";
import Profile from "@/components/profile";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: {
        id: 0,
        name: "Test 1",
        characterIconImageUrl: "/character-icons/gloomhaven/gh-brute.png",
        characterMatImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
};

const characterClasses: CharacterClass[] = [
    {
        id: 0,
        name: "Test 1",
        characterIconImageUrl: "/character-icons/gloomhaven/gh-brute.png",
        characterMatImageUrl: "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
];

describe("profile tab", () => {
    it("renders the character details form", () => {
        render(<Profile character={character} setCharacter={jest.fn()} characterClasses={characterClasses} />);

        const characterDetailsForm = screen.queryByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character mat", () => {
        render(<Profile character={character} setCharacter={jest.fn()} characterClasses={characterClasses} />);

        const characterMat = screen.queryByRole("img", {
            name: "Character mat",
        });

        expect(characterMat).toBeInTheDocument();
    });
});
