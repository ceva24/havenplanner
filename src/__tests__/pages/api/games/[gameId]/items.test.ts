import { type NextApiRequest, type NextApiResponse } from "next";
import HttpMethod from "http-method-enum";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { type Mocks, createMocks } from "node-mocks-http";
import { createTestItem, createTestSettings } from "@/test/create-test-fixtures";
import * as gameService from "@/server/services/games/game";
import * as itemsService from "@/server/services/items";
import handler from "@/pages/api/games/[gameId]/items";

const gameDataRequest: GameDataRequest = { spoilerSettings: createTestSettings().spoilerSettings };

jest.mock("@/server/services/games/game");

jest.mock("@/server/services/items");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("items", () => {
    it("retrieves and filters items", () => {
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(itemsService, "filterItems").mockReturnValueOnce([]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

        req._setBody(gameDataRequest);

        handler(req, res);

        expect(gameService.getItemsByGameId).toHaveBeenCalledTimes(1);
        expect(itemsService.filterItems).toHaveBeenCalledTimes(1);
    });

    it("returns OK and the list of items for a successful request", () => {
        const item: Item = createTestItem(1, "Boots of Test", "1");

        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(itemsService, "filterItems").mockReturnValueOnce([item]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>({
            method: HttpMethod.POST,
        });

        req._setBody(gameDataRequest);

        handler(req, res);

        const expectedResponse: ItemDataResponse = {
            items: [item],
        };

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns Internal Server Error and an error message for an unexpected error", () => {
        jest.spyOn(gameService, "getItemsByGameId").mockImplementationOnce(() => {
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
