import { render, screen } from "@testing-library/react";
import Item, { removeItem } from "@/components/items/item";
import { characterClasses, items } from "@/utils/constants";

const character: Character = {
    name: "Test",
    experience: 0,
    gold: 0,
    notes: "",
    characterClass: characterClasses[0],
    items: [
        { id: "1", item: items[8] },
        { id: "2", item: items[5] },
    ],
};

const setCharacter = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("item", () => {
    it("renders the item image", () => {
        render(<Item character={character} setCharacter={setCharacter} characterItem={character.items[0]} index={0} />);

        const itemImage = screen.queryByRole("img", { name: character.items[0].item.name });

        expect(itemImage).toBeVisible();
    });

    it("renders the item delete button with the appropriate label", () => {
        render(<Item character={character} setCharacter={setCharacter} characterItem={character.items[0]} index={0} />);

        const deleteButton = screen.queryByRole("button", { name: "Delete item 1 - Piercing Bow" });

        expect(deleteButton).toBeVisible();
    });
});

describe("removeItem", () => {
    it("removes an item", () => {
        const character = {
            name: "Test",
            experience: 0,
            gold: 0,
            notes: "",
            characterClass: characterClasses[0],
            items: [{ id: "1", item: items[0] }],
        };

        removeItem(character, setCharacter, character.items[0]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("only removes the correct item when duplicate items are present", () => {
        const character = {
            name: "Test",
            experience: 0,
            gold: 0,
            notes: "",
            characterClass: characterClasses[0],
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[0] },
            ],
        };

        removeItem(character, setCharacter, character.items[1]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [character.items[0]],
        });
    });

    it("removes an item from the middle of the list", () => {
        const character = {
            name: "Test",
            experience: 0,
            gold: 0,
            notes: "",
            characterClass: characterClasses[0],
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[1] },
                { id: "3", item: items[2] },
            ],
        };

        removeItem(character, setCharacter, character.items[1]);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [character.items[0], character.items[2]],
        });
    });

    it("does not remove any items when the id is invalid", () => {
        const character = {
            name: "Test",
            experience: 0,
            gold: 0,
            notes: "",
            characterClass: characterClasses[0],
            items: [
                { id: "1", item: items[0] },
                { id: "2", item: items[1] },
                { id: "3", item: items[2] },
            ],
        };

        removeItem(character, setCharacter, { id: "-1", item: items[0] });

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});