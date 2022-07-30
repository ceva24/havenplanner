import { createImageUrl } from "@/utils/images";

describe("createImageUrl", () => {
    it("prepends the base url to the relative path", () => {
        const imageUrl = createImageUrl("/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.jpg");

        expect(imageUrl).toEqual(
            "https://ceva24.github.io/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.jpg"
        );
    });

    it("prepends the base url to the relative path and adds a separator when necessary", () => {
        const imageUrl = createImageUrl("worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.jpg");

        expect(imageUrl).toEqual(
            "https://ceva24.github.io/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.jpg"
        );
    });
});
