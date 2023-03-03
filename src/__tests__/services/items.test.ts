import type { Dictionary } from "lodash";
import { itemGroups } from "@/loaders/item-groups";
import { items } from "@/loaders/items";
import { getItems, getItemsByGroup, itemShouldBeHidden, orderItems, shouldShowItemSpoilerHint } from "@/services/items";
import { createTestSettings, createTestSettingsWithSpoilerSettings } from "@/testutils";

describe("getItems", () => {
    it("returns items not hidden by spoiler settings", () => {
        const settings = createTestSettingsWithSpoilerSettings(2, []);

        const items = getItems(settings.spoilerSettings);

        expect(items).toHaveLength(21);
    });
});

describe("getItemsByGroup", () => {
    it("groups items by title", () => {
        const settings = createTestSettingsWithSpoilerSettings(1, [itemGroups[0]]);

        const result: Dictionary<Item[]> = getItemsByGroup(settings.spoilerSettings);

        expect(Object.keys(result)).toHaveLength(2);
        expect(Object.keys(result)).toEqual(["1", "Random Item Designs"]);

        expect(result["1"]).toHaveLength(14);
        expect(result["Random Item Designs"]).toHaveLength(25);
    });
});

describe("itemShouldBeHidden", () => {
    it("returns true when the item is above the current prosperity", () => {
        const item = items[20];

        const spoilerSettings = createTestSettings().spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is equal to the current prosperity", () => {
        const item = items[20];

        const settings = createTestSettingsWithSpoilerSettings(2, []);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns false when the item is below the current prosperity", () => {
        const item = items[20];

        const settings = createTestSettingsWithSpoilerSettings(8, []);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns true when the item is not in the active item groups", () => {
        const item = items[25];

        const spoilerSettings = createTestSettings().spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is in the active item groups", () => {
        const item = items[25];

        const settings = createTestSettingsWithSpoilerSettings(1, [{ id: 0, name: item.group }]);

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });
});

describe("orderItems", () => {
    it("orders items by slot", () => {
        const characterItems: CharacterItem[] = [
            { id: "6", item: items[11] }, // Bag
            { id: "1", item: items[0] }, // Legs
            { id: "4", item: items[7] }, // One Hand
            { id: "2", item: items[2] }, // Chest
            { id: "3", item: items[5] }, // Head
            { id: "5", item: items[8] }, // Two Hand
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[5]);
        expect(result[1]).toEqual(characterItems[2]);
        expect(result[2]).toEqual(characterItems[4]);
        expect(result[3]).toEqual(characterItems[3]);
        expect(result[4]).toEqual(characterItems[1]);
        expect(result[5]).toEqual(characterItems[0]);
    });

    it("orders items in the same slot by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: items[13] }, // Minor Power Potion
            { id: "2", item: items[12] }, // Minor Stamina Potion
            { id: "3", item: items[11] }, // Minor Healing Potion
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[2]);
        expect(result[1]).toEqual(characterItems[0]);
        expect(result[2]).toEqual(characterItems[1]);
    });

    it("orders items by slot and then by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: items[12] }, // Minor Stamina Potion
            { id: "2", item: items[9] }, // War Hammer
            { id: "3", item: items[11] }, // Minor Power Potion
            { id: "4", item: items[8] }, // Piercing Bow
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[3]);
        expect(result[1]).toEqual(characterItems[1]);
        expect(result[2]).toEqual(characterItems[2]);
        expect(result[3]).toEqual(characterItems[0]);
    });

    interface ItemsProps {
        items: CharacterItem[];
    }

    it.each`
        items
        ${[]}
        ${[{ id: 1, item: items[0] }]}
    `("orders items of length $items.length without error", ({ items }: ItemsProps) => {
        expect(() => orderItems(items)).not.toThrowError();
    });
});

describe("shouldShowItemSpoilerHint", () => {
    it("should return true when prosperity level is < 9", () => {
        const settings = createTestSettingsWithSpoilerSettings(2, []);

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and no item groups are selected", () => {
        const settings = createTestSettingsWithSpoilerSettings(9, []);

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and some item groups are selected", () => {
        const settings = createTestSettingsWithSpoilerSettings(9, []);
        settings.gameSettings.itemGroups = [
            { id: 1, name: "Random Item Designs" },
            { id: 2, name: "Other Items" },
        ];
        settings.spoilerSettings.items.itemGroups = [settings.gameSettings.itemGroups[0]];

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is < 9 and all item groups are selected", () => {
        const settings = createTestSettingsWithSpoilerSettings(8, []);
        settings.spoilerSettings.items.itemGroups = settings.gameSettings.itemGroups;

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return false when prosperity level is 9 and all item groups are selected", () => {
        const settings = createTestSettingsWithSpoilerSettings(9, []);
        settings.spoilerSettings.items.itemGroups = settings.gameSettings.itemGroups;

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(false);
    });
});
