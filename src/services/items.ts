import { prosperityOneItems, prosperityTwoItems } from "@/loaders/items";

const prosperityTwoList = prosperityOneItems.concat(prosperityTwoItems);

const getItemsForSpoilerSettings = (prosperity: number): Item[] => {
    switch (prosperity) {
        case 1:
            return prosperityOneItems;
        default:
            return prosperityTwoList;
    }
};

export { getItemsForSpoilerSettings };
