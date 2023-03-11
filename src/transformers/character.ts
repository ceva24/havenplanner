const tounlockableCharacterClassSummary = (characterClass: CharacterClass): UnlockableCharacterClassSummary => {
    return {
        id: characterClass.id,
        spoilerSafeName: characterClass.spoilerSafeName,
        imageUrl: characterClass.imageUrl,
    };
};

export { tounlockableCharacterClassSummary };
