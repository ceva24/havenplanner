import { NextApiRequest, NextApiResponse } from "next";
import { createMocks, Mocks } from "node-mocks-http";
import * as encoderService from "@/services/encoder";
import handler from "@/api/encode-character";

jest.mock("@/services/encoder", () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        __esModule: true,
        ...jest.requireActual("@/services/encoder"),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("encode character", () => {
    it("responds with HTTP 405 if the request is not a POST", () => {
        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();
        req.method = "GET";

        handler(req, res);

        expect(res.statusCode).toEqual(405);
        expect(res._getJSONData()).toEqual({ message: "405 Method Not Allowed" });
    });

    it("encodes character data", () => {
        jest.spyOn(encoderService, "encode").mockImplementationOnce(() => "");

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();
        req.method = "POST";
        req.body = "test";

        handler(req, res);

        expect(encoderService.encode).toHaveBeenCalledTimes(1);
        expect(encoderService.encode).toHaveBeenCalledWith("test");
    });

    it("responds with HTTP 200 and the encoded character data", () => {
        jest.spyOn(encoderService, "encode").mockImplementationOnce(() => "abcdefg");

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();
        req.method = "POST";

        handler(req, res);

        expect(res.statusCode).toEqual(200);
        expect(res._getJSONData()).toEqual({ encodedCharacterData: "abcdefg" });
    });

    it("responds with HTTP 400 when the request body is not a character object", () => {
        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();
        req.method = "POST";
        req.body = "{}";

        handler(req, res);

        expect(res.statusCode).toEqual(400);
        expect(res._getJSONData()).toEqual({ message: "400 Bad Request" });
    });

    it("responds with HTTP 500 when an unexpected error occurs", () => {
        jest.spyOn(encoderService, "encode").mockImplementationOnce(() => {
            throw new Error("Error");
        });

        const { req, res }: Mocks<NextApiRequest, NextApiResponse> = createMocks<NextApiRequest, NextApiResponse>();
        req.method = "POST";

        handler(req, res);

        expect(res.statusCode).toEqual(500);
        expect(res._getJSONData()).toEqual({ message: "500 Internal Server Error" });
    });
});
