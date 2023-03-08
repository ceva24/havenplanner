const hasSpoilers = (character: Character): boolean => {
    return character.items.some((characterItem: CharacterItem) => characterItem.item.group !== "1");
};

const itemGroupIsActive = (itemGroup: ItemGroup, settings: Settings) => {
    return settings.spoilerSettings.items.itemGroups.some((group) => group.id === itemGroup.id);
};

const isCompletelySpoiled = (settings: Settings): boolean => {
    return (
        settings.spoilerSettings.items.itemGroups.length === settings.gameData.itemGroups.length &&
        settings.spoilerSettings.items.prosperity === 9
    );
};

export { hasSpoilers, itemGroupIsActive, isCompletelySpoiled };
