const spoilerSettingsForCharacter = (character: Character): SpoilerSettings => {
    return {
        prosperity: determineInitialProsperity(character),
    };
};

const determineInitialProsperity = (character: Character): number => {
    if (character.items.length === 0) return 1;

    return Math.max.apply(
        0,
        character.items.map((characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10))
    );
};

const hasSpoilers = (character: Character): boolean => {
    return character.items.some((characterItem: CharacterItem) => characterItem.item.group !== "1");
};

export { spoilerSettingsForCharacter, hasSpoilers };
