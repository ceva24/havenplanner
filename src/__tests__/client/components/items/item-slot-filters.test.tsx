import { render, screen } from "@testing-library/react";
import ItemSlotFilters, { toggleItemSlotFilter } from "@/client/components/items/item-slot-filters";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import * as itemsService from "@/client/services/items";
import { createTestSettings } from "@/test/create-test-fixtures";

jest.mock("@/client/services/items", () => ({
    itemSlotIsActive: jest.fn().mockReturnValue(true),
    getItemSlots: jest.fn().mockReturnValue([
        ["Head", "/equip-slot-icons/gloomhaven/head.webp"],
        ["Chest", "/equip-slot-icons/gloomhaven/chest.webp"],
    ]),
}));

describe("item slot filters", () => {
    it("renders the item slots", () => {
        render(<ItemSlotFilters />, { wrapper: TestSettingsProvider });

        const itemSlotCheckboxes = screen.queryAllByRole("checkbox");

        expect(itemSlotCheckboxes).toHaveLength(2);
    });

    it("renders the item slot values", () => {
        jest.spyOn(itemsService, "itemSlotIsActive").mockReturnValueOnce(true).mockReturnValueOnce(false);

        render(<ItemSlotFilters />, { wrapper: TestSettingsProvider });

        const itemSlotCheckboxes = screen.queryAllByRole("checkbox");

        expect(itemSlotCheckboxes[0]).toBeChecked();
        expect(itemSlotCheckboxes[1]).not.toBeChecked();
    });
});

describe("toggleItemSlotFilter", () => {
    it("toggles an active item slot to inactive", () => {
        const settings: Settings = createTestSettings();

        const setSettings = jest.fn();

        toggleItemSlotFilter("Legs", settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);

        expect(setSettings.mock.calls[0][0].userSettings.filteredItemSlots).toEqual(["Legs"]);
    });

    it("toggles an inactive item slot to active", () => {
        const settings: Settings = createTestSettings();
        settings.userSettings.filteredItemSlots = ["Legs"];

        const setSettings = jest.fn();

        toggleItemSlotFilter("Legs", settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);

        expect(setSettings.mock.calls[0][0].userSettings.filteredItemSlots).toEqual([]);
    });
});
