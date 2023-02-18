import { render, screen } from "@testing-library/react";
import ItemsAutocomplete, { addItem, orderItems } from "@/components/items/items-autocomplete";
import { items } from "@/loaders/items";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

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
            wrapper: defaultAppSettingsProvider,
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

describe("orderItems", () => {
    it("orders items by slot", () => {
        const characterItems: CharacterItem[] = [
            { id: "6", item: items[11] }, // Bag
            { id: "1", item: items[0] }, // Legs
            { id: "4", item: items[7] }, // One Hand
            { id: "2", item: items[2] }, // Chest
            { id: "3", item: items[5] }, // Head
            { id: "5", item: items[8] }, // Two Hand
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[5]);
        expect(result[1]).toEqual(characterItems[2]);
        expect(result[2]).toEqual(characterItems[4]);
        expect(result[3]).toEqual(characterItems[3]);
        expect(result[4]).toEqual(characterItems[1]);
        expect(result[5]).toEqual(characterItems[0]);
    });

    it("orders items in the same slot by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: items[13] }, // Minor Power Potion
            { id: "2", item: items[12] }, // Minor Stamina Potion
            { id: "3", item: items[11] }, // Minor Healing Potion
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[2]);
        expect(result[1]).toEqual(characterItems[0]);
        expect(result[2]).toEqual(characterItems[1]);
    });

    it("orders items by slot and then by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: items[12] }, // Minor Stamina Potion
            { id: "2", item: items[9] }, // War Hammer
            { id: "3", item: items[11] }, // Minor Power Potion
            { id: "4", item: items[8] }, // Piercing Bow
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[3]);
        expect(result[1]).toEqual(characterItems[1]);
        expect(result[2]).toEqual(characterItems[2]);
        expect(result[3]).toEqual(characterItems[0]);
    });

    interface ItemsProps {
        items: CharacterItem[];
    }

    it.each`
        items
        ${[]}
        ${[{ id: 1, item: items[0] }]}
    `("orders items of length $items.length without error", ({ items }: ItemsProps) => {
        expect(() => orderItems(items)).not.toThrowError();
    });
});
