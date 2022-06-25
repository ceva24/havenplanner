import { characterClasses, defaultCharacter } from "@/utils/constants";

const serialize = (character: Character): string => {
    const characterData: SerializedCharacterData = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
    };

    return JSON.stringify(characterData);
};

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacterData;

    const character: Character = {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass:
            characterClasses.find((characterClass: CharacterClass) => {
                return characterClass.id === characterData.c;
            }) ?? defaultCharacter.characterClass,
    };

    return character;
};

export { serialize, deserialize };
