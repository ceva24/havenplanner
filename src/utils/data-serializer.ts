import { characterClasses, initialCharacter } from "@/utils/constants";

interface SerializedCharacterData {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
}

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
            }) ?? initialCharacter.characterClass,
    };

    return character;
};

export { serialize, deserialize };
