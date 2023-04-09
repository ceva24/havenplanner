import { type NextRouter } from "next/router";
import { clearQueryString } from "@/client/hooks/use-clear-query-string";

describe("clear query string", () => {
    it("replaces the url with /", () => {
        const router = {
            replace: jest.fn(),
        } as unknown as jest.Mocked<NextRouter>;

        clearQueryString(router);

        expect(router.replace).toHaveBeenCalledTimes(1);
        expect(router.replace.mock.calls[0][0]).toEqual("/");
    });
});
