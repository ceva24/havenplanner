const tounlockableCharacterClassSummary = (characterClass: CharacterClass): UnlockableCharacterClassSummary => {
    return {
        id: characterClass.id,
        imageUrl: characterClass.imageUrl,
    };
};

export { tounlockableCharacterClassSummary };
