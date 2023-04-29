import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const groupItems = (items: Item[]): Dictionary<Item[]> => {
    return groupBy(items, (item: Item) => item.group);
};

const filterItems = (items: Item[], itemSlotFilters: string[]): Item[] => {
    return items.filter((item: Item) => !itemSlotFilters.includes(item.slot));
};

const getItemImageUrl = (characterItem: CharacterItem): string => {
    return characterItem.showAlternativeImage && characterItem.item.alternativeImageUrl
        ? characterItem.item.alternativeImageUrl
        : characterItem.item.imageUrl;
};

const orderItems = (characterItems: CharacterItem[]): CharacterItem[] => {
    return characterItems
        .slice()
        .sort(
            (a: CharacterItem, b: CharacterItem) =>
                itemOrder.indexOf(a.item.slot) - itemOrder.indexOf(b.item.slot) || a.item.id - b.item.id
        );
};

const getItemSlots = (): Array<[string, string]> => {
    return [
        ["Two Hand", "/equip-slot-icons/gloomhaven/two-hand.webp"],
        ["One Hand", "/equip-slot-icons/gloomhaven/one-hand.webp"],
        ["Head", "/equip-slot-icons/gloomhaven/head.webp"],
        ["Chest", "/equip-slot-icons/gloomhaven/chest.webp"],
        ["Legs", "/equip-slot-icons/gloomhaven/legs.webp"],
        ["Bag", "/equip-slot-icons/gloomhaven/bag.webp"],
    ];
};

const itemSlotFilterIsActive = (slot: string, currentFilters: string[]): boolean => {
    return !currentFilters.includes(slot);
};

export { groupItems, filterItems, getItemImageUrl, orderItems, getItemSlots, itemSlotFilterIsActive };
