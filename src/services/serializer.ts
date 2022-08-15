import { v4 as uuid } from "uuid";
import { characterClasses, defaultCharacter, items, personalQuests } from "@/utils/constants";

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

    const personalQuest = deserializePersonalQuest(characterData.p);

    const character: Character = {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass: deserializeCharacterClass(characterData.c),
        ...(personalQuest && { personalQuest }),
        items: deserializeItems(characterData.i),
        unlockedAbilityCards: [],
    };

    return character;
};

const deserializeCharacterClass = (characterClassId: number) => {
    return (
        characterClasses.find((characterClass: CharacterClass) => {
            return characterClass.id === characterClassId;
        }) ?? defaultCharacter.characterClass
    );
};

const deserializePersonalQuest = (personalQuestId: number | undefined) => {
    return personalQuests.find((personalQuest: PersonalQuest) => {
        return personalQuest.id === personalQuestId;
    });
};

const deserializeItems = (itemIds: number[]) => {
    const characterItems: CharacterItem[] = itemIds.map((itemId: number) => {
        return { id: uuid(), item: items[itemId - 1] };
    });

    return characterItems.filter((characterItem: CharacterItem) => {
        return characterItem.item;
    });
};

export { serialize, deserialize };
