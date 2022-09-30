import { render, screen, within } from "@testing-library/react";
import CharacterDetails from "@/components/profile/character-details";
import { createTestCharacter } from "@/testutils";
import AppSettingsProvider from "@/hooks/app-settings";

const character: Character = createTestCharacter({ experience: 25 });

const poorInexperiencedCharacter: Character = createTestCharacter({ experience: 0, gold: 0 });

const setCharacter = jest.fn();

describe("character details", () => {
    it("renders the form", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character name", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

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
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const classIcon = within(characterDetailsForm).queryByRole("button", {
            name: "Class",
        });

        expect(classIcon).toBeInTheDocument();
    });

    it("renders the character experience", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const experienceField = within(characterDetailsForm).queryByRole("textbox", { name: "Experience" });

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });

    it("renders the character level", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

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
        render(
            <AppSettingsProvider character={poorInexperiencedCharacter}>
                <CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const experience = screen.queryByRole("textbox", {
            name: "Experience",
        });

        expect(experience).toBeInTheDocument();
        expect(experience).not.toHaveValue("0");
        expect(experience).toHaveValue("");
    });

    it("renders the character gold", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

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
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={poorInexperiencedCharacter} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

        const gold = screen.queryByRole("textbox", {
            name: "Gold",
        });

        expect(gold).toBeInTheDocument();
        expect(gold).not.toHaveValue("0");
        expect(gold).toHaveValue("");
    });

    it("renders the character notes", () => {
        render(
            <AppSettingsProvider character={character}>
                <CharacterDetails character={character} setCharacter={setCharacter} />
            </AppSettingsProvider>
        );

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
