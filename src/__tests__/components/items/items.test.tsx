import { render, screen } from "@testing-library/react";
import Items from "@/components/items/items";

import { createTestCharacter } from "@/test/test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const character: Character = createTestCharacter();

describe("items", () => {
    it("renders the items autocomplete", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const addItems = screen.queryByRole("combobox", { name: "Add item" });

        expect(addItems).toBeInTheDocument();
    });

    it("renders the browse items button", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const browseItems = screen.queryByRole("button", { name: "Browse Items" });

        expect(browseItems).toBeInTheDocument();
    });

    it("renders the item grid", () => {
        render(<Items character={character} setCharacter={jest.fn()} />, { wrapper: TestSettingsProvider });

        const itemGrid = screen.queryByRole("region", {
            name: "Item Grid",
        });

        expect(itemGrid).toBeInTheDocument();
    });
});
