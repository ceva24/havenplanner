const filterCharacterClasses = (
    characterClasses: CharacterClass[],
    spoilerSettings: SpoilerSettings
): CharacterClass[] => {
    return characterClasses.filter((characterClass: CharacterClass) => isUnlocked(characterClass, spoilerSettings));
};

const isUnlocked = (characterClass: CharacterClass, spoilerSettings: SpoilerSettings): boolean => {
    return (
        !characterClass.initiallyLocked ||
        spoilerSettings.classes.some(
            (unlockedClass: UnlockableCharacterClassSummary) => unlockedClass.id === characterClass.id
        )
    );
};

export { filterCharacterClasses, isUnlocked };
