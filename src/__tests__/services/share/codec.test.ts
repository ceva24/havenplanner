import lzbase62 from "lzbase62";
import * as gameService from "@/services/games/game";
import * as serializerService from "@/services/share/serializer";
import * as deserializerService from "@/services/share/deserializer";
import { decode, encode, type SaveData } from "@/services/share/codec";
import { createTestCharacter, createTestSettings } from "@/test/create-test-fixtures";

jest.mock("@/services/games/game", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/games/game"),
    };
});

jest.mock("@/services/share/serializer", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/share/serializer"),
    };
});

jest.mock("@/services/share/deserializer", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/share/deserializer"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

const character: Character = createTestCharacter();
const settings: Settings = createTestSettings();

describe("encode", () => {
    it("serializes character data", () => {
        jest.spyOn(serializerService, "serialize").mockReturnValueOnce("");

        encode({ character, gameData: settings.gameData });

        expect(serializerService.serialize).toHaveBeenCalledTimes(1);
        expect(serializerService.serialize).toHaveBeenCalledWith(character, settings.gameData);
    });

    it("compresses character data", () => {
        jest.spyOn(serializerService, "serialize").mockReturnValueOnce("serializedCharacter");
        jest.spyOn(lzbase62, "compress").mockReturnValueOnce("");

        encode({ character, gameData: settings.gameData });

        expect(lzbase62.compress).toHaveBeenCalledTimes(1);
        expect(lzbase62.compress).toHaveBeenCalledWith("serializedCharacter");
    });

    it("returns the serialized and compressed character data", () => {
        jest.spyOn(lzbase62, "compress").mockReturnValueOnce("123");

        const encodedData = encode({ character, gameData: settings.gameData });

        expect(encodedData).toEqual("123");
    });
});

describe("decode", () => {
    it("decompresses character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(lzbase62.decompress).toHaveBeenCalledTimes(1);
        expect(lzbase62.decompress).toHaveBeenCalledWith("test");
    });

    it("looks up game data and deserializes character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(deserializerService.deserialize).toHaveBeenCalledTimes(1);
        expect(deserializerService.deserialize).toHaveBeenCalledWith(character, settings.gameData);
    });

    it("returns the deserialized character and game data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce(JSON.stringify(character));
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        const result: SaveData = decode("test");

        expect(result.character).toEqual(character);
        expect(result.gameData).toEqual(settings.gameData);
    });
});
