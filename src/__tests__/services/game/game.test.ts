import { getGameDataById, getItemsByGameId } from "@/services/games/game";

jest.mock("@/services/games/gloomhaven", () => ({
    getGloomhavenGameData: jest.fn().mockReturnValue({ game: { id: 0, name: "Test Gloomy" } }),
    getGloomhavenCharacterClassData: jest.fn().mockReturnValue({ game: { id: 0, name: "Test Gloomy" }, classes: [] }),
    getGloomhavenItemData: jest.fn().mockReturnValue({
        game: { id: 0, name: "Test Gloomy" },
        items: [
            {
                name: "Boots of Test",
            },
        ],
    }),
}));

describe("getGameDataById", () => {
    it("retrieves the game data for the game matching the id", () => {
        const gameData: GameData = getGameDataById(0);

        expect(gameData.game.name).toEqual("Test Gloomy");
    });

    it("throws an error when a game matching the id is not found", () => {
        expect(() => getGameDataById(1)).toThrowError();
    });
});

describe("getItemsByGameId", () => {
    it("retrieves the items for the game matching the id", () => {
        const items: Item[] = getItemsByGameId(0);

        expect(items).toHaveLength(1);
        expect(items[0].name).toEqual("Boots of Test");
    });

    it("throws an error when a game matching the id is not found", () => {
        expect(() => getItemsByGameId(1)).toThrowError();
    });
});
