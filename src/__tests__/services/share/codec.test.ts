import lzbase62 from "lzbase62";
import * as gameService from "@/services/games/game";
import * as serializerService from "@/services/share/serializer";
import * as deserializerService from "@/services/share/deserializer";
import { decode, encode, type SaveData } from "@/services/share/codec";
import {
    createTestAbilityCard,
    createTestCharacter,
    createTestCharacterClass,
    createTestEnhancement,
    createTestItem,
    createTestSettings,
} from "@/test/create-test-fixtures";

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

describe("codec", () => {
    it("serializes and deserializes character data", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter({
            name: "My Gloomy Char",
            experience: 10,
            gold: 8,
            notes: "Hello decode haven",
            characterClass: createTestCharacterClass(1, "Test Brute"),
        });

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
    });

    it("serializes and deserializes game data", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.gameData).toEqual(saveData.gameData);
    });

    it("serializes and deserializes character data with unicode characters", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter({
            name: "テストキャラクター",
            experience: 10,
            gold: 8,
            notes: "テスト",
            characterClass: createTestCharacterClass(1, "Test Brute"),
        });

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
    });

    it("serializes and deserializes character data with items", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.items = [createTestItem(2, "Boots of Test", "1"), createTestItem(8, "Cloak of Test", "1")];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter({
            items: [
                { id: "abc", item: settings.gameData.items[0] },
                { id: "def", item: settings.gameData.items[1] },
            ],
        });

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        const items: Item[] = decodedSaveData.character.items.map((characterItem: CharacterItem) => characterItem.item);

        expect(items).toHaveLength(character.items.length);
        expect(items).toContain(character.items[0].item);
        expect(items).toContain(character.items[1].item);
    });

    it("serializes and deserializes character data with spoiler items", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.items = [createTestItem(1, "Boots of Test", "Random Item Designs")];

        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter({ items: [{ id: "abc", item: settings.gameData.items[0] }] });

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character.items).toHaveLength(character.items.length);
        expect(decodedSaveData.character.items[0].item).toEqual(character.items[0].item);
    });

    it("serializes and deserializes character data with unlocked ability cards", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter();
        character.unlockedAbilityCards = [
            character.characterClass.abilityCards[2],
            character.characterClass.abilityCards[3],
        ];

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.unlockedAbilityCards).toHaveLength(2);
    });

    it("serializes and deserializes character data with a hand", () => {
        jest.spyOn(gameService, "getGameDataById").mockReturnValueOnce(settings.gameData);

        const character: Character = createTestCharacter();
        character.hand = [character.characterClass.abilityCards[0], character.characterClass.abilityCards[1]];

        const saveData: SaveData = { character, gameData: settings.gameData };

        const data: string = encode(saveData);

        const decodedSaveData: SaveData = decode(data);

        expect(decodedSaveData.character).toEqual(saveData.character);
        expect(decodedSaveData.character.hand).toHaveLength(2);
    });
});
