import { hasSpoilers, isCompletelySpoiled, itemGroupIsActive } from "@/services/spoiler";
import { createTestCharacter, createTestItem, createTestSettings } from "@/test/create-test-fixtures";

describe("hasSpoilers", () => {
    it("returns true when the character has items above prosperity level 1", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "2") }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });

    it("returns false when the character has items of prosperity level 1 only", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(false);
    });

    it("returns true when the character has items in an item group", () => {
        const item: Item = createTestItem(1, "Boots of Test", "Random Item Designs");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const result = hasSpoilers(character);

        expect(result).toEqual(true);
    });
});

describe("itemGroupIsActive", () => {
    it("returns true when the item group is active in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [itemGroup];

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(true);
    });

    it("returns false when the item group is inactive in the app settings", () => {
        const itemGroup = { id: 0, name: "Group" };

        const settings: Settings = createTestSettings();

        const isActive = itemGroupIsActive(itemGroup, settings);

        expect(isActive).toEqual(false);
    });
});

describe("isCompletelySpoiled", () => {
    it("returns false when prosperity is < 9 and item groups are unchecked", () => {
        const settings: Settings = createTestSettings({
            spoilerSettings: {
                items: {
                    prosperity: 1,
                    itemGroups: [],
                },
            },
        });

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns false when prosperity is 9 and item groups are unchecked", () => {
        const settings: Settings = createTestSettings({
            spoilerSettings: {
                items: {
                    prosperity: 9,
                    itemGroups: [],
                },
            },
        });

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns false when prosperity is < 9 and all item groups are checked", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = settings.gameData.itemGroups;

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(false);
    });

    it("returns true when prosperity is 9 and all item groups are checked", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings = {
            items: {
                prosperity: 9,
                itemGroups: settings.gameData.itemGroups,
            },
        };

        const isSpoiled = isCompletelySpoiled(settings);

        expect(isSpoiled).toEqual(true);
    });
});
