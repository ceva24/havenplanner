import { createDefaultBattleGoals } from "@/services/perks/battle-goal";

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
