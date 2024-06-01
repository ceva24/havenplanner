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
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = [
            { id: 1, name: "Head", imageUrl: "" },
            { id: 2, name: "Legs", imageUrl: "" },
        ];

        render(
            <TestSettingsProvider settings={settings}>
                <ItemSlotFilters />
            </TestSettingsProvider>,
        );

        const itemSlotCheckboxes = screen.queryAllByRole("checkbox");

        expect(itemSlotCheckboxes).toHaveLength(2);
    });

    it("renders the item slot values", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = [
            { id: 1, name: "Head", imageUrl: "" },
            { id: 2, name: "Legs", imageUrl: "" },
        ];

        jest.spyOn(itemsService, "itemSlotIsActive").mockReturnValueOnce(true).mockReturnValueOnce(false);

        render(
            <TestSettingsProvider settings={settings}>
                <ItemSlotFilters />
            </TestSettingsProvider>,
        );

        const itemSlotCheckboxes = screen.queryAllByRole("checkbox");

        expect(itemSlotCheckboxes[0]).toBeChecked();
        expect(itemSlotCheckboxes[1]).not.toBeChecked();
    });
});

describe("toggleItemSlotFilter", () => {
    it("toggles an active item slot to inactive", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = [{ id: 1, name: "Head", imageUrl: "" }];

        const setSettings = jest.fn();

        toggleItemSlotFilter(settings.gameData.itemSlots[0], settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);

        expect(setSettings.mock.calls[0][0].userSettings.filteredItemSlots).toEqual([
            { id: 1, name: "Head", imageUrl: "" },
        ]);
    });

    it("toggles an inactive item slot to active", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = [{ id: 1, name: "Head", imageUrl: "" }];
        settings.userSettings.filteredItemSlots = [{ id: 1, name: "Head", imageUrl: "" }];

        const setSettings = jest.fn();

        toggleItemSlotFilter(settings.gameData.itemSlots[0], settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);

        expect(setSettings.mock.calls[0][0].userSettings.filteredItemSlots).toEqual([]);
    });
});
