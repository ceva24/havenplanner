import { SelectChangeEvent } from "@mui/material";
import { render, screen } from "@testing-library/react";
import ClassSelect, {
    findAndSetCharacter,
} from "../../components/class-select";
import { initialCharacter } from "../../utils/constants";

beforeEach(() => {
    jest.clearAllMocks();
});

const character: Character = {
    name: "Test",
    experience: 45,
    gold: 25,
    notes: "Hello",
};

const characterClasses: CharacterClass[] = [
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
        const event = { target: { value: "Test 1" } } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, characterClasses);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            characterClass: characterClasses[0],
        });
    });

    it("sets the character details to initial values when the selected class does not exist", () => {
        /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
        const event = { target: { value: "None" } } as SelectChangeEvent;

        findAndSetCharacter(event, character, setCharacter, characterClasses);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(initialCharacter);
    });
});
