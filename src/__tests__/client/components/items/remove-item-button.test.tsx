import { render, screen } from "@testing-library/react";
import RemoveItemButton, { removeItem } from "@/client/components/items/remove-item-button";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

const character: Character = createTestCharacter({
    items: [
        { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
        { id: "2", item: createTestItem(2, "Cloak of Test", "1"), showAlternativeImage: false },
    ],
});

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("remove item button", () => {
    it("renders", () => {
        render(
            <RemoveItemButton character={character} setCharacter={setCharacter} characterItem={character.items[0]} />
        );

        const deleteButton = screen.queryByRole("button", { name: "Delete Boots of Test" });

        expect(deleteButton).toBeVisible();
    });
});

describe("removeItem", () => {
    it("removes an item", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false }],
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
                { id: "1", item, showAlternativeImage: false },
                { id: "2", item, showAlternativeImage: false },
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
                { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
                { id: "2", item: createTestItem(2, "Cloak of Test", "1"), showAlternativeImage: false },
                { id: "3", item: createTestItem(3, "Hat of Test", "1"), showAlternativeImage: false },
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
                { id: "1", item: createTestItem(1, "Boots of Test", "1"), showAlternativeImage: false },
                { id: "2", item: createTestItem(2, "Cloak of Test", "1"), showAlternativeImage: false },
                { id: "3", item: createTestItem(3, "Hat of Test", "1"), showAlternativeImage: false },
            ],
        });

        removeItem(character, setCharacter, { id: "-1", item: character.items[0].item, showAlternativeImage: false });

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});
