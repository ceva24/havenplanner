import { itemGroups } from "@/loaders/item-groups";

const spoilerSettingsForCharacter = (character: Character): SpoilerSettings => {
    return {
        items: {
            prosperity: determineInitialProsperity(character),
            itemGroups: determineItemGroups(character),
        },
    };
};

const determineInitialProsperity = (character: Character): number => {
    if (character.items.length === 0) return 1;

    const itemProsperities: number[] = character.items
        .filter((characterItem: CharacterItem) => !Number.isNaN(Number(characterItem.item.group)))
        .map((characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10));

    return Math.max.apply(0, itemProsperities);
};

const determineItemGroups = (character: Character): ItemGroup[] => {
    const itemGroupNames: string[] = character.items.map((characterItem: CharacterItem) => characterItem.item.group);
    const uniqueItemGroupNames = new Set<string>(itemGroupNames);

    return itemGroups.filter((itemGroup: ItemGroup) => uniqueItemGroupNames.has(itemGroup.name));
};

const hasSpoilers = (character: Character): boolean => {
    return character.items.some((characterItem: CharacterItem) => characterItem.item.group !== "1");
};

export { spoilerSettingsForCharacter, hasSpoilers };
