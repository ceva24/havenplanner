import { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, {
    findAndSetCharacter,
} from "../../components/class-select";

beforeEach(() => {
    jest.clearAllMocks();
});

const characterClasses = [
    {
        id: 0,
        name: "Test 1",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-brute.png",
    },
    {
        id: 1,
        name: "Test 2",
        characterMatImageUrl:
            "/worldhaven/images/character-mats/gloomhaven/gh-scoundrel.png",
    },
];

describe("Class Select", () => {
    it("renders", () => {
        render(
            <ClassSelect
                characterClass={undefined}
                characterClasses={characterClasses}
                setCharacterClass={() => null}
            />
        );

        const classSelect = screen.queryByRole("button", { name: "Class" });

        expect(classSelect).toBeInTheDocument();
    });
});

describe("findAndSetCharacter", () => {
    const setCharacterClass = jest.fn();

    it("sets the character to the selected value", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = { target: { value: "Test 1" } } as SelectChangeEvent;

        findAndSetCharacter(event, setCharacterClass, characterClasses);

        expect(setCharacterClass).toHaveBeenCalledTimes(1);
        expect(setCharacterClass).toHaveBeenCalledWith(characterClasses[0]);
    });

    it("sets the character to null when no the selected value does not exist", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = { target: { value: "" } } as SelectChangeEvent;

        findAndSetCharacter(event, setCharacterClass, characterClasses);

        expect(setCharacterClass).toHaveBeenCalledTimes(1);
        expect(setCharacterClass).toHaveBeenCalledWith(undefined);
    });
});
