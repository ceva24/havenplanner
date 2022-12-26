import { v4 as uuid } from "uuid";
import { defaultCharacter } from "@/constants";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacterData;

    const personalQuest = deserializePersonalQuest(characterData.q);
    const characterClass = deserializeCharacterClass(characterData.c);

    return {
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

const deserializeGainedPerks = (perkIndices: Array<[number, number]>, characterClass: CharacterClass): GainedPerk[] => {
    return perkIndices.map((perkAndCheckboxIndex: [number, number]) => ({
        perk: characterClass.perks[perkAndCheckboxIndex[0]],
        checkboxIndex: perkAndCheckboxIndex[1],
    }));
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

export { deserialize };
