import lzbase62 from "lzbase62";
import * as serializerService from "@/services/share/serializer";
import { encode } from "@/services/share/encoder";
import { createTestCharacter, createTestSettings } from "@/test/create-test-fixtures";

jest.mock("@/services/share/serializer", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/share/serializer"),
    };
});

beforeEach(() => {
    jest.resetAllMocks();
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
