import { clearQueryString } from "@/hooks/use-clear-query-string";

describe("clearQueryString", () => {
    it("replaces the url with /", () => {
        const router = {
            replace: jest.fn(),
        };

        clearQueryString(router);

        expect(router.replace).toHaveBeenCalledTimes(1);
        expect(router.replace.mock.calls[0][0]).toEqual("/");
    });
});
