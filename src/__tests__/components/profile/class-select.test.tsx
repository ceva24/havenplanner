import { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, { findAndSetCharacter } from "@/components/profile/class-select";
import { characterClasses } from "@/loaders/character-classes";
import { defaultCharacter } from "@/utils/constants";

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
    characterClass: characterClasses[1],
    items: [],
    unlockedAbilityCards: [],
};

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("class select", () => {
    it("renders", () => {
        render(<ClassSelect character={character} setCharacter={setCharacter} />);

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });

    it("renders the class icon", () => {
        render(<ClassSelect character={character} setCharacter={setCharacter} />);

        const classIcon = screen.queryByRole("img", {
            name: "Class icon",
        });

        expect(classIcon).toBeInTheDocument();
    });
});

describe("findAndSetCharacter", () => {
    it("sets the character to the selected value", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
        });
    });

    it("sets the character details to default values when the selected class does not exist", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: "Invalid class" },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: defaultCharacter.characterClass,
        });
    });

    it("clears any existing unlocked ability cards", () => {
        const character: Character = {
            name: "Test",
            experience: 45,
            gold: 25,
            notes: "Hello",
            characterClass: characterClasses[1],
            items: [],
            unlockedAbilityCards: [characterClasses[1].abilityCards[0]],
        };

        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
            unlockedAbilityCards: [],
        });
    });
});
