import { render, screen, within } from "@testing-library/react";
import CharacterDetails, {
    calculateLevel,
} from "../../components/character-details";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: {
        id: 0,
        name: "Test 1",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
};

const poorInexperiencedCharacter: Character = {
    name: "My Char",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: {
        id: 0,
        name: "Test 1",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
};

const setCharacter = jest.fn();

const characterClasses: CharacterClass[] = [
    {
        id: 0,
        name: "Test 1",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
];

describe("Character Details", () => {
    it("renders the form", () => {
        render(
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
        );

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });

        expect(characterDetailsForm).toBeInTheDocument();
    });

    it("renders the character name", () => {
        render(
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
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

    it("renders the character experience", () => {
        render(
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
        );

        const characterDetailsForm = screen.getByRole("form", {
            name: "Character details form",
        });
        const experienceField = within(characterDetailsForm).queryByRole(
            "textbox",
            { name: "Experience" }
        );

        expect(experienceField).toBeInTheDocument();
        expect(experienceField).toHaveValue("25");
    });

    it("renders the character level", () => {
        render(
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
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
            <CharacterDetails
                character={poorInexperiencedCharacter}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
        );

        const experience = screen.queryByRole("textbox", {
            name: "Experience",
        });

        expect(experience).toBeInTheDocument();
        expect(experience).not.toHaveValue("0");
        expect(experience).toHaveValue("");
    });

    it.each`
        experience    | level
        ${0}          | ${1}
        ${44}         | ${1}
        ${45}         | ${2}
        ${46}         | ${2}
        ${95}         | ${3}
        ${150}        | ${4}
        ${210}        | ${5}
        ${275}        | ${6}
        ${345}        | ${7}
        ${420}        | ${8}
        ${499}        | ${8}
        ${500}        | ${9}
        ${501}        | ${9}
        ${9_000_000}  | ${9}
        ${-45}        | ${1}
        ${Number.NaN} | ${1}
    `(
        "sets the character level to $level when the experience value is $experience",
        ({ experience, level }) => {
            expect(calculateLevel(experience)).toEqual(level);
        }
    );

    it("renders the character gold", () => {
        render(
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
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
            <CharacterDetails
                character={poorInexperiencedCharacter}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
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
            <CharacterDetails
                character={character}
                setCharacter={setCharacter}
                characterClasses={characterClasses}
            />
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
