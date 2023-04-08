const toCharacterClassSummary = (characterClass: CharacterClass): CharacterClassSummary => {
    return {
        id: characterClass.id,
        name: characterClass.name,
        imageUrl: characterClass.imageUrl,
    };
};

export { toCharacterClassSummary };
