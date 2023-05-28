import { render, screen } from "@testing-library/react";
import Items, { closeBrowseItemsDialog } from "@/client/components/items/items";
import { createTestCharacter, createTestSettings } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

jest.useFakeTimers();

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

describe("closeBrowseItemsDialog", () => {
    it("sets the browse items dialog to be closed", () => {
        const setItemsDialogOpen = jest.fn();

        closeBrowseItemsDialog(setItemsDialogOpen, createTestSettings(), jest.fn());

        expect(setItemsDialogOpen).toHaveBeenCalledTimes(1);
        expect(setItemsDialogOpen).toHaveBeenCalledWith(false);
    });

    it("resets the item slot filters", () => {
        const settings: Settings = createTestSettings();
        settings.userSettings.filteredItemSlots = ["Legs"];

        const setSettings = jest.fn();

        closeBrowseItemsDialog(jest.fn(), settings, setSettings);

        jest.runAllTimers();

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            userSettings: {
                ...settings.userSettings,
                filteredItemSlots: [],
            },
        });
    });
});
