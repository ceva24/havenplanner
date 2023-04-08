import {
    getCharacterClassByIdAndGameId,
    getCharacterClassesByGameId,
    getGameDataById,
    getItemsByGameId,
} from "@/server/services/games/game";

jest.mock("@/server/services/games/gloomhaven", () => ({
    getGloomhavenGameData: jest.fn().mockReturnValue({ game: { id: 0, name: "Test Gloomy" } }),
    getGloomhavenCharacterClassData: jest
        .fn()
        .mockReturnValue({ game: { id: 0, name: "Test Gloomy" }, classes: [{ id: 0, name: "Test Brute" }] }),
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

describe("getCharacterClassesByGameId", () => {
    it("retrieves the character class data for the game matching the id", () => {
        const characterClasses: CharacterClass[] = getCharacterClassesByGameId(0);

        expect(characterClasses).toHaveLength(1);
        expect(characterClasses[0].name).toEqual("Test Brute");
    });

    it("throws an error when a game matching the id is not found", () => {
        expect(() => getCharacterClassesByGameId(1)).toThrowError();
    });
});

describe("getCharacterClassByIdAndGameId", () => {
    it("retrieves the character class data for the character class and game matching the ids", () => {
        const characterClass: CharacterClass = getCharacterClassByIdAndGameId(0, 0);

        expect(characterClass.name).toEqual("Test Brute");
    });

    it("throws an error when a game matching the id is not found", () => {
        expect(() => getCharacterClassByIdAndGameId(0, 1)).toThrowError();
    });

    it("throws an error when a character class matching the id is not found", () => {
        expect(() => getCharacterClassByIdAndGameId(1, 0)).toThrowError();
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
