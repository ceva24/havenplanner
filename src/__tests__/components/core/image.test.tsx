import { render, screen } from "@testing-library/react";
import Image from "@/components/core/image";

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

        expect(image.getAttribute("src")).toMatch(`/personal-quests/gloomhaven/gh-pq-back.jpg`);
    });

    it("does not alter the webp path to append the base url if it is already a valid url", () => {
        render(
            <Image
                webpPath="https://test.havenplanner.app/personal-quests/gloomhaven/gh-pq-back.webp"
                fallbackImageType="jpg"
                altText="Personal quest"
            />
        );

        const image = screen.getByRole("img", {
            name: "Personal quest",
        });

        expect(image.getAttribute("src")).toMatch(
            "https://test.havenplanner.app/personal-quests/gloomhaven/gh-pq-back"
        );
    });
});
