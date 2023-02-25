const serialize = (character: Character): string => {
    const characterData: SerializedCharacter = {
        n: character.name,
        x: character.experience,
        g: character.gold,
        d: character.notes,
        c: character.characterClass.id,
        q: character.personalQuest?.id,
        i: character.items.map((characterItem: CharacterItem) => characterItem.item.id),
        u: character.unlockedAbilityCards.map((abilityCard: AbilityCard) => abilityCard.id),
        h: character.hand.map((abilityCard: AbilityCard) => abilityCard.id),
        e: serializeGainedEnhancements(character.gainedEnhancements),
        p: serializeGainedPerks(character.gainedPerks),
        b: serializeGainedBattleGoalCheckmarks(character.battleGoalCheckmarkGroups),
    };

    return JSON.stringify(characterData);
};

const serializeGainedEnhancements = (gainedEnhancements: GainedEnhancement[]): Array<[number, number, number]> => {
    return gainedEnhancements.map((gainedEnhancement: GainedEnhancement) => [
        gainedEnhancement.abilityCard.id,
        gainedEnhancement.enhancementSlot.id,
        gainedEnhancement.enhancement.id,
    ]);
};

const serializeGainedPerks = (gainedPerks: GainedPerk[]): Array<[number, number]> => {
    return gainedPerks.map((gainedPerk: GainedPerk) => [gainedPerk.perk.id, gainedPerk.checkboxIndex]);
};

const serializeGainedBattleGoalCheckmarks = (battleGoalCheckmarkGroups: BattleGoalCheckmarkGroup[]): boolean[][] => {
    return battleGoalCheckmarkGroups.map((checkmarkGroup: BattleGoalCheckmarkGroup) => {
        return checkmarkGroup.checkmarks.map((checkmark: BattleGoalCheckmark) => checkmark.value);
    });
};

export { serialize };