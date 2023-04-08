import { type NextApiRequest, type NextApiResponse } from "next";
import { type Mocks, createMocks } from "node-mocks-http";
import { createTestItem, createTestSettings } from "@/test/create-test-fixtures";
import * as gameService from "@/services/games/game";
import * as itemsService from "@/services/items";
import handler from "@/pages/api/games/[gameId]/items";

const itemsRequestData: GameDataRequest = { spoilerSettings: createTestSettings().spoilerSettings };

jest.mock("@/services/games/game");

jest.mock("@/services/items");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("items", () => {
    it("retrieves and filters items", () => {
        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(itemsService, "filterItems").mockReturnValueOnce([]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(itemsRequestData);

        handler(req, res);

        expect(gameService.getItemsByGameId).toHaveBeenCalledTimes(1);
        expect(itemsService.filterItems).toHaveBeenCalledTimes(1);
    });

    it("returns 200 OK and the list of items for a successful request", () => {
        const item: Item = createTestItem(1, "Boots of Test", "1");

        jest.spyOn(gameService, "getItemsByGameId").mockReturnValueOnce([]);
        jest.spyOn(itemsService, "filterItems").mockReturnValueOnce([item]);

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(itemsRequestData);

        handler(req, res);

        const expectedResponse: ItemDataResponse = {
            items: [item],
        };

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual(expectedResponse);
    });

    it("returns 500 Error and an error for an unexpected error", () => {
        jest.spyOn(gameService, "getItemsByGameId").mockImplementationOnce(() => {
            throw new Error("Game ID not found");
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();

        req._setBody(itemsRequestData);

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
