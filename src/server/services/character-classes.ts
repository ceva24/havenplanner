import { isInitialOrUnlockedClass } from "@/shared/services/character-classes";

const filterCharacterClasses = (
    characterClasses: CharacterClass[],
    spoilerSettings: SpoilerSettings
): CharacterClass[] => {
    return characterClasses.filter((characterClass: CharacterClass) =>
        isInitialOrUnlockedClass(characterClass, spoilerSettings)
    );
};

export { filterCharacterClasses };
