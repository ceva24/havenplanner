import { v4 as uuid } from "uuid";
import { defaultCharacter } from "@/constants";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { personalQuests } from "@/loaders/personal-quests";
import { enhancements } from "@/loaders/enhancements";

const deserialize = (data: string): Character => {
    const characterData = JSON.parse(data) as SerializedCharacter;

    const characterClass = deserializeCharacterClass(characterData.c);
    const personalQuest = deserializePersonalQuest(characterData.q);

    return {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass,
        ...(personalQuest && { personalQuest }),
        unlockedAbilityCards: deserializeAbilityCards(characterData.u, characterClass),
        hand: deserializeAbilityCards(characterData.h, characterClass),
        gainedEnhancements: deserializeGainedEnhancements(characterData.e, characterClass),
        gainedPerks: deserializeGainedPerks(characterData.p, characterClass),
        battleGoalCheckmarkGroups: deserializeGainedBattleGoalCheckmarks(characterData.b),
        items: deserializeItems(characterData.i),
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

const deserializeAbilityCards = (abilityCardIds: number[], characterClass: CharacterClass): AbilityCard[] => {
    const abilityCards = abilityCardIds.map((abilityCardId: number) => {
        return characterClass.abilityCards.find((abilityCard: AbilityCard) => abilityCard.id === abilityCardId);
    });

    const validAbilityCards: AbilityCard[] = abilityCards.filter(
        (abilityCard): abilityCard is AbilityCard => typeof abilityCard !== "undefined"
    );

    return validAbilityCards;
};

const deserializeGainedEnhancements = (
    gainedEnhancementIndices: Array<[number, number, number]>,
    characterClass: CharacterClass
): GainedEnhancement[] => {
    const gainedEnhancements: GainedEnhancement[] = [];

    gainedEnhancementIndices.forEach((cardIdSlotIdEnhcId: [number, number, number]) => {
        const abilityCard = characterClass.abilityCards.find(
            (abilityCard: AbilityCard) => abilityCard.id === cardIdSlotIdEnhcId[0]
        );
        const enhancementSlot = abilityCard?.enhancementSlots[cardIdSlotIdEnhcId[1]];
        const enhancement = enhancements[cardIdSlotIdEnhcId[2]];

        if (abilityCard && enhancementSlot && enhancement) {
            gainedEnhancements.push({
                abilityCard,
                enhancementSlot,
                enhancement,
            });
        }
    });

    return gainedEnhancements;
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

const deserializeItems = (itemIds: number[]): CharacterItem[] => {
    const characterItems: CharacterItem[] = itemIds.map((itemId: number) => {
        return { id: uuid(), item: items[itemId - 1] };
    });

    return characterItems.filter((characterItem: CharacterItem) => characterItem.item);
};

export { deserialize };
