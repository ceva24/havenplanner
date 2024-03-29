import { getGloomhavenGameData, getGloomhavenItemData } from "@/server/services/games/gloomhaven";

jest.mock("@/server/loaders/gloomhaven/attack-modifiers", () => ({
    attackModifiers: [],
}));

jest.mock("@/server/loaders/gloomhaven/character-classes", () => ({
    characterClasses: [
        { id: 1, name: "Test Frog", initiallyLocked: false },
        { id: 2, name: "Test Spoiler", initiallyLocked: true },
    ],
}));

jest.mock("@/server/loaders/gloomhaven/enhancements", () => ({
    enhancements: [],
}));

jest.mock("@/server/loaders/gloomhaven/games", () => ({
    games: [{ id: 1, name: "Test Gloomhaven" }],
}));

jest.mock("@/server/loaders/gloomhaven/item-groups", () => ({
    itemGroups: [],
}));

jest.mock("@/server/loaders/gloomhaven/items", () => ({
    items: [{ id: 0, name: "Boots of Test" }],
}));

jest.mock("@/server/loaders/gloomhaven/personal-quests", () => ({
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

    it("sets the unlockable character classes", () => {
        const gameData: GameData = getGloomhavenGameData();

        expect(gameData.unlockableCharacterClasses).toHaveLength(1);
        expect(gameData.unlockableCharacterClasses[0].id).toEqual(2);
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
        const gameData: GameData = getGloomhavenGameData();

        expect(gameData.battleGoalCheckmarks).toHaveLength(6);
    });

    it("creates battle goal checkmarks groups of three checkmarks", () => {
        const gameData: GameData = getGloomhavenGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            expect(battleGoalCheckmarkGroup.checkmarks).toHaveLength(3);
        });
    });

    it("initializes all battle goal checkmark values to false", () => {
        const gameData: GameData = getGloomhavenGameData();

        gameData.battleGoalCheckmarks.forEach((battleGoalCheckmarkGroup: BattleGoalCheckmarkGroup) => {
            battleGoalCheckmarkGroup.checkmarks.forEach((checkmark: BattleGoalCheckmark) => {
                expect(checkmark.value).toEqual(false);
            });
        });
    });
});

describe("getGloomhavenItemData", () => {
    it("sets the game to the first game in the list", () => {
        const itemData: ItemData = getGloomhavenItemData();

        expect(itemData.game.name).toEqual("Test Gloomhaven");
    });

    it("sets the items", () => {
        const itemData: ItemData = getGloomhavenItemData();

        expect(itemData.items).toHaveLength(1);
        expect(itemData.items[0].name).toEqual("Boots of Test");
    });
});
