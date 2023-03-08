const hasSpoilers = (character: Character): boolean => {
    return character.items.some((characterItem: CharacterItem) => characterItem.item.group !== "1");
};

const itemGroupIsActive = (itemGroup: ItemGroup, settings: Settings) => {
    return settings.spoilerSettings.items.itemGroups.some((group) => group.id === itemGroup.id);
};

export { hasSpoilers, itemGroupIsActive };
