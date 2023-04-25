import { render, screen, within } from "@testing-library/react";
import CharacterDetails, { updateLevel } from "@/client/components/profile/character-details";
import { createTestCharacter } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import * as profileService from "@/client/services/profile";

jest.mock("@/client/services/profile");

const character: Character = createTestCharacter({ experience: 25 });

const poorInexperiencedCharacter: Character = createTestCharacter({ experience: 0, gold: 0 });

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

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
        jest.spyOn(profileService, "calculateLevel").mockReturnValueOnce(5);

        render(<CharacterDetails character={character} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character Details",
        });
        const levelField = within(characterDetailsForm).queryByRole("spinbutton", {
            name: "Level",
        });

        expect(levelField).toBeInTheDocument();
        expect(levelField).toHaveValue(5);
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

describe("updateLevel", () => {
    it("updates the character to the new level and experience value", () => {
        jest.spyOn(profileService, "getExperienceForLevel").mockReturnValueOnce(80);

        updateLevel("5", character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            experience: 80,
        });
    });

    it("does not update the character when a number < 1 is entered", () => {
        updateLevel("0", character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(0);
    });

    it("does not update the character when a number > 9 is entered", () => {
        updateLevel("11", character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(0);
    });

    it("does not update the character when a value that is not a number is entered", () => {
        updateLevel("test", character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(0);
    });

    it("does not update the character's experience when the character's current level is entered", () => {
        jest.spyOn(profileService, "calculateLevel").mockReturnValueOnce(1);

        updateLevel("1", character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(0);
    });
});
