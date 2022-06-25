import { loadCharacter } from "@/services/character";
import { characterClasses } from "@/utils/constants";
import * as dataSerializer from "@/utils/data-serializer";
import * as linkCodec from "@/utils/link-codec";

const character: Character = {
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
};

beforeEach(() => {
    jest.resetAllMocks();
});

describe("load character service", () => {
    it("decodes and deserializes character data", () => {
        const character: Character = {
            name: "Test character",
            experience: 50,
            gold: 12,
            notes: "Test",
            characterClass: characterClasses[3],
        };

        jest.spyOn(linkCodec, "decode").mockImplementationOnce(() => "decodedData");
        jest.spyOn(dataSerializer, "deserialize").mockImplementationOnce(() => character);

        const result: Character = loadCharacter("test");

        expect(linkCodec.decode).toHaveBeenCalledTimes(1);
        expect(linkCodec.decode).toHaveBeenCalledWith("test");

        expect(dataSerializer.deserialize).toHaveBeenCalledTimes(1);
        expect(dataSerializer.deserialize).toHaveBeenCalledWith("decodedData");

        expect(result).toBe(character);
    });

    it("decodes character data", () => {
        jest.spyOn(linkCodec, "decode").mockImplementationOnce(() => "");

        loadCharacter("test");

        expect(linkCodec.decode).toHaveBeenCalledTimes(1);
        expect(linkCodec.decode).toHaveBeenCalledWith("test");
    });

    it("deserializes character data", () => {
        jest.spyOn(linkCodec, "decode").mockImplementationOnce(() => "decodedData");
        jest.spyOn(dataSerializer, "deserialize").mockImplementationOnce(() => character);

        loadCharacter("test");

        expect(dataSerializer.deserialize).toHaveBeenCalledTimes(1);
        expect(dataSerializer.deserialize).toHaveBeenCalledWith("decodedData");
    });

    it("returns the deserialized character", () => {
        jest.spyOn(linkCodec, "decode").mockImplementationOnce(() => "");
        jest.spyOn(dataSerializer, "deserialize").mockImplementationOnce(() => character);

        const result: Character = loadCharacter("test");

        expect(result).toBe(character);
    });
});
