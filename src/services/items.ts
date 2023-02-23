import { items } from "@/loaders/items";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const getItemsForSpoilerSettings = (prosperity: number): Item[] => {
    return items.filter((item: Item) => Number.parseInt(item.group, 10) <= prosperity);
};

const formattedItemId = (id: number): string => {
    return String(id).padStart(3, "0");
};

const orderItems = (characterItems: CharacterItem[]): CharacterItem[] => {
    return characterItems
        .slice()
        .sort(
            (a: CharacterItem, b: CharacterItem) =>
                itemOrder.indexOf(a.item.slot) - itemOrder.indexOf(b.item.slot) ||
                a.item.name.localeCompare(b.item.name, ["en"])
        );
};

const shouldShowItemSpoilerHint = (spoilerSettings: SpoilerSettings): boolean => {
    return spoilerSettings.prosperity < 9;
};

export { getItemsForSpoilerSettings, formattedItemId, orderItems, shouldShowItemSpoilerHint };
