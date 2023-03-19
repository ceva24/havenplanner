import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const getItems = (settings: Settings): Item[] => {
    return settings.gameData.items.filter((item: Item) => !itemShouldBeHidden(item, settings.spoilerSettings));
};

const getItemsByGroup = (settings: Settings): Dictionary<Item[]> => {
    const filteredItems = getItems(settings);

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

export { getItems, getItemsByGroup, itemShouldBeHidden, getItemImageUrl, orderItems };
