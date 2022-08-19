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
    u: number[]; // Unlocked ability card ids
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
        u: character.unlockedAbilityCards.map((abilityCard: AbilityCard) => {
            return abilityCard.id;
        }),
    };

    return JSON.stringify(characterData);
};

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacterData;

    const personalQuest = deserializePersonalQuest(characterData.p);
    const characterClass = deserializeCharacterClass(characterData.c);

    const character: Character = {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass,
        ...(personalQuest && { personalQuest }),
        items: deserializeItems(characterData.i),
        unlockedAbilityCards: deserializeUnlockedAbilityCards(characterData.u, characterClass),
    };

    return character;
};

const deserializeCharacterClass = (characterClassId: number): CharacterClass => {
    return (
        characterClasses.find((characterClass: CharacterClass) => characterClass.id === characterClassId) ??
        defaultCharacter.characterClass
    );
};

const deserializePersonalQuest = (personalQuestId: number | undefined): PersonalQuest | undefined => {
    return personalQuests.find((personalQuest: PersonalQuest) => personalQuest.id === personalQuestId);
};

const deserializeItems = (itemIds: number[]): CharacterItem[] => {
    const characterItems: CharacterItem[] = itemIds.map((itemId: number) => {
        return { id: uuid(), item: items[itemId - 1] };
    });

    return characterItems.filter((characterItem: CharacterItem) => characterItem.item);
};

const deserializeUnlockedAbilityCards = (abilityCardIds: number[], characterClass: CharacterClass): AbilityCard[] => {
    const abilityCards = abilityCardIds.map((abilityCardId: number) => {
        return characterClass.abilityCards.find((abilityCard: AbilityCard) => abilityCard.id === abilityCardId);
    });

    const validAbilityCards: AbilityCard[] = abilityCards.filter(
        (abilityCard): abilityCard is AbilityCard => typeof abilityCard !== "undefined"
    );

    return validAbilityCards;
};

export { serialize, deserialize };
