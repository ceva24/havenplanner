import { type NextApiRequest, type NextApiResponse } from "next";
import { type Mocks, createMocks } from "node-mocks-http";
import { createTestCharacterClass } from "@/test/create-test-fixtures";
import * as gameService from "@/server/services/games/game";
import handler from "@/pages/api/games/[gameId]/classes/[classId]";

const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

jest.mock("@/server/services/games/game");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("classes", () => {
    it("retrieves and returns a character class", () => {
        jest.spyOn(gameService, "getCharacterClassByIdAndGameId").mockReturnValueOnce(characterClass);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        handler(req, res);

        const expectedResponse: ClassDataResponse = {
            class: characterClass,
        };

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns 500 Error and an error for an unexpected error", () => {
        jest.spyOn(gameService, "getCharacterClassByIdAndGameId").mockImplementationOnce(() => {
            throw new Error("Game ID not found");
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        handler(req, res);

        const expectedResponse: ErrorResponse = {
            error: "Game ID not found",
        };

        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });
});
