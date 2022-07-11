import { encodeCharacter, loadCharacter } from "@/services/character";
import { characterClasses } from "@/utils/constants";
import * as dataSerializer from "@/services/serializer";
import * as linkCodec from "@/services/codec";

const character: Character = {
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
    items: [],
};

beforeEach(() => {
    jest.resetAllMocks();
});

describe("encode character", () => {
    it("serializes character data", () => {
        jest.spyOn(dataSerializer, "serialize").mockImplementationOnce(() => "");
        jest.spyOn(linkCodec, "encode").mockImplementationOnce(() => "");

        encodeCharacter(character);

        expect(dataSerializer.serialize).toHaveBeenCalledTimes(1);
        expect(dataSerializer.serialize).toHaveBeenCalledWith(character);
    });

    it("encodes character data", () => {
        jest.spyOn(dataSerializer, "serialize").mockImplementationOnce(() => "serializedCharacter");
        jest.spyOn(linkCodec, "encode").mockImplementationOnce(() => "");

        encodeCharacter(character);

        expect(linkCodec.encode).toHaveBeenCalledTimes(1);
        expect(linkCodec.encode).toHaveBeenCalledWith("serializedCharacter");
    });

    it("returns the encoded character", () => {
        jest.spyOn(dataSerializer, "serialize").mockImplementationOnce(() => "");
        jest.spyOn(linkCodec, "encode").mockImplementationOnce(() => "encodedData");

        const result: string = encodeCharacter(character);

        expect(result).toEqual("encodedData");
    });
});

describe("load character", () => {
    it("decodes character data", () => {
        jest.spyOn(linkCodec, "decode").mockImplementationOnce(() => "");
        jest.spyOn(dataSerializer, "deserialize").mockImplementationOnce(() => character);

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
