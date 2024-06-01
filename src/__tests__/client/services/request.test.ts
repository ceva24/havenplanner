import axios from "axios";
import { requestCharacterClass, characterClassCache } from "@/client/services/request";
import { createTestCharacterClass } from "@/test/create-test-fixtures";

const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

jest.mock("axios");
const mockAxios = jest.mocked(axios);

beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.get.mockResolvedValue({ data: { class: characterClass } });
    characterClassCache.clear();
});

describe("requestCharacterClass", () => {
    it("requests class details from the api endpoint using the game id and character class id", async () => {
        await requestCharacterClass(1, 2);

        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("/api/games/1/classes/2", expect.anything());
    });

    it("sets the appropriate headers", async () => {
        await requestCharacterClass(1, 2);

        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({ headers: { "content-type": "application/json", accept: "application/json" } }),
        );
    });

    it("returns the character class data from the api endpoint", async () => {
        const result: CharacterClass = await requestCharacterClass(1, 2);

        expect(result).toEqual(characterClass);
    });

    it("caches character class data so that the same character is not requested twice", async () => {
        await requestCharacterClass(1, 2);
        await requestCharacterClass(1, 2);

        expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    it("caches character class data per class id", async () => {
        await requestCharacterClass(1, 2);
        await requestCharacterClass(1, 3);

        expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });

    it("caches character class data per game id", async () => {
        await requestCharacterClass(1, 1);
        await requestCharacterClass(2, 1);

        expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
});
