import { render, screen, within } from "@testing-library/react";
import CharacterDetails from "@/components/profile/character-details";
import { characterClasses } from "@/loaders/class";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

const poorInexperiencedCharacter: Character = {
    name: "My Char",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

describe("character details", () => {
    it("renders the form", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character name", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const nameField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Name",
        });

        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveValue("My Char");
    });

    it("renders the class select", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const classIcon = within(characterDetailsForm).queryByRole("button", {
            name: "Class",
        });

        expect(classIcon).toBeInTheDocument();
    });

    it("renders the character experience", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const experienceField = within(characterDetailsForm).queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });

    it("renders the character level", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const levelField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Level",
        });

        expect(levelField).toBeInTheDocument();
        expect(levelField).toHaveValue("1");
    });

    it("displays no experience value when experience is zero", () => {
        render(<CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />);

        const experience = screen.queryByRole("textbox", {
            name: "Experience",
        });

        expect(experience).toBeInTheDocument();
        expect(experience).not.toHaveValue("0");
        expect(experience).toHaveValue("");
    });

    it("renders the character gold", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const goldField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Gold",
        });

        expect(goldField).toBeInTheDocument();
        expect(goldField).toHaveValue("50");
    });

    it("displays no gold value when gold is zero", () => {
        render(<CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />);

        const gold = screen.queryByRole("textbox", {
            name: "Gold",
        });

        expect(gold).toBeInTheDocument();
        expect(gold).not.toHaveValue("0");
        expect(gold).toHaveValue("");
    });

    it("renders the character notes", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />);

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const notesField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Notes",
        });

        expect(notesField).toBeInTheDocument();
        expect(notesField).toHaveValue("Hello haven");
    });
});
