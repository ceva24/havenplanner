import { getGloomhavenGameData } from "@/services/games/gloomhaven";

jest.mock("@/loaders/attack-modifiers", () => ({
    attackModifiers: [],
}));

jest.mock("@/loaders/character-classes", () => ({
    characterClasses: [{ id: 1, name: "Test Frog" }],
}));

jest.mock("@/loaders/enhancements", () => ({
    enhancements: [],
}));

jest.mock("@/loaders/games", () => ({
    games: [{ id: 1, name: "Test Gloomhaven" }],
}));

jest.mock("@/loaders/item-groups", () => ({
    itemGroups: [],
}));

jest.mock("@/loaders/items", () => ({
    items: [],
}));

jest.mock("@/loaders/personal-quests", () => ({
    personalQuests: [],
}));

beforeEach(() => {
    jest.resetAllMocks();
});

describe("getGameData", () => {
    it("sets the game to the first game in the list", () => {
        const gameData: GameData = getGloomhavenGameData();

        expect(gameData.game.name).toEqual("Test Gloomhaven");
    });

    it("sets the character class to the first class in the list", () => {
        const gameData: GameData = getGloomhavenGameData();

        expect(gameData.defaultCharacter.characterClass.name).toEqual("Test Frog");
    });

    it("creates the base attack modifier deck", () => {
        const gameData: GameData = getGloomhavenGameData();

        expect(gameData.baseAttackModifierDeck).toHaveLength(7);
        expect(gameData.baseAttackModifierDeck[0].count).toEqual(1);
        expect(gameData.baseAttackModifierDeck[1].count).toEqual(1);
        expect(gameData.baseAttackModifierDeck[2].count).toEqual(5);
        expect(gameData.baseAttackModifierDeck[3].count).toEqual(6);
        expect(gameData.baseAttackModifierDeck[4].count).toEqual(5);
        expect(gameData.baseAttackModifierDeck[5].count).toEqual(1);
        expect(gameData.baseAttackModifierDeck[6].count).toEqual(1);
    });

    it("creates six battle goal checkmark groups", () => {
        const gameData = getGloomhavenGameData();

        expect(gameData.battleGoalCheckmarks).toHaveLength(6);
    });

    it("creates battle goal checkmarks groups of three checkmarks", () => {
        const gameData = getGloomhavenGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            expect(battleGoalCheckmarkGroup.checkmarks).toHaveLength(3);
        });
    });

    it("initializes all battle goal checkmark values to false", () => {
        const gameData = getGloomhavenGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            battleGoalCheckmarkGroup.checkmarks.forEach((checkmark: BattleGoalCheckmark) => {
                expect(checkmark.value).toEqual(false);
            });
        });
    });
});