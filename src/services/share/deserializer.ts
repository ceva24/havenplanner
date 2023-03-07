import { v4 as uuid } from "uuid";

const deserialize = (characterData: SerializedCharacter, gameData: GameData): Character => {
    const characterClass = deserializeCharacterClass(characterData.c, gameData);
    const personalQuest = deserializePersonalQuest(characterData.q, gameData);

    return {
        name: characterData.n,
        experience: characterData.x,
        gold: characterData.g,
        notes: characterData.d,
        characterClass,
        ...(personalQuest && { personalQuest }),
        unlockedAbilityCards: deserializeAbilityCards(characterData.u, characterClass),
        hand: deserializeAbilityCards(characterData.h, characterClass),
        gainedEnhancements: deserializeGainedEnhancements(characterData.e, characterClass, gameData),
        gainedPerks: deserializeGainedPerks(characterData.p, characterClass),
        battleGoalCheckmarkGroups: deserializeGainedBattleGoalCheckmarks(characterData.b),
        items: deserializeItems(characterData.i, gameData),
    };
};

const deserializeCharacterClass = (characterClassId: number, gameData: GameData): CharacterClass => {
    return (
        gameData.characterClasses.find((characterClass: CharacterClass) => characterClass.id === characterClassId) ??
        gameData.defaultCharacter.characterClass
    );
};

const deserializePersonalQuest = (
    personalQuestId: number | undefined,
    gameData: GameData
): PersonalQuest | undefined => {
    return gameData.personalQuests.find((personalQuest: PersonalQuest) => personalQuest.id === personalQuestId);
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
    characterClass: CharacterClass,
    gameData: GameData
): GainedEnhancement[] => {
    const gainedEnhancements: GainedEnhancement[] = [];

    gainedEnhancementIndices.forEach((cardIdSlotIdEnhcId: [number, number, number]) => {
        const abilityCard = characterClass.abilityCards.find(
            (abilityCard: AbilityCard) => abilityCard.id === cardIdSlotIdEnhcId[0]
        );
        const enhancementSlot = abilityCard?.enhancementSlots[cardIdSlotIdEnhcId[1]];
        const enhancement = gameData.enhancements[cardIdSlotIdEnhcId[2]];

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
    return perkIndices.map((perkIdAndCheckboxIndex: [number, number]) => ({
        perk: characterClass.perks[perkIdAndCheckboxIndex[0]],
        checkboxIndex: perkIdAndCheckboxIndex[1],
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

const deserializeItems = (itemIds: number[], gameData: GameData): CharacterItem[] => {
    return gameData.items.filter((item: Item) => itemIds.includes(item.id)).map((item: Item) => ({ id: uuid(), item }));
};

export { deserialize };
