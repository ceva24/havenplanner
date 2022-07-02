import { characterClasses, defaultCharacter, personalQuests } from "@/utils/constants";

interface SerializedCharacterData {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
    p?: number; // Personal quest id
}

const serialize = (character: Character): string => {
    const characterData: SerializedCharacterData = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
        p: character.personalQuest?.id,
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
        personalQuest: personalQuests.find((personalQuest: PersonalQuest) => {
            return personalQuest.id === characterData.p;
        }),
    };

    return character;
};

export { serialize, deserialize };
