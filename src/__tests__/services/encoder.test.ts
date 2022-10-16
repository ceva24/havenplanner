import lzbase62 from "lzbase62";
import { decode, encode } from "@/services/encoder";
import * as dataSerializer from "@/services/serializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter({
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
});

const characterWithUnicodeCharacters = createTestCharacter({
    name: "テストキャラクター",
    experience: 50,
    gold: 12,
    notes: "テスト",
    characterClass: characterClasses[3],
});

const characterWithItems = createTestCharacter({
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
    items: [
        { id: "abc", item: items[0] },
        { id: "def", item: items[3] },
    ],
});

const characterWithUnlockedAbilityCards: Character = createTestCharacter({
    name: "Test character",
    experience: 500,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
    unlockedAbilityCards: [characterClasses[3].abilityCards[12], characterClasses[3].abilityCards[13]],
});

const characterWithHand: Character = createTestCharacter({
    characterClass: characterClasses[3],
    hand: [characterClasses[3].abilityCards[12], characterClasses[3].abilityCards[13]],
});

jest.mock("uuid", () => {
    return {
        v4: jest.fn().mockReturnValueOnce("abc").mockReturnValueOnce("def"),
    };
});

jest.mock("@/services/serializer", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/serializer"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("encode", () => {
    it("serializes character data", () => {
        jest.spyOn(dataSerializer, "serialize").mockReturnValueOnce("");

        encode(character);

        expect(dataSerializer.serialize).toHaveBeenCalledTimes(1);
        expect(dataSerializer.serialize).toHaveBeenCalledWith(character);
    });

    it("compresses character data", () => {
        jest.spyOn(dataSerializer, "serialize").mockReturnValueOnce("serializedCharacter");
        jest.spyOn(lzbase62, "compress").mockReturnValueOnce("");

        encode(character);

        expect(lzbase62.compress).toHaveBeenCalledTimes(1);
        expect(lzbase62.compress).toHaveBeenCalledWith("serializedCharacter");
    });

    it("returns the serialized and compressed character data", () => {
        jest.spyOn(lzbase62, "compress").mockReturnValueOnce("123");

        const encodedData = encode(character);

        expect(encodedData).toEqual("123");
    });

    it.each`
        description                                     | character                            | encodedData
        ${"standard character data"}                    | ${character}                         | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLN2HtlxHGtYxHEuF"}
        ${"character data with unicode characters"}     | ${characterWithUnicodeCharacters}    | ${"uDriterisSriwMGZhYIZVYjZBaXYnYUarisEriuA2QsNI2HtX2HsJK2HtUxeGxYDtT2KsM2GtZ2GtLN2HtlxHGtYxHEuF"}
        ${"character data with items"}                  | ${characterWithItems}                | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLsJEMtN2KtlxKDxHDtYxHEuF"}
        ${"character data with unlocked ability cards"} | ${characterWithUnlockedAbilityCards} | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNII2ItX2IsJK2HtUxkHxaDtT2LsM2GtZ2GtLN2HtlxHDsM2gsMLxMDtYxTEuF"}
        ${"character data with hand"}                   | ${characterWithHand}                 | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHDsMKEMLtNuF"}
    `("serializes and compresses $description", ({ character, encodedData }) => {
        expect(encode(character)).toEqual(encodedData);
    });
});

describe("decode", () => {
    it("decompresses character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce("");
        jest.spyOn(dataSerializer, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(lzbase62.decompress).toHaveBeenCalledTimes(1);
        expect(lzbase62.decompress).toHaveBeenCalledWith("test");
    });

    it("deserializes character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce("decompressedCharacter");
        jest.spyOn(dataSerializer, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(dataSerializer.deserialize).toHaveBeenCalledTimes(1);
        expect(dataSerializer.deserialize).toHaveBeenCalledWith("decompressedCharacter");
    });

    it("returns the deserialized character", () => {
        jest.spyOn(dataSerializer, "deserialize").mockReturnValueOnce(character);

        const result: Character = decode("test");

        expect(result).toBe(character);
    });

    it.each`
        description                                     | encodedData                                                                                                        | character
        ${"standard character data"}                    | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLN2HtlxHGtYxHEuF"}                    | ${character}
        ${"character data with unicode characters"}     | ${"uDriterisSriwMGZhYIZVYjZBaXYnYUarisEriuA2QsNI2HtX2HsJK2HtUxeGxYDtT2KsM2GtZ2GtLN2HtlxHGtYxHEuF"}                 | ${characterWithUnicodeCharacters}
        ${"character data with items"}                  | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLsJEMtN2KtlxKDxHDtYxHEuF"}            | ${characterWithItems}
        ${"character data with unlocked ability cards"} | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNII2ItX2IsJK2HtUxkHxaDtT2LsM2GtZ2GtLN2HtlxHDsM2gsMLxMDtYxTEuF"}         | ${characterWithUnlockedAbilityCards}
        ${"character data with hand"}                   | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHDsMKEMLtNuF"} | ${characterWithHand}
    `("decompresses and deserializes $description", ({ encodedData, character }) => {
        expect(decode(encodedData)).toEqual(character);
    });
});
