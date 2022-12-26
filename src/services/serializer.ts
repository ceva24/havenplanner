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

const serializeGainedPerks = (gainedPerks: GainedPerk[], characterClass: CharacterClass): Array<[number, number]> => {
    return gainedPerks.map((gainedPerk: GainedPerk) => [
        characterClass.perks.indexOf(gainedPerk.perk),
        gainedPerk.checkboxIndex,
    ]);
};

const serializeGainedBattleGoalCheckmarks = (battleGoalCheckmarkGroups: BattleGoalCheckmarkGroup[]): boolean[][] => {
    return battleGoalCheckmarkGroups.map((checkmarkGroup: BattleGoalCheckmarkGroup) => {
        return checkmarkGroup.checkmarks.map((checkmark: BattleGoalCheckmark) => checkmark.value);
    });
};

export { serialize };
