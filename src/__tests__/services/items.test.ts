import { items } from "@/loaders/items";
import { formattedItemId, getItemsForSpoilerSettings, orderItems, shouldShowItemSpoilerHint } from "@/services/items";
import { createTestAppSettings } from "@/testutils";

describe("getItemsForSpoilerSettings", () => {
    it("returns prosperity one items for prosperity level one", () => {
        const items = getItemsForSpoilerSettings(1);

        expect(items).toHaveLength(14);
        expect(items[0].name).toEqual("Boots of Striding");
        expect(items[13].name).toEqual("Minor Power Potion");
    });

    it("returns prosperity level one and two items for prosperity level two", () => {
        const items = getItemsForSpoilerSettings(2);

        expect(items).toHaveLength(21);
        expect(items[0].name).toEqual("Boots of Striding");
        expect(items[20].name).toEqual("Stun Powder");
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

describe("shouldShowItemSpoilerHint", () => {
    it("should return true when prosperity level is < 9", () => {
        const spoilerSettings = createTestAppSettings({ spoilerSettings: { prosperity: 2 } }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(true);
    });

    it("should return false when prosperity level is 9", () => {
        const spoilerSettings = createTestAppSettings({ spoilerSettings: { prosperity: 9 } }).spoilerSettings;

        const shouldShow = shouldShowItemSpoilerHint(spoilerSettings);

        expect(shouldShow).toEqual(false);
    });
});
