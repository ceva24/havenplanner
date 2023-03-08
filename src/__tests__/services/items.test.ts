import type { Dictionary } from "lodash";
import { getItems, getItemsByGroup, itemShouldBeHidden, orderItems, shouldShowItemSpoilerHint } from "@/services/items";
import {
    createTestItem,
    createTestItemGroup,
    createTestSettings,
    createTestSettingsWithSpoilerSettings,
} from "@/test/create-test-fixtures";

describe("getItems", () => {
    it("returns items not hidden by spoiler settings", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(1, []);
        settings.gameData.items = [createTestItem(0, "Boots of Test", "1"), createTestItem(1, "Cloak of Test", "2")];

        const items = getItems(settings);

        expect(items).toHaveLength(1);
    });
});

describe("getItemsByGroup", () => {
    it("groups items by title", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(1, [
            createTestItemGroup(0, "Random Item Designs"),
        ]);
        settings.gameData.items = [
            createTestItem(0, "Boots of Test", "1"),
            createTestItem(1, "Boots of Random Item Design Test", "Random Item Designs"),
        ];

        const result: Dictionary<Item[]> = getItemsByGroup(settings);

        expect(Object.keys(result)).toHaveLength(2);
        expect(Object.keys(result)).toEqual(["1", "Random Item Designs"]);

        expect(result["1"]).toHaveLength(1);
        expect(result["Random Item Designs"]).toHaveLength(1);
    });
});

describe("itemShouldBeHidden", () => {
    it("returns true when the item is above the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettings();
        settings.gameData.items = [item];

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is equal to the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettingsWithSpoilerSettings(2, []);
        settings.gameData.items = [item];

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns false when the item is below the current prosperity", () => {
        const item = createTestItem(0, "Boots of Test", "2");

        const settings: Settings = createTestSettingsWithSpoilerSettings(8, []);
        settings.gameData.items = [item];

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns true when the item is not in the active item groups", () => {
        const item = createTestItem(0, "Boots of Test", "Random Item Designs");

        const settings: Settings = createTestSettingsWithSpoilerSettings(2, []);
        settings.gameData.items = [item];

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is in the active item groups", () => {
        const item = createTestItem(0, "Boots of Test", "Random Item Designs");

        const settings: Settings = createTestSettingsWithSpoilerSettings(2, [
            createTestItemGroup(0, "Random Item Designs"),
        ]);
        settings.gameData.items = [item];

        const shouldBeHidden = itemShouldBeHidden(item, settings.spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });
});

describe("orderItems", () => {
    it("orders items by slot", () => {
        const characterItems: CharacterItem[] = [
            { id: "6", item: createTestItem(0, "Test", "1", "Bag") },
            { id: "1", item: createTestItem(1, "Test", "1", "Legs") },
            { id: "4", item: createTestItem(2, "Test", "1", "One Hand") },
            { id: "2", item: createTestItem(3, "Test", "1", "Chest") },
            { id: "3", item: createTestItem(4, "Test", "1", "Head") },
            { id: "5", item: createTestItem(5, "Test", "1", "Two Hand") },
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
            { id: "1", item: createTestItem(1, "Minor Power Potion", "1") },
            { id: "2", item: createTestItem(2, "Minor Stamina Potion", "1") },
            { id: "3", item: createTestItem(3, "Minor Healing Potion", "1") },
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[2]);
        expect(result[1]).toEqual(characterItems[0]);
        expect(result[2]).toEqual(characterItems[1]);
    });

    it("orders items by slot and then by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: createTestItem(1, "Minor Stamina Potion", "1", "Bag") }, // Minor Stamina Potion
            { id: "2", item: createTestItem(2, "War Hammer", "1", "One Hand") }, // War Hammer
            { id: "3", item: createTestItem(3, "Minor Power Potion", "1", "Bag") }, // Minor Power Potion
            { id: "4", item: createTestItem(4, "Piercing Bow", "1", "Two Hand") }, // Piercing Bow
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
        ${[{ id: 1, item: createTestItem(0, "Boots of Test", "1") }]}
    `("orders items of length $items.length without error", ({ items }: ItemsProps) => {
        expect(() => orderItems(items)).not.toThrowError();
    });
});

describe("shouldShowItemSpoilerHint", () => {
    it("should return true when prosperity level is < 9", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(2, []);

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and no item groups are selected", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(9, []);

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and some item groups are selected", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(9, []);
        settings.gameData.itemGroups = [
            { id: 1, name: "Random Item Designs" },
            { id: 2, name: "Other Items" },
        ];
        settings.spoilerSettings.items.itemGroups = [settings.gameData.itemGroups[0]];

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is < 9 and all item groups are selected", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(8, []);
        settings.spoilerSettings.items.itemGroups = settings.gameData.itemGroups;

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(true);
    });

    it("should return false when prosperity level is 9 and all item groups are selected", () => {
        const settings: Settings = createTestSettingsWithSpoilerSettings(9, []);
        settings.spoilerSettings.items.itemGroups = settings.gameData.itemGroups;

        const shouldShow = shouldShowItemSpoilerHint(settings);

        expect(shouldShow).toEqual(false);
    });
});
