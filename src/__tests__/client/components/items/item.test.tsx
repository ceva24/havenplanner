import { render, screen } from "@testing-library/react";
import Item, { toggleAlternativeImageUrl } from "@/client/components/items/item";
import { createTestCharacter, createTestItem } from "@/test/create-test-fixtures";

const character: Character = createTestCharacter({
    items: [
        {
            id: "1",
            item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
            showAlternativeImage: false,
        },
        {
            id: "2",
            item: createTestItem(2, "Cloak of Test", "1", "Chest", "url", "alternative-url"),
            showAlternativeImage: false,
        },
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

describe("toggleAlternativeImageUrl", () => {
    it("toggles an alternative image url from false to true", () => {
        const character: Character = createTestCharacter({
            items: [
                {
                    id: "1",
                    item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
                    showAlternativeImage: false,
                },
            ],
        });

        toggleAlternativeImageUrl(character, setCharacter, character.items[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(setCharacter.mock.calls[0][0].items[0].showAlternativeImage).toEqual(true);
    });

    it("toggles an alternative image url from true to false", () => {
        const character: Character = createTestCharacter({
            items: [
                {
                    id: "1",
                    item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
                    showAlternativeImage: true,
                },
            ],
        });

        toggleAlternativeImageUrl(character, setCharacter, character.items[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        expect(setCharacter.mock.calls[0][0].items[0].showAlternativeImage).toEqual(false);
    });

    it("ignores an item not currently owned by the character", () => {
        const character: Character = createTestCharacter({
            items: [
                {
                    id: "1",
                    item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
                    showAlternativeImage: true,
                },
            ],
        });

        const invalidItem: CharacterItem = {
            id: "2",
            item: createTestItem(2, "Cloak of Test", "2"),
            showAlternativeImage: true,
        };

        toggleAlternativeImageUrl(character, setCharacter, invalidItem);

        expect(setCharacter).not.toHaveBeenCalled();
    });
});
