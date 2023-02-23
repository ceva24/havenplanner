const createDefaultBattleGoals = (): BattleGoalCheckmarkGroup[] => {
    return Array.from<BattleGoalCheckmarkGroup>({ length: 6 }).map((item: unknown, groupIndex: number) => ({
        id: groupIndex,
        checkmarks: Array.from<BattleGoalCheckmark>({ length: 3 }).map((item: unknown, checkmarkIndex: number) => ({
            id: checkmarkIndex,
            value: false,
        })),
    }));
};

const characterHasGainedPerk = (character: Character, perk: Perk, checkboxIndex: number): boolean => {
    return findCharacterGainedPerk(character, perk, checkboxIndex) !== undefined;
};

const findCharacterGainedPerk = (character: Character, perk: Perk, checkboxIndex: number): GainedPerk | undefined => {
    return character.gainedPerks.find(
        (gainedPerk: GainedPerk) => gainedPerk.perk.id === perk.id && gainedPerk.checkboxIndex === checkboxIndex
    );
};

export { createDefaultBattleGoals, characterHasGainedPerk, findCharacterGainedPerk };
