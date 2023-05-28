import type { Dictionary } from "lodash";
import {
    areAllItemSlotsFiltered,
    filterItemsBySlot,
    getItemImageUrl,
    getItemSlots,
    groupItems,
    itemSlotIsActive,
    orderItems,
} from "@/client/services/items";
import { createTestItem } from "@/test/create-test-fixtures";

describe("getItemsByGroup", () => {
    it("groups items by title", () => {
        const items: Item[] = [
            createTestItem(0, "Boots of Test", "1"),
            createTestItem(1, "Boots of Random Item Design Test", "Random Item Designs"),
        ];

        const result: Dictionary<Item[]> = groupItems(items);

        expect(Object.keys(result)).toHaveLength(2);
        expect(Object.keys(result)).toEqual(["1", "Random Item Designs"]);

        expect(result["1"]).toHaveLength(1);
        expect(result["Random Item Designs"]).toHaveLength(1);
    });
});

describe("filterItemsBySlot", () => {
    it("returns an item that matches the filters", () => {
        const item = createTestItem(1, "Boots of Test", "1");

        const filteredItems = filterItemsBySlot([item], []);

        expect(filteredItems).toHaveLength(1);
        expect(filteredItems[0]).toEqual(item);
    });

    it("does not return an item that does not match the filter", () => {
        const item = createTestItem(1, "Boots of Test", "1");

        const filteredItems = filterItemsBySlot([item], [item.slot]);

        expect(filteredItems).toHaveLength(0);
    });
});

describe("itemSlotIsActive", () => {
    it("returns true when the item slot is not being filtered out", () => {
        const isFiltered = itemSlotIsActive("Legs", ["Chest"]);

        expect(isFiltered).toEqual(true);
    });

    it("returns false when the item slot is being filtered out", () => {
        const isFiltered = itemSlotIsActive("Legs", ["Chest", "Legs"]);

        expect(isFiltered).toEqual(false);
    });
});

describe("getItemImageUrl", () => {
    it("renders the item image url if showAlternativeImage is false", () => {
        const characterItem: CharacterItem = {
            id: "1",
            item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
            showAlternativeImage: false,
        };

        const imageUrl = getItemImageUrl(characterItem);

        expect(imageUrl).toEqual("url");
    });

    it("renders the item image url if showAlternativeImage is true but it has no alternative image url", () => {
        const characterItem: CharacterItem = {
            id: "1",
            item: createTestItem(1, "Boots of Test", "1", "Legs", "url"),
            showAlternativeImage: true,
        };

        const imageUrl = getItemImageUrl(characterItem);

        expect(imageUrl).toEqual("url");
    });

    it("renders the alternative item image url if showAlternativeImage is true and it has an alternative image url", () => {
        const characterItem: CharacterItem = {
            id: "1",
            item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
            showAlternativeImage: true,
        };

        const imageUrl = getItemImageUrl(characterItem);

        expect(imageUrl).toEqual("alternative-url");
    });
});

describe("orderItems", () => {
    it("orders items by slot", () => {
        const characterItems: CharacterItem[] = [
            { id: "6", item: createTestItem(0, "Test", "1", "Bag"), showAlternativeImage: false },
            { id: "1", item: createTestItem(1, "Test", "1", "Legs"), showAlternativeImage: false },
            { id: "4", item: createTestItem(2, "Test", "1", "One Hand"), showAlternativeImage: false },
            { id: "2", item: createTestItem(3, "Test", "1", "Chest"), showAlternativeImage: false },
            { id: "3", item: createTestItem(4, "Test", "1", "Head"), showAlternativeImage: false },
            { id: "5", item: createTestItem(5, "Test", "1", "Two Hand"), showAlternativeImage: false },
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[5]);
        expect(result[1]).toEqual(characterItems[2]);
        expect(result[2]).toEqual(characterItems[4]);
        expect(result[3]).toEqual(characterItems[3]);
        expect(result[4]).toEqual(characterItems[1]);
        expect(result[5]).toEqual(characterItems[0]);
    });

    it("orders items in the same slot by id", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: createTestItem(2, "Minor Power Potion", "1"), showAlternativeImage: false },
            { id: "2", item: createTestItem(3, "Minor Stamina Potion", "1"), showAlternativeImage: false },
            { id: "3", item: createTestItem(1, "Minor Healing Potion", "1"), showAlternativeImage: false },
        ];

        const result = orderItems(characterItems);

        expect(result[0]).toEqual(characterItems[2]);
        expect(result[1]).toEqual(characterItems[0]);
        expect(result[2]).toEqual(characterItems[1]);
    });

    it("orders items by slot and then by name", () => {
        const characterItems: CharacterItem[] = [
            { id: "1", item: createTestItem(3, "Minor Stamina Potion", "1", "Bag"), showAlternativeImage: false }, // Minor Stamina Potion
            { id: "2", item: createTestItem(2, "War Hammer", "1", "One Hand"), showAlternativeImage: false }, // War Hammer
            { id: "3", item: createTestItem(1, "Minor Power Potion", "1", "Bag"), showAlternativeImage: false }, // Minor Power Potion
            { id: "4", item: createTestItem(4, "Piercing Bow", "1", "Two Hand"), showAlternativeImage: false }, // Piercing Bow
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

describe("getItemSlots", () => {
    it("returns all item slot names and urls", () => {
        const itemSlots = getItemSlots();

        expect(itemSlots).toEqual([
            ["Two Hand", "/equip-slot-icons/gloomhaven/two-hand.webp"],
            ["One Hand", "/equip-slot-icons/gloomhaven/one-hand.webp"],
            ["Head", "/equip-slot-icons/gloomhaven/head.webp"],
            ["Chest", "/equip-slot-icons/gloomhaven/chest.webp"],
            ["Legs", "/equip-slot-icons/gloomhaven/legs.webp"],
            ["Bag", "/equip-slot-icons/gloomhaven/bag.webp"],
        ]);
    });
});

describe("areAllItemSlotsFiltered", () => {
    it("returns true when all item slots are filtered", () => {
        const filteredSlots = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

        const result = areAllItemSlotsFiltered(filteredSlots);

        expect(result).toEqual(true);
    });

    it("returns false when some item slots are filtered", () => {
        const filteredSlots = ["Two Hand", "Head", "Chest", "Bag"];

        const result = areAllItemSlotsFiltered(filteredSlots);

        expect(result).toEqual(false);
    });

    it("returns false when no item slots are filtered", () => {
        const result = areAllItemSlotsFiltered([]);

        expect(result).toEqual(false);
    });
});
