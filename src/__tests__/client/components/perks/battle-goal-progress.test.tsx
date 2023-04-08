import { render, screen } from "@testing-library/react";
import BattleGoalProgress, { toggleBattleGoalCheckmark } from "@/client/components/perks/battle-goal-progress";
import { createTestCharacter } from "@/test/create-test-fixtures";

const setCharacter = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("battle goal progress", () => {
    it("renders the checkboxes", () => {
        const character: Character = createTestCharacter({
            battleGoalCheckmarkGroups: [
                { id: 0, checkmarks: [{ id: 0, value: false }] },
                {
                    id: 1,
                    checkmarks: [
                        { id: 0, value: false },
                        { id: 1, value: false },
                    ],
                },
            ],
        });

        render(<BattleGoalProgress character={character} setCharacter={setCharacter} />);

        const checkboxes = screen.queryAllByRole("checkbox");

        expect(checkboxes).toHaveLength(3);
    });
});

describe("toggleBattleGoalCheckmark", () => {
    it("toggles a checkbox on", () => {
        const character: Character = createTestCharacter({
            battleGoalCheckmarkGroups: [{ id: 0, checkmarks: [{ id: 0, value: false }] }],
        });

        toggleBattleGoalCheckmark(0, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.battleGoalCheckmarkGroups).toEqual([{ id: 0, checkmarks: [{ id: 0, value: true }] }]);
    });

    it("toggles a checkbox off", () => {
        const character: Character = createTestCharacter({
            battleGoalCheckmarkGroups: [{ id: 0, checkmarks: [{ id: 0, value: true }] }],
        });

        toggleBattleGoalCheckmark(0, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.battleGoalCheckmarkGroups).toEqual([{ id: 0, checkmarks: [{ id: 0, value: false }] }]);
    });

    it("toggles one checkbox among multiple", () => {
        const character: Character = createTestCharacter({
            battleGoalCheckmarkGroups: [
                { id: 0, checkmarks: [{ id: 0, value: false }] },
                {
                    id: 1,
                    checkmarks: [
                        { id: 0, value: false },
                        { id: 1, value: false },
                    ],
                },
            ],
        });

        toggleBattleGoalCheckmark(1, 0, character, setCharacter);

        expect(setCharacter).toHaveBeenCalledTimes(1);

        const newCharacter: Character = setCharacter.mock.calls[0][0] as Character;

        expect(newCharacter.battleGoalCheckmarkGroups).toEqual([
            { id: 0, checkmarks: [{ id: 0, value: false }] },
            {
                id: 1,
                checkmarks: [
                    { id: 0, value: true },
                    { id: 1, value: false },
                ],
            },
        ]);
    });
});
