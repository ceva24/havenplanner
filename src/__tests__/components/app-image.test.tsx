import { render, screen } from "@testing-library/react";
import AppImage, { createImageUrl } from "@/components/app-image";

describe("AppImage", () => {
    it("renders the image", () => {
        render(
            <AppImage
                webpPath="/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.webp"
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
            <AppImage
                webpPath="/worldhaven/images/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.queryByRole("img", {
            name: "Personal quest",
        });

        expect(image?.getAttribute("src")).toMatch(".jpg");
    });
});

describe("createImageUrl", () => {
    it("prepends the base url to the relative path", () => {
        const imageUrl = createImageUrl("/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(
            "https://ceva24.github.io/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp"
        );
    });

    it("prepends the base url to the relative path and adds a separator when necessary", () => {
        const imageUrl = createImageUrl("worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp");

        expect(imageUrl).toEqual(
            "https://ceva24.github.io/worldhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.webp"
        );
    });
});
