import { itemGroups } from "@/loaders/item-groups";
import { items } from "@/loaders/items";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const getItems = (spoilerSettings: SpoilerSettings): Item[] => {
    return items.filter((item: Item) => !itemShouldBeHidden(item, spoilerSettings));
};

const itemShouldBeHidden = (item: Item, spoilerSettings: SpoilerSettings): boolean => {
    return !(
        Number.parseInt(item.group, 10) <= spoilerSettings.prosperity ||
        spoilerSettings.itemGroups.map((itemGroup: ItemGroup) => itemGroup.name).includes(item.group)
    );
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
    return spoilerSettings.prosperity < 9 || spoilerSettings.itemGroups.length !== itemGroups.length;
};

export { getItems, itemShouldBeHidden, formattedItemId, orderItems, shouldShowItemSpoilerHint };
