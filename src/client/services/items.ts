import type { Dictionary } from "lodash";
import groupBy from "lodash.groupby";

const itemOrder = ["Two Hand", "One Hand", "Head", "Chest", "Legs", "Bag"];

const groupItems = (items: Item[]): Dictionary<Item[]> => {
    return groupBy(items, (item: Item) => item.group);
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

export { groupItems, getItemImageUrl, orderItems };
