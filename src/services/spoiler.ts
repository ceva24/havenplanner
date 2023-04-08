const hasSpoilers = (character: Character): boolean => {
    return (
        character.characterClass.initiallyLocked ||
        character.items.some((characterItem: CharacterItem) => characterItem.item.group !== "1")
    );
};

const characterClassIsUnlocked = (
    unlockableCharacterClassSummary: UnlockableCharacterClassSummary,
    settings: Settings
) => {
    return settings.spoilerSettings.classes.some(
        (characterClass: UnlockableCharacterClassSummary) => characterClass.id === unlockableCharacterClassSummary.id
    );
};

const itemGroupIsActive = (itemGroup: ItemGroup, settings: Settings) => {
    return settings.spoilerSettings.items.itemGroups.some((group: ItemGroup) => group.id === itemGroup.id);
};

const isCompletelySpoiled = (settings: Settings): boolean => {
    return areCharactersCompletelySpoiled(settings) && areItemsCompletelySpoiled(settings);
};

const areCharactersCompletelySpoiled = (settings: Settings): boolean => {
    return settings.spoilerSettings.classes.length === settings.gameData.unlockableCharacterClasses.length;
};

const areItemsCompletelySpoiled = (settings: Settings): boolean => {
    return (
        settings.spoilerSettings.items.itemGroups.length === settings.gameData.itemGroups.length &&
        settings.spoilerSettings.items.prosperity === 9
    );
};

export {
    hasSpoilers,
    characterClassIsUnlocked,
    itemGroupIsActive,
    isCompletelySpoiled,
    areCharactersCompletelySpoiled,
    areItemsCompletelySpoiled,
};
