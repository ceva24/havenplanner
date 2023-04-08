import { type NextApiRequest, type NextApiResponse } from "next";
import { type Mocks, createMocks } from "node-mocks-http";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";
import * as gameService from "@/services/games/game";
import * as characterClassesService from "@/services/character-classes";
import * as characterClassSummaryTransformer from "@/transformers/character-class-summary";
import handler from "@/pages/api/games/[gameId]/classes";

const gameDataRequest: GameDataRequest = { spoilerSettings: createTestSettings().spoilerSettings };

const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

jest.mock("@/services/games/game");

jest.mock("@/services/character-classes");

jest.mock("@/transformers/character-class-summary");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("classes", () => {
    it("retrieves and filters character classes", () => {
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(characterClassesService, "filterCharacterClasses").mockReturnValueOnce([characterClass]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(gameDataRequest);

        handler(req, res);

        expect(gameService.getCharacterClassesByGameId).toHaveBeenCalledTimes(1);
        expect(characterClassesService.filterCharacterClasses).toHaveBeenCalledTimes(1);
        expect(characterClassSummaryTransformer.toCharacterClassSummary).toHaveBeenCalledTimes(1);
    });

    it("returns 200 OK and the list of character class summaries for a successful request", () => {
        const characterClassSummary: CharacterClassSummary = { id: 1, name: "Test Brute", imageUrl: "brute.webp" };

        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(characterClassesService, "filterCharacterClasses").mockReturnValueOnce([characterClass]);
        jest.spyOn(characterClassSummaryTransformer, "toCharacterClassSummary").mockReturnValueOnce({
            id: 1,
            name: "Test Brute",
            imageUrl: "brute.webp",
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(gameDataRequest);

        handler(req, res);

        const expectedResponse: ClassSummariesDataResponse = {
            classes: [characterClassSummary],
        };

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns 500 Error and an error for an unexpected error", () => {
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockImplementationOnce(() => {
            throw new Error("Game ID not found");
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(gameDataRequest);

        handler(req, res);

        const expectedResponse: ErrorResponse = {
            error: "Game ID not found",
        };

        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns 500 Error and the error issues for a request parsing error", () => {
        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        handler(req, res);

        const expectedResponse: ErrorResponse = {
            error: {
                issues: [
                    {
                        code: "invalid_type",
                        expected: "object",
                        received: "undefined",
                        path: ["spoilerSettings"],
                        message: "Required",
                    },
                ],
            },
        };

        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });
});
