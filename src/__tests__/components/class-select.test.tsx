import { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, {
    findAndSetCharacter,
} from "../../components/class-select";
import { characterClasses, initialCharacter } from "../../utils/constants";

beforeEach(() => {
    jest.clearAllMocks();
});

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
    characterClass: characterClasses[1],
};

describe("Class Select", () => {
    it("renders", () => {
        render(
            <ClassSelect
                character={character}
                setCharacter={() => null}
                characterClasses={characterClasses}
            />
        );

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });
});

describe("findAndSetCharacter", () => {
    const setCharacter = jest.fn();

    it("sets the character to the selected value", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: characterClasses[3].name },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, characterClasses);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[3],
        });
    });

    it("sets the character details to initial values when the selected class does not exist", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = {
            target: { value: "Invalid class" },
        } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, characterClasses);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: initialCharacter.characterClass,
        });
    });
});
