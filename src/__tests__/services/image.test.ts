import { baseImageUrl, createImageUrl } from "@/services/image";

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
