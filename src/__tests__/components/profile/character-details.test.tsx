import { render, screen, within } from "@testing-library/react";
import CharacterDetails from "@/components/profile/character-details";
import { createTestCharacter, TestSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter({ experience: 25 });

const poorInexperiencedCharacter: Character = createTestCharacter({ experience: 0, gold: 0 });

const setCharacter = jest.fn();

describe("character details", () => {
    it("renders the form", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character name", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const nameField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Name",
        });

        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveValue("My Char");
    });

    it("renders the class select", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const classIcon = within(characterDetailsForm).queryByRole("button", {
            name: "Class",
        });

        expect(classIcon).toBeInTheDocument();
    });

    it("renders the character experience", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const experienceField = within(characterDetailsForm).queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });

    it("renders the character level", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const levelField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Level",
        });

        expect(levelField).toBeInTheDocument();
        expect(levelField).toHaveValue("1");
    });

    it("displays no experience value when experience is zero", () => {
        render(<CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const experience = screen.queryByRole("textbox", {
            name: "Experience",
        });

        expect(experience).toBeInTheDocument();
        expect(experience).not.toHaveValue("0");
        expect(experience).toHaveValue("");
    });

    it("renders the character gold", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const goldField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Gold",
        });

        expect(goldField).toBeInTheDocument();
        expect(goldField).toHaveValue("50");
    });

    it("displays no gold value when gold is zero", () => {
        render(<CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const gold = screen.queryByRole("textbox", {
            name: "Gold",
        });

        expect(gold).toBeInTheDocument();
        expect(gold).not.toHaveValue("0");
        expect(gold).toHaveValue("");
    });

    it("renders the character notes", () => {
        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const notesField = within(characterDetailsForm).queryByRole("textbox", {
            name: "Notes",
        });

        expect(notesField).toBeInTheDocument();
        expect(notesField).toHaveValue("Hello haven");
    });
});
