import { baseImageUrl, createImageUrl, createSafeRelativePath } from "@/services/core/image";

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

describe("createImageUrl", () => {
    it("prepends the base url to the relative path", () => {
        const imageUrl = createImageUrl("/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(`${baseImageUrl}/items/gloomhaven/1-14/gh-001-boots-of-striding.webp`);
    });

    it("prepends the base url to the relative path and adds a separator when necessary", () => {
        const imageUrl = createImageUrl("/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(`${baseImageUrl}/items/gloomhaven/1-14/gh-001-boots-of-striding.webp`);
    });
});
