import { render, screen } from "@testing-library/react";
import Items from "@/components/items/items";
import { createTestCharacter, defaultAppSettingsProvider } from "@/testutils";

const character: Character = createTestCharacter();

describe("items", () => {
    it("renders the items autocomplete", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const addItems = screen.queryByRole("combobox", { name: "Add item" });

        expect(addItems).toBeInTheDocument();
    });

    it("renders the browse items button", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const browseItems = screen.queryByRole("button", { name: "Browse Items" });

        expect(browseItems).toBeInTheDocument();
    });

    it("renders the item grid", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: defaultAppSettingsProvider });

        const itemGrid = screen.queryByRole("region", {
            name: "Item Grid",
        });

        expect(itemGrid).toBeInTheDocument();
    });
});
