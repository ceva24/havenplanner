import { getGameDataById } from "@/services/games/game";

jest.mock("@/services/games/gloomhaven", () => ({
    getGloomhavenGameData: jest.fn().mockReturnValue({ game: { id: 0, name: "Test Gloomy" } }),
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
