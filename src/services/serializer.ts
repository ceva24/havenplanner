import { characterClasses, defaultCharacter, personalQuests } from "@/utils/constants";

interface SerializedCharacterData {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
    p?: number; // Personal quest id
    i: number[]; // Item ids
}

const serialize = (character: Character): string => {
    const characterData: SerializedCharacterData = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
        p: character.personalQuest?.id,
        i: character.items.map((characterItem: CharacterItem) => {
            return characterItem.item.id;
        }),
    };

    return JSON.stringify(characterData);
};

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacterData;

    const personalQuest = personalQuests.find((personalQuest: PersonalQuest) => {
        return personalQuest.id === characterData.p;
    });

    const character: Character = {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass:
            characterClasses.find((characterClass: CharacterClass) => {
                return characterClass.id === characterData.c;
            }) ?? defaultCharacter.characterClass,
        ...(personalQuest && { personalQuest }),
        items: [],
    };

    return character;
};

export { serialize, deserialize };
