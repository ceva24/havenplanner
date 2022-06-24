import { characterClasses, initialCharacter } from "../utils/constants";

const serialize = (character: Character): string => {
    const serializableCharacterData: SerializedCharacterData = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
    };

    return JSON.stringify(serializableCharacterData);
};

const deserialize = (data: string): Character => {
    const serializableCharacterData = JSON.parse(data) as SerializedCharacterData;

    const character: Character = {
        name: serializableCharacterData.n,
        experience: serializableCharacterData.x,
        gold: serializableCharacterData.g,
        notes: serializableCharacterData.d,
        characterClass:
            characterClasses.find((characterClass: CharacterClass) => {
                return characterClass.id === serializableCharacterData.c;
            }) ?? initialCharacter.characterClass,
    };

    return character;
};

export { serialize , deserialize };
