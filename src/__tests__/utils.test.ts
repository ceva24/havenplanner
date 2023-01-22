import { createSafeRelativePath } from "@/utils";

describe("createSafeRelativePath", () => {
    it("prepends a / when one is not present", () => {
        const safePath = createSafeRelativePath("unsafe/path/");

        expect(safePath).toEqual("/unsafe/path/");
    });

    it("does not prepend a / when the path already starts with one", () => {
        const safePath = createSafeRelativePath("/safe/path/");

        expect(safePath).toEqual("/safe/path/");
    });
});
