import lzbase62 from "lzbase62";
import * as gameService from "@/server/services/games/game";
import * as deserializerService from "@/server/services/load/deserializer";
import { decode } from "@/server/services/load/decoder";
import { createTestCharacter, createTestSettings } from "@/test/create-test-fixtures";

jest.mock("@/server/services/games/game");

jest.mock("@/server/services/load/deserializer");

beforeEach(() => {
    jest.resetAllMocks();
});

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();

describe("decode", () => {
    it("decompresses character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(lzbase62.decompress).toHaveBeenCalledTimes(1);
        expect(lzbase62.decompress).toHaveBeenCalledWith("test");
    });

    it("looks up game data and deserializes character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(deserializerService.deserialize).toHaveBeenCalledTimes(1);
        expect(deserializerService.deserialize).toHaveBeenCalledWith(character, settings.gameData, [], []);
    });

    it("returns the deserialized character and game data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        const result: SaveData = decode("test");

        expect(result.character).toEqual(character);
        expect(result.gameData).toEqual(settings.gameData);
    });
});
