import { render, screen } from "@testing-library/react";
import ItemsAutocomplete, { addItem, formattedItemId } from "@/client/components/items/items-autocomplete";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValue("123"),
    };
});

jest.mock("@/client/hooks/data/use-items", () => {
    return {
        useItems: jest.fn().mockReturnValue({ items: [], isLoading: false, isError: false }),
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
            wrapper: TestSettingsProvider,
        });

        const itemsAutocomplete = screen.queryByRole("combobox", { name: "Add item" });

        expect(itemsAutocomplete).toBeInTheDocument();
    });
});

describe("formattedItemId", () => {
    interface FormatIdProperties {
        id: number;
        formattedId: string;
    }

    it.each`
        id     | formattedId
        ${1}   | ${"001"}
        ${19}  | ${"019"}
        ${200} | ${"200"}
    `("formats id $id to $formattedId", ({ id, formattedId }: FormatIdProperties) => {
        const result = formattedItemId(id);
        expect(result).toEqual(formattedId);
    });
});

describe("addItem", () => {
    it("adds an item to the character's items", () => {
        const item = createTestItem(1, "Boots of Test", "1");

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.items[0].item).toEqual(item);
    });

    it("generates a uuid for the item", () => {
        const item = createTestItem(1, "Boots of Test", "1");

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: "123", item, showAlternativeImage: false }],
        });
    });

    it("adds items to the end of the list", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "123", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
        });

        const item = createTestItem(2, "Cloak of Test", "1");

        addItem(item, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.items).toHaveLength(2);
        expect(newCharacter.items[1].item).toEqual(item);
    });

    it("allows duplicate items", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "123", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
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
