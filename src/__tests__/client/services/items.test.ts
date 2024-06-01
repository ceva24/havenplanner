import type { Dictionary } from "lodash";
import {
    applyItemEffectsTo,
    areAllItemSlotsFiltered,
    filterItemsBySlot,
    getItemImageUrl,
    getItemSlotImageUrlForSlotName,
    groupItems,
    itemSlotIsActive,
    orderItems,
} from "@/client/services/items";
import { createTestAttackModifierDeckCard, createTestItem, createTestSettings } from "@/test/create-test-fixtures";

const itemSlots: ItemSlot[] = [
    { id: 1, name: "Two Hand", imageUrl: "" },
    { id: 2, name: "One Hand", imageUrl: "" },
    { id: 3, name: "Head", imageUrl: "" },
    { id: 4, name: "Chest", imageUrl: "" },
    { id: 5, name: "Legs", imageUrl: "legs.webp" },
    { id: 6, name: "Bag", imageUrl: "" },
];

describe("groupItems", () => {
    it("groups items by title", () => {
        const items: Item[] = [
            createTestItem(0, "Boots of Test", "1", "Legs"),
            createTestItem(1, "Boots of Random Item Design Test", "Random Item Designs", "Legs"),
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
        const item = createTestItem(1, "Boots of Test", "1", "Legs");

        const filteredItems = filterItemsBySlot([item], []);

        expect(filteredItems).toHaveLength(1);
        expect(filteredItems[0]).toEqual(item);
    });

    it("does not return an item that does not match the filter", () => {
        const item = createTestItem(1, "Boots of Test", "1", "Legs");

        const filteredItems = filterItemsBySlot([item], itemSlots);

        expect(filteredItems).toHaveLength(0);
    });
});

describe("itemSlotIsActive", () => {
    it("returns true when the item slot is not being filtered out", () => {
        const isFiltered = itemSlotIsActive("Legs", [itemSlots[1]]);

        expect(isFiltered).toEqual(true);
    });

    it("returns false when the item slot is being filtered out", () => {
        const isFiltered = itemSlotIsActive("Legs", itemSlots);

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

        const result = orderItems(characterItems, itemSlots);

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

        const result = orderItems(characterItems, itemSlots);

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

        const result = orderItems(characterItems, itemSlots);

        expect(result[0]).toEqual(characterItems[3]);
        expect(result[1]).toEqual(characterItems[1]);
        expect(result[2]).toEqual(characterItems[2]);
        expect(result[3]).toEqual(characterItems[0]);
    });

    interface ItemsProperties {
        items: CharacterItem[];
    }

    it.each`
        items
        ${[]}
        ${[{ id: 1, item: createTestItem(0, "Boots of Test", "1") }]}
    `("orders items of length $items.length without error", ({ items }: ItemsProperties) => {
        expect(() => orderItems(items, itemSlots)).not.toThrowError();
    });
});

describe("areAllItemSlotsFiltered", () => {
    it("returns true when all item slots are filtered", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = itemSlots;
        settings.userSettings.filteredItemSlots = itemSlots;

        const result = areAllItemSlotsFiltered(settings);

        expect(result).toEqual(true);
    });

    it("returns false when some item slots are filtered", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = itemSlots;
        settings.userSettings.filteredItemSlots = [itemSlots[0]];

        const result = areAllItemSlotsFiltered(settings);

        expect(result).toEqual(false);
    });

    it("returns false when no item slots are filtered", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.itemSlots = itemSlots;

        const result = areAllItemSlotsFiltered(settings);

        expect(result).toEqual(false);
    });
});

describe("getItemSlotImageUrlForSlotName", () => {
    it("returns the image url for the matching slot", () => {
        const imageUrl: string = getItemSlotImageUrlForSlotName("Legs", itemSlots);

        expect(imageUrl).toEqual("legs.webp");
    });

    it("returns an empty string when no matching slot is found", () => {
        const imageUrl: string = getItemSlotImageUrlForSlotName("Gloves", itemSlots);

        expect(imageUrl).toEqual("");
    });
});

describe("applyItemEffectsTo", () => {
    it("returns an unaltered attack modifier deck for a character with no items", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+0")];

        const attackModifierDeckWithItemEffects = applyItemEffectsTo(attackModifierDeck, []);

        expect(attackModifierDeckWithItemEffects).toEqual(attackModifierDeck);
    });

    it("returns an unaltered attack modifier deck for a character with items with no effects", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+0")];
        const items: CharacterItem[] = [
            {
                id: "1",
                item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url"),
                showAlternativeImage: false,
            },
        ];

        const attackModifierDeckWithItemEffects = applyItemEffectsTo(attackModifierDeck, items);

        expect(attackModifierDeckWithItemEffects).toEqual(attackModifierDeck);
    });

    it("applies an item effects that removes attack modifier cards", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [
            createTestAttackModifierDeckCard(1, "+0"),
            createTestAttackModifierDeckCard(1, "+0"),
        ];
        const items: CharacterItem[] = [
            {
                id: "1",
                item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url", [
                    {
                        id: 1,
                        name: "+0",
                        imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-01.webp",
                    },
                    {
                        id: 1,
                        name: "+0",
                        imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-01.webp",
                    },
                ]),
                showAlternativeImage: false,
            },
        ];

        const attackModifierDeckWithItemEffects = applyItemEffectsTo(attackModifierDeck, items);

        expect(attackModifierDeckWithItemEffects).toBeEmpty();
    });

    it("returns an unaltered attack modifier deck for a character with an item with an effect that remove attack modifier cards that don't exist", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(2, "+1")];
        const items: CharacterItem[] = [
            {
                id: "1",
                item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url", [
                    {
                        id: 1,
                        name: "+0",
                        imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-01.webp",
                    },
                ]),
                showAlternativeImage: false,
            },
        ];

        const attackModifierDeckWithItemEffects = applyItemEffectsTo(attackModifierDeck, items);

        expect(attackModifierDeckWithItemEffects).toEqual(attackModifierDeck);
    });

    it("applies an item effect that removes more attack modifier cards than exist in the deck", () => {
        const attackModifierDeck: AttackModifierDeckCard[] = [createTestAttackModifierDeckCard(1, "+0")];
        const items: CharacterItem[] = [
            {
                id: "1",
                item: createTestItem(1, "Boots of Test", "1", "Legs", "url", "alternative-url", [
                    {
                        id: 1,
                        name: "+0",
                        imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-01.webp",
                    },
                    {
                        id: 1,
                        name: "+0",
                        imageUrl: "/attack-modifiers/gloomhaven/base/player/gh-am-p1-01.webp",
                    },
                ]),
                showAlternativeImage: false,
            },
        ];

        const attackModifierDeckWithItemEffects = applyItemEffectsTo(attackModifierDeck, items);

        expect(attackModifierDeckWithItemEffects).toBeEmpty();
    });
});
