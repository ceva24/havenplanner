import { type NextApiRequest, type NextApiResponse } from "next";
import HttpMethod from "http-method-enum";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { type Mocks, createMocks } from "node-mocks-http";
import { createTestCharacterClass, createTestSettings } from "@/test/create-test-fixtures";
import * as gameService from "@/server/services/games/game";
import * as characterClassesService from "@/server/services/character-classes";
import * as characterClassSummaryTransformer from "@/server/transformers/character-class-summary";
import handler from "@/pages/api/games/[gameId]/classes";

const gameDataRequest: GameDataRequest = { spoilerSettings: createTestSettings().spoilerSettings };

const characterClass: CharacterClass = createTestCharacterClass(1, "Test Brute");

jest.mock("@/server/services/games/game");

jest.mock("@/server/services/character-classes");

jest.mock("@/server/transformers/character-class-summary");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("classes", () => {
    it("retrieves and filters character classes", () => {
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(characterClassesService, "filterCharacterClasses").mockReturnValueOnce([characterClass]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

        req._setBody(gameDataRequest);

        handler(req, res);

        expect(gameService.getCharacterClassesByGameId).toHaveBeenCalledTimes(1);
        expect(characterClassesService.filterCharacterClasses).toHaveBeenCalledTimes(1);
        expect(characterClassSummaryTransformer.toCharacterClassSummary).toHaveBeenCalledTimes(1);
    });

    it("returns OK and the list of character class summaries for a successful request", () => {
        const characterClassSummary: CharacterClassSummary = { id: 1, name: "Test Brute", imageUrl: "brute.webp" };

        jest.spyOn(gameService, "getCharacterClassesByGameId").mockReturnValueOnce([]);
        jest.spyOn(characterClassesService, "filterCharacterClasses").mockReturnValueOnce([characterClass]);
        jest.spyOn(characterClassSummaryTransformer, "toCharacterClassSummary").mockReturnValueOnce({
            id: 1,
            name: "Test Brute",
            imageUrl: "brute.webp",
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

        req._setBody(gameDataRequest);

        handler(req, res);

        const expectedResponse: ClassSummariesDataResponse = {
            classes: [characterClassSummary],
        };

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns Internal Server Error and an error message for an unexpected error", () => {
        jest.spyOn(gameService, "getCharacterClassesByGameId").mockImplementationOnce(() => {
            throw new Error("Game ID not found");
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

        req._setBody(gameDataRequest);

        handler(req, res);

        const expectedResponse: ErrorResponse = {
            error: "Game ID not found",
        };

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns Bad Request and the error issues for a request parsing error", () => {
        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

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

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns Method Not Allowed for a non-POST method", () => {
        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.GET,
        });

        handler(req, res);

        const expectedResponse: ErrorResponse = {
            error: ReasonPhrases.METHOD_NOT_ALLOWED,
        };

        expect(res.statusCode).toEqual(StatusCodes.METHOD_NOT_ALLOWED);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });
});
