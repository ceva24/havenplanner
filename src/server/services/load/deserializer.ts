import { v4 as uuid } from "uuid";

const deserialize = (
    characterData: SerializedCharacter,
    gameData: GameData,
    characterClasses: CharacterClass[],
    items: Item[],
): Character => {
    const characterClass = deserializeCharacterClass(characterData.c, gameData, characterClasses);
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
        items: deserializeItems(characterData.i, items),
    };
};

const deserializeCharacterClass = (
    characterClassId: number,
    gameData: GameData,
    characterClasses: CharacterClass[],
): CharacterClass => {
    return (
        characterClasses.find((characterClass: CharacterClass) => characterClass.id === characterClassId) ??
        gameData.defaultCharacter.characterClass
    );
};

const deserializePersonalQuest = (
    personalQuestId: number | undefined,
    gameData: GameData,
): PersonalQuest | undefined => {
    return gameData.personalQuests.find((personalQuest: PersonalQuest) => personalQuest.id === personalQuestId);
};

const deserializeAbilityCards = (abilityCardIds: number[], characterClass: CharacterClass): AbilityCard[] => {
    const abilityCards: Array<AbilityCard | undefined> = abilityCardIds.map((abilityCardId: number) => {
        return characterClass.abilityCards.find((abilityCard: AbilityCard) => abilityCard.id === abilityCardId);
    });

    const validAbilityCards: AbilityCard[] = abilityCards.filter(
        (abilityCard): abilityCard is AbilityCard => abilityCard !== undefined,
    );

    return validAbilityCards;
};

const deserializeGainedEnhancements = (
    gainedEnhancementIndices: Array<[number, number, number]>,
    characterClass: CharacterClass,
    gameData: GameData,
): GainedEnhancement[] => {
    const gainedEnhancements: GainedEnhancement[] = [];

    gainedEnhancementIndices.forEach((cardIdSlotIdEnhcId: [number, number, number]) => {
        const abilityCard = characterClass.abilityCards.find(
            (abilityCard: AbilityCard) => abilityCard.id === cardIdSlotIdEnhcId[0],
        );

        const enhancementSlot = abilityCard?.enhancementSlots.find(
            (slot: EnhancementSlot) => slot.id === cardIdSlotIdEnhcId[1],
        );

        const enhancement = gameData.enhancements.find(
            (enhancement: Enhancement) => enhancement.id === cardIdSlotIdEnhcId[2],
        );

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
    const gainedPerks: Array<GainedPerk | undefined> = perkIndices.map((perkIdAndCheckboxIndex: [number, number]) => {
        const perk = characterClass.perks.find((perk: Perk) => perk.id === perkIdAndCheckboxIndex[0]);

        return perk ? { perk, checkboxIndex: perkIdAndCheckboxIndex[1] } : undefined;
    });

    const validGainedPerks: GainedPerk[] = gainedPerks.filter(
        (gainedPerk): gainedPerk is GainedPerk => gainedPerk?.perk !== undefined,
    );

    return validGainedPerks;
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

const deserializeItems = (itemData: Array<[number, boolean]>, items: Item[]): CharacterItem[] => {
    const characterItems = itemData.map((itemIdAndUrl: [number, boolean]) => {
        const item: Item | undefined = items.find((item: Item) => item.id === itemIdAndUrl[0]);

        return {
            id: uuid(),
            item,
            showAlternativeImage: itemIdAndUrl[1],
        };
    });

    const validCharacterItems: CharacterItem[] = characterItems.filter(
        (characterItem): characterItem is CharacterItem => characterItem.item !== undefined,
    );

    return validCharacterItems;
};

export { deserialize };
