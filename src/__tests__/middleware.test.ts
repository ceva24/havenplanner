import { middleware } from "src/middleware";

describe("middleware", () => {
    it("sets the x-robots-tag response header", () => {
        const response = middleware();

        expect(response.headers.has("x-robots-tag")).toEqual(true);
        expect(response.headers.get("x-robots-tag")).toEqual("noindex");
    });
});
