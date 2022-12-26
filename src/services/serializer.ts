import { v4 as uuid } from "uuid";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { defaultCharacter } from "@/constants";

interface SerializedCharacterData {
    n: string; // Name
    x: number; // Experience
    g: number; // Gold
    d: string; // Notes
    c: number; // Character id
    q?: number; // Personal quest id
    i: number[]; // Item ids
    u: number[]; // Unlocked ability card ids
    h: number[]; // Hand ability card ids
    p: Array<[number, number]>; // Gained perk and checkbox indices
    b: boolean[][]; // Gained battle goal checkmark groups
}

const serialize = (character: Character): string => {
    const characterData: SerializedCharacterData = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
        q: character.personalQuest?.id,
        i: character.items.map((characterItem: CharacterItem) => characterItem.item.id),
        u: character.unlockedAbilityCards.map((abilityCard: AbilityCard) => abilityCard.id),
        h: character.hand.map((abilityCard: AbilityCard) => abilityCard.id),
        p: serializeGainedPerks(character.gainedPerks, character.characterClass),
        b: serializeGainedBattleGoalCheckmarks(character.battleGoalCheckmarkGroups),
    };

    return JSON.stringify(characterData);
};

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacterData;

    const personalQuest = deserializePersonalQuest(characterData.q);
    const characterClass = deserializeCharacterClass(characterData.c);

    const character: Character = {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass,
        ...(personalQuest && { personalQuest }),
        items: deserializeItems(characterData.i),
        unlockedAbilityCards: deserializeAbilityCards(characterData.u, characterClass),
        hand: deserializeAbilityCards(characterData.h, characterClass),
        gainedPerks: deserializeGainedPerks(characterData.p, characterClass),
        battleGoalCheckmarkGroups: deserializeGainedBattleGoalCheckmarks(characterData.b),
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

const deserializeAbilityCards = (abilityCardIds: number[], characterClass: CharacterClass): AbilityCard[] => {
    const abilityCards = abilityCardIds.map((abilityCardId: number) => {
        return characterClass.abilityCards.find((abilityCard: AbilityCard) => abilityCard.id === abilityCardId);
    });

    const validAbilityCards: AbilityCard[] = abilityCards.filter(
        (abilityCard): abilityCard is AbilityCard => typeof abilityCard !== "undefined"
    );

    return validAbilityCards;
};

const serializeGainedPerks = (gainedPerks: GainedPerk[], characterClass: CharacterClass): Array<[number, number]> => {
    return gainedPerks.map((gainedPerk: GainedPerk) => [
        characterClass.perks.indexOf(gainedPerk.perk),
        gainedPerk.checkboxIndex,
    ]);
};

const deserializeGainedPerks = (perkIndices: Array<[number, number]>, characterClass: CharacterClass): GainedPerk[] => {
    return perkIndices.map((perkAndCheckboxIndex: [number, number]) => ({
        perk: characterClass.perks[perkAndCheckboxIndex[0]],
        checkboxIndex: perkAndCheckboxIndex[1],
    }));
};

const serializeGainedBattleGoalCheckmarks = (battleGoalCheckmarkGroups: BattleGoalCheckmarkGroup[]): boolean[][] => {
    return battleGoalCheckmarkGroups.map((checkmarkGroup: BattleGoalCheckmarkGroup) => {
        return checkmarkGroup.checkmarks.map((checkmark: BattleGoalCheckmark) => checkmark.value);
    });
};

const deserializeGainedBattleGoalCheckmarks = (battleGoalIndices: boolean[][]): BattleGoalCheckmarkGroup[] => {
    return battleGoalIndices.map((checkmarkGroup: boolean[], groupIndex: number) => ({
        id: groupIndex,
        checkmarks: checkmarkGroup.map((value: boolean, checkmarkIndex: number) => ({
            id: checkmarkIndex,
            value,
        })),
    }));
};

export { serialize, deserialize };
