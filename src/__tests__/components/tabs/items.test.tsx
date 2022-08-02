import { render, screen } from "@testing-library/react";
import Items from "@/components/tabs/items";
import { characterClasses } from "@/utils/constants";

const character: Character = {
    name: "My Char",
    experience: 25,
    gold: 50,
    notes: "Hello haven",
    characterClass: characterClasses[0],
    items: [],
};

describe("items", () => {
    it("renders the items autocomplete", () => {
        render(<Items character={character} setCharacter={jest.fn()} />);

        const addItems = screen.queryByRole("combobox", { name: "Add item" });

        expect(addItems).toBeInTheDocument();
    });

    it("renders the item grid", () => {
        render(<Items character={character} setCharacter={jest.fn()} />);

        const itemGrid = screen.queryByRole("region", {
            name: "Item Grid",
        });

        expect(itemGrid).toBeInTheDocument();
    });
});