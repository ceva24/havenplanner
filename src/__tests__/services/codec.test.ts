import lzbase62 from "lzbase62";
import { decode, encode } from "@/services/codec";
import * as serializerService from "@/services/serializer";
import * as deserializerService from "@/services/deserializer";
import { characterClasses } from "@/loaders/character-classes";
import { items } from "@/loaders/items";
import { createTestCharacter } from "@/testutils";

const character: Character = createTestCharacter({
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
    battleGoalCheckmarkGroups: [],
});

const characterWithUnicodeCharacters = createTestCharacter({
    name: "テストキャラクター",
    experience: 50,
    gold: 12,
    notes: "テスト",
    characterClass: characterClasses[3],
    battleGoalCheckmarkGroups: [],
});

const characterWithItems = createTestCharacter({
    name: "Test character",
    experience: 50,
    gold: 12,
    notes: "Test",
    characterClass: characterClasses[3],
    battleGoalCheckmarkGroups: [],
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
    battleGoalCheckmarkGroups: [],
});

const characterWithHand: Character = createTestCharacter({
    characterClass: characterClasses[3],
    hand: [characterClasses[3].abilityCards[12], characterClasses[3].abilityCards[13]],
    battleGoalCheckmarkGroups: [],
});

const characterWithGainedPerks: Character = createTestCharacter({
    characterClass: characterClasses[3],
    gainedPerks: [
        { perk: characterClasses[3].perks[1], checkboxIndex: 0 },
        { perk: characterClasses[3].perks[0], checkboxIndex: 1 },
    ],
    battleGoalCheckmarkGroups: [],
});

const characterWithBattleGoalCheckmarks: Character = createTestCharacter({
    characterClass: characterClasses[3],
    battleGoalCheckmarkGroups: [
        {
            id: 0,
            checkmarks: [
                { id: 0, value: true },
                { id: 1, value: true },
                { id: 2, value: true },
            ],
        },
        {
            id: 1,
            checkmarks: [
                { id: 0, value: true },
                { id: 1, value: false },
                { id: 2, value: false },
            ],
        },
    ],
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

jest.mock("@/services/deserializer", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/deserializer"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("encode", () => {
    it("serializes character data", () => {
        jest.spyOn(serializerService, "serialize").mockReturnValueOnce("");

        encode(character);

        expect(serializerService.serialize).toHaveBeenCalledTimes(1);
        expect(serializerService.serialize).toHaveBeenCalledWith(character);
    });

    it("compresses character data", () => {
        jest.spyOn(serializerService, "serialize").mockReturnValueOnce("serializedCharacter");
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
        ${"standard character data"}                    | ${character}                         | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHEuF"}
        ${"character data with unicode characters"}     | ${characterWithUnicodeCharacters}    | ${"uDriterisSriwMGZhYIZVYjZBaXYnYUarisEriuA2QsNI2HtX2HsJK2HtUxeGxYDtT2KsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHEuF"}
        ${"character data with items"}                  | ${characterWithItems}                | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLsJEMtN2KtlxKDxHDtYxHGtgxHGtSxHEuF"}
        ${"character data with unlocked ability cards"} | ${characterWithUnlockedAbilityCards} | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNII2ItX2IsJK2HtUxkHxaDtT2LsM2GtZ2GtLN2HtlxHDsM2gsMLxMDtYxTGtgxHGtSxHEuF"}
        ${"character data with hand"}                   | ${characterWithHand}                 | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHDsMKEMLxMDtgxTGtSxHEuF"}
        ${"character data with gained perks"}           | ${characterWithGainedPerks}          | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHGtgxHDtLsJEI2LtL27sJtNxSDtSxZEuF"}
        ${"character data with battle goal checkmarks"} | ${characterWithBattleGoalCheckmarks} | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHDtLkilVsExFJ2WxRGtWRcjxGHtNNuF"}
    `("serializes and compresses $description", ({ character, encodedData }) => {
        expect(encode(character)).toEqual(encodedData);
    });
});

describe("decode", () => {
    it("decompresses character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce("");
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(lzbase62.decompress).toHaveBeenCalledTimes(1);
        expect(lzbase62.decompress).toHaveBeenCalledWith("test");
    });

    it("deserializes character data", () => {
        jest.spyOn(lzbase62, "decompress").mockReturnValueOnce("decompressedCharacter");
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        decode("test");

        expect(deserializerService.deserialize).toHaveBeenCalledTimes(1);
        expect(deserializerService.deserialize).toHaveBeenCalledWith("decompressedCharacter");
    });

    it("returns the deserialized character", () => {
        jest.spyOn(deserializerService, "deserialize").mockReturnValueOnce(character);

        const result: Character = decode("test");

        expect(result).toBe(character);
    });

    it.each`
        description                                     | encodedData                                                                                                                                     | character
        ${"standard character data"}                    | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHEuF"}                                       | ${character}
        ${"character data with unicode characters"}     | ${"uDriterisSriwMGZhYIZVYjZBaXYnYUarisEriuA2QsNI2HtX2HsJK2HtUxeGxYDtT2KsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHEuF"}                                    | ${characterWithUnicodeCharacters}
        ${"character data with items"}                  | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNI2HtX2HsJK2HtUxjHxZDtT2LsM2GtZ2GtLsJEMtN2KtlxKDxHDtYxHGtgxHGtSxHEuF"}                               | ${characterWithItems}
        ${"character data with unlocked ability cards"} | ${"uDriterisSritEVjkrgtTYRiRTkVirisEriuA2VsNII2ItX2IsJK2HtUxkHxaDtT2LsM2GtZ2GtLN2HtlxHDsM2gsMLxMDtYxTGtgxHGtSxHEuF"}                            | ${characterWithUnlockedAbilityCards}
        ${"character data with hand"}                   | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHDsMKEMLxMDtgxTGtSxHEuF"}                   | ${characterWithHand}
        ${"character data with gained perks"}           | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHGtgxHDtLsJEI2LtL27sJtNxSDtSxZEuF"}         | ${characterWithGainedPerks}
        ${"character data with battle goal checkmarks"} | ${"uDriterisSrisluBrgsbtYRirisEriuA2OsJII2ItX2IsNxHDtUxdDsgtVccfrg2ftmV2r2StT2SsM2GtZ2GtLN2HtlxHGtYxHGtgxHGtSxHDtLkilVsExFJ2WxRGtWRcjxGHtNNuF"} | ${characterWithBattleGoalCheckmarks}
    `("decompresses and deserializes $description", ({ encodedData, character }) => {
        expect(decode(encodedData)).toEqual(character);
    });
});
