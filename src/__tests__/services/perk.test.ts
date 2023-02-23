import { createDefaultBattleGoals, characterHasGainedPerk, findCharacterGainedPerk } from "@/services/perk";
import { createTestCharacter } from "@/testutils";

describe("createDefaultBattleGoals", () => {
    it("creates six checkmark groups", () => {
        const defaultBattleGoals = createDefaultBattleGoals();

        expect(defaultBattleGoals).toHaveLength(6);
    });

    it("creates checkmarks groups of three checkmarks", () => {
        const defaultBattleGoals = createDefaultBattleGoals();

        defaultBattleGoals.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            expect(battleGoalCheckmarkGroup.checkmarks).toHaveLength(3);
        });
    });

    it("initializes all checkmark values to false", () => {
        const defaultBattleGoals = createDefaultBattleGoals();

        defaultBattleGoals.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            battleGoalCheckmarkGroup.checkmarks.forEach((checkmark: BattleGoalCheckmark) => {
                expect(checkmark.value).toEqual(false);
            });
        });
    });
});

describe("characterHasGainedPerk", () => {
    it("returns true when the character has gained the perk", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = characterHasGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(true);
    });

    it("returns false when the character has not gained the perk", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        const result = characterHasGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(false);
    });

    it("returns false when the perk exists but the checkbox number is different", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = characterHasGainedPerk(character, gainedPerk.perk, 1);

        expect(result).toEqual(false);
    });
});

describe("findCharacterGainedPerk", () => {
    it("returns the gained perk that matches the perk and checkbox number", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toEqual(gainedPerk);
    });

    it("returns undefined when the perk does not exist", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 0);

        expect(result).toBeUndefined();
    });

    it("returns undefined when the perk exists but the checkbox number is different", () => {
        const character = createTestCharacter();

        const gainedPerk: GainedPerk = {
            checkboxIndex: 0,
            perk: {
                id: 0,
                name: "",
                count: 1,
                add: [],
                remove: [],
            },
        };

        character.gainedPerks = [gainedPerk];

        const result = findCharacterGainedPerk(character, gainedPerk.perk, 1);

        expect(result).toBeUndefined();
    });
});
