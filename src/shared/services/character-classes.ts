const isInitialOrUnlockedClass = (characterClass: CharacterClass, spoilerSettings: SpoilerSettings): boolean => {
    return (
        !characterClass.initiallyLocked ||
        spoilerSettings.classes.some(
            (unlockedClass: UnlockableCharacterClassSummary) => unlockedClass.id === characterClass.id,
        )
    );
};

export { isInitialOrUnlockedClass };
