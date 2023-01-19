import { render, screen } from "@testing-library/react";
import Image, { baseImageUrl, createImageUrl } from "@/components/core/image";

describe("image", () => {
    it("renders the image", () => {
        render(
            <Image
                webpPath="/personal-quests/gloomhaven/gh-pq-back.webp"
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
                webpPath="/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.getByRole("img", {
            name: "Personal quest",
        });

        expect(image.getAttribute("src")).toMatch(`${baseImageUrl}/personal-quests/gloomhaven/gh-pq-back.jpg`);
    });

    it("does not alter the webp path to append the base url if it is already a valid url", () => {
        render(
            <Image
                webpPath="https://test.ghplanner.app/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.getByRole("img", {
            name: "Personal quest",
        });

        expect(image.getAttribute("src")).toMatch("https://test.ghplanner.app/personal-quests/gloomhaven/gh-pq-back");
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
