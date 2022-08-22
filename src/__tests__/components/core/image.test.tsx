import { render, screen } from "@testing-library/react";
import Image, { createImageUrl } from "@/components/core/image";
import { baseImageUrl } from "@/utils/constants";

describe("image", () => {
    it("renders the image", () => {
        render(
            <Image
                webpPath="/images/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.queryByRole("img", {
            name: "Personal quest",
        });

        expect(image).toBeInTheDocument();
    });

    it("renders the image with the appropriate fallback image type", () => {
        render(
            <Image
                webpPath="/images/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.queryByRole("img", {
            name: "Personal quest",
        });

        expect(image?.getAttribute("src")).toMatch(`${baseImageUrl}/images/personal-quests/gloomhaven/gh-pq-back.jpg`);
    });
});

describe("createImageUrl", () => {
    it("prepends the base url to the relative path", () => {
        const imageUrl = createImageUrl("/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(`${baseImageUrl}/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp`);
    });

    it("prepends the base url to the relative path and adds a separator when necessary", () => {
        const imageUrl = createImageUrl("/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(`${baseImageUrl}/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp`);
    });
});
