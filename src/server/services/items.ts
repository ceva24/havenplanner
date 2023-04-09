import { itemShouldBeHidden } from "@/shared/services/items";

const filterItems = (items: Item[], spoilerSettings: SpoilerSettings): Item[] => {
    return items.filter((item: Item) => !itemShouldBeHidden(item, spoilerSettings));
};

export { filterItems };
