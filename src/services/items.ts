import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const filterItems = (items: Item[], spoilerSettings: SpoilerSettings): Item[] => {
    return items.filter((item: Item) => !itemShouldBeHidden(item, spoilerSettings));
};

const filterAndGroupItems = (items: Item[], spoilerSettings: SpoilerSettings): Dictionary<Item[]> => {
    const filteredItems = filterItems(items, spoilerSettings);

    return groupBy(filteredItems, (item: Item) => item.group);
};

const itemShouldBeHidden = (item: Item, spoilerSettings: SpoilerSettings): boolean => {
    return !(
        Number.parseInt(item.group, 10) <= spoilerSettings.items.prosperity ||
        spoilerSettings.items.itemGroups.map((itemGroup: ItemGroup) => itemGroup.name).includes(item.group)
    );
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

export { filterItems, filterAndGroupItems, itemShouldBeHidden, getItemImageUrl, orderItems };
