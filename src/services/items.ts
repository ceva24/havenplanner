import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";
import { itemGroups } from "@/loaders/item-groups";
import { items } from "@/loaders/items";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const getItems = (spoilerSettings: SpoilerSettings): Item[] => {
    return items.filter((item: Item) => !itemShouldBeHidden(item, spoilerSettings));
};

const getItemsByGroup = (spoilerSettings: SpoilerSettings): Dictionary<Item[]> => {
    const items = getItems(spoilerSettings);

    return groupBy(items, (item: Item) => item.group);
};

const itemShouldBeHidden = (item: Item, spoilerSettings: SpoilerSettings): boolean => {
    return !(
        Number.parseInt(item.group, 10) <= spoilerSettings.items.prosperity ||
        spoilerSettings.items.itemGroups.map((itemGroup: ItemGroup) => itemGroup.name).includes(item.group)
    );
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
    return spoilerSettings.items.prosperity < 9 || spoilerSettings.items.itemGroups.length !== itemGroups.length;
};

export { getItems, getItemsByGroup, itemShouldBeHidden, orderItems, shouldShowItemSpoilerHint };
