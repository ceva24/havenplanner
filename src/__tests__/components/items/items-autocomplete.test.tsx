import { render, screen } from "@testing-library/react";
import ItemsAutocomplete, { addItem } from "@/components/items/items-autocomplete";
import { items } from "@/loaders/items";
import { createTestCharacter, TestAppSettingsProvider } from "@/testutils";

const mockUuid = "123";

jest.mock("uuid", () => {
    return {
        v4: () => mockUuid,
    };
});

const character: Character = createTestCharacter();

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("items autocomplete", () => {
    it("renders", () => {
        render(<ItemsAutocomplete character={character} setCharacter={setCharacter} />, {
            wrapper: TestAppSettingsProvider,
        });

        const itemsAutocomplete = screen.queryByRole("combobox", { name: "Add item" });

        expect(itemsAutocomplete).toBeInTheDocument();
    });
});

describe("addItem", () => {
    it("adds an item to the character's items", () => {
        const item = items[3];

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.items[0].item).toEqual(item);
    });

    it("generates a uuid for the item", () => {
        const item = items[3];

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: mockUuid, item }],
        });
    });

    it("adds items to the end of the list", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "123", item: items[2] }],
        });

        const item = items[3];

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.items).toHaveLength(2);
        expect(newCharacter.items[1].item).toEqual(item);
    });

    it("allows duplicate items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "123", item: items[2] }],
        });

        addItem(character.items[0].item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.items).toHaveLength(2);
        expect(newCharacter.items[1].item).toEqual(newCharacter.items[0].item);
    });

    it("does not add null items", () => {
        addItem(null, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(0);
    });
});
