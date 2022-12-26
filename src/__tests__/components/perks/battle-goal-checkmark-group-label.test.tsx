import { removeCheckmarksForBattleGoalCheckmarkGroup } from "@/components/perks/battle-goal-checkmark-group-label";
import { createTestCharacter } from "@/testutils";

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("removeCheckmarksForBattleGoalCheckmarkGroup", () => {
    it("removes all battle goal checkmarks", () => {
        const character = createTestCharacter({
            battleGoalCheckmarkGroups: [
                {
                    id: 0,
                    checkmarks: [
                        { id: 0, value: true },
                        { id: 1, value: true },
                    ],
                },
            ],
        });

        removeCheckmarksForBattleGoalCheckmarkGroup(character.battleGoalCheckmarkGroups[0], character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            battleGoalCheckmarkGroups: [
                {
                    id: 0,
                    checkmarks: [
                        { id: 0, value: false },
                        { id: 1, value: false },
                    ],
                },
            ],
        });
    });
});
