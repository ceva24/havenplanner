import { itemGroups } from "@/loaders/item-groups";
import { items } from "@/loaders/items";
import { formattedItemId, getItems, itemShouldBeHidden, orderItems, shouldShowItemSpoilerHint } from "@/services/items";
import { createTestAppSettings } from "@/testutils";

describe("getItems", () => {
    it("returns items not hidden by spoiler settings", () => {
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 2, itemGroups: [] },
        }).spoilerSettings;

        const items = getItems(spoilerSettings);

        expect(items).toHaveLength(21);
    });
});

describe("itemShouldBeHidden", () => {
    it("returns true when the item is above the current prosperity", () => {
        const item = items[20];

        const spoilerSettings = createTestAppSettings().spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is equal to the current prosperity", () => {
        const item = items[20];

        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 2, itemGroups: [] },
        }).spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns false when the item is below the current prosperity", () => {
        const item = items[20];

        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 8, itemGroups: [] },
        }).spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });

    it("returns true when the item is not in the active item groups", () => {
        const item = items[25];

        const spoilerSettings = createTestAppSettings().spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(true);
    });

    it("returns false when the item is in the active item groups", () => {
        const item = items[25];

        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 1, itemGroups: [{ id: 0, name: item.group }] },
        }).spoilerSettings;

        const shouldBeHidden = itemShouldBeHidden(item, spoilerSettings);

        expect(shouldBeHidden).toEqual(false);
    });
});
describe("formattedItemId", () => {
    interface FormatIdProps {
        id: number;
        formattedId: string;
    }

    it.each`
        id     | formattedId
        ${1}   | ${"001"}
        ${19}  | ${"019"}
        ${200} | ${"200"}
    `("formats id $id to $formattedId", ({ id, formattedId }: FormatIdProps) => {
        const result = formattedItemId(id);
        expect(result).toEqual(formattedId);
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
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 2, itemGroups: [] },
        }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and no item groups are selected", () => {
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 9, itemGroups: [] },
        }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is 9 and some item groups are selected", () => {
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 9, itemGroups: [itemGroups[0]] },
        }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(true);
    });

    it("should return true when prosperity level is < 9 and all item groups are selected", () => {
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 8, itemGroups },
        }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(true);
    });

    it("should return false when prosperity level is 9 and all item groups are selected", () => {
        const spoilerSettings = createTestAppSettings({
            spoilerSettings: { prosperity: 9, itemGroups },
        }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(false);
    });
});
