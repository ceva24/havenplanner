import { items } from "@/loaders/items";

const getItemsForSpoilerSettings = (prosperity: number): Item[] => {
    return items.filter((item: Item) => Number.parseInt(item.group, 10) <= prosperity);
};

export { getItemsForSpoilerSettings };
