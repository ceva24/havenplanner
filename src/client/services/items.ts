import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";

const groupItems = (items: Item[]): Dictionary<Item[]> => {
    return groupBy(items, (item: Item) => item.group);
};

const filterItemsBySlot = (items: Item[], slotsToFilterOut: ItemSlot[]): Item[] => {
    return items.filter((item: Item) => itemSlotIsActive(item.slot, slotsToFilterOut));
};

const itemSlotIsActive = (slotName: string, slotsToFilterOut: ItemSlot[]): boolean => {
    return !slotsToFilterOut.some((filteredSlot) => filteredSlot.name === slotName);
};

const getItemImageUrl = (characterItem: CharacterItem): string => {
    return characterItem.showAlternativeImage && characterItem.item.alternativeImageUrl
        ? characterItem.item.alternativeImageUrl
        : characterItem.item.imageUrl;
};

const orderItems = (characterItems: CharacterItem[], itemSlots: ItemSlot[]): CharacterItem[] => {
    return characterItems
        .slice()
        .sort(
            (a: CharacterItem, b: CharacterItem) =>
                getItemSlotIdForCharacterItem(a, itemSlots) - getItemSlotIdForCharacterItem(b, itemSlots) ||
                a.item.id - b.item.id
        );
};

const getItemSlotIdForCharacterItem = (characterItem: CharacterItem, itemSlots: ItemSlot[]): number => {
    return itemSlots.find((itemSlot: ItemSlot) => itemSlot.name === characterItem.item.slot)?.id ?? 0;
};

const areAllItemSlotsFiltered = (settings: Settings): boolean => {
    return settings.gameData.itemSlots.length === settings.userSettings.filteredItemSlots.length;
};

const getItemSlotImageUrlForSlotName = (slotName: string, itemSlots: ItemSlot[]): string => {
    return itemSlots.find((itemSlot: ItemSlot) => itemSlot.name === slotName)?.imageUrl ?? "";
};

export {
    groupItems,
    filterItemsBySlot,
    itemSlotIsActive,
    getItemImageUrl,
    orderItems,
    areAllItemSlotsFiltered,
    getItemSlotImageUrlForSlotName,
};
