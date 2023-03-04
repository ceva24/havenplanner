import { getDefaultGameData } from "@/services/game/gloomhaven";

describe("getDefaultGameData", () => {
    it("creates six battle goal checkmark groups", () => {
        const gameData = getDefaultGameData();

        expect(gameData.battleGoalCheckmarks).toHaveLength(6);
    });

    it("creates battle goal checkmarks groups of three checkmarks", () => {
        const gameData = getDefaultGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            expect(battleGoalCheckmarkGroup.checkmarks).toHaveLength(3);
        });
    });

    it("initializes all battle goal checkmark values to false", () => {
        const gameData = getDefaultGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            battleGoalCheckmarkGroup.checkmarks.forEach((checkmark: BattleGoalCheckmark) => {
                expect(checkmark.value).toEqual(false);
            });
        });
    });
});
