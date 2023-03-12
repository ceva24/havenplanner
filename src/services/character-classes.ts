const getCharacterClasses = (settings: Settings): CharacterClass[] => {
    return settings.gameData.characterClasses.filter((characterClass: CharacterClass) =>
        isUnlocked(characterClass, settings)
    );
};

const isUnlocked = (characterClass: CharacterClass, settings: Settings): boolean => {
    return (
        !characterClass.initiallyLocked ||
        settings.spoilerSettings.classes.some(
            (unlockedClass: UnlockableCharacterClassSummary) => unlockedClass.id === characterClass.id
        )
    );
};

export { getCharacterClasses, isUnlocked };
