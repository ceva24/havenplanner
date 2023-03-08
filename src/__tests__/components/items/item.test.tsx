import { render, screen } from "@testing-library/react";
import Item, { removeItem } from "@/components/items/item";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

const character: Character = createTestCharacter({
    items: [
        { id: "1", item: createTestItem(1, "Boots of Test", "1") },
        { id: "2", item: createTestItem(2, "Cloak of Test", "1") },
    ],
});

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("item", () => {
    it("renders the item image", () => {
        render(<Item character={character} setCharacter={setCharacter} characterItem={character.items[0]} />);

        const itemImage = screen.queryByRole("img", { name: character.items[0].item.name });

        expect(itemImage).toBeVisible();
    });

    it("renders the item delete button with the appropriate label", () => {
        render(<Item character={character} setCharacter={setCharacter} characterItem={character.items[0]} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete Boots of Test" });

        expect(deleteButton).toBeVisible();
    });
});

describe("removeItem", () => {
    it("removes an item", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        removeItem(character, setCharacter, character.items[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("only removes the correct item when duplicate items are present", () => {
        const item: Item = createTestItem(1, "Boots of Test", "1");

        const character: Character = createTestCharacter({
            items: [
                { id: "1", item },
                { id: "2", item },
            ],
        });

        removeItem(character, setCharacter, character.items[1]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [character.items[0]],
        });
    });

    it("removes an item from the middle of the list", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1") },
                { id: "2", item: createTestItem(2, "Cloak of Test", "1") },
                { id: "3", item: createTestItem(3, "Hat of Test", "1") },
            ],
        });

        removeItem(character, setCharacter, character.items[1]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [character.items[0], character.items[2]],
        });
    });

    it("does not remove any items when the id is invalid", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1") },
                { id: "2", item: createTestItem(2, "Cloak of Test", "1") },
                { id: "3", item: createTestItem(3, "Hat of Test", "1") },
            ],
        });

        removeItem(character, setCharacter, { id: "-1", item: character.items[0].item });

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});
