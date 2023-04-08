import { render, screen } from "@testing-library/react";
import { CharacterSpoiler, ItemSpoiler } from "@/client/components/load/spoiler";

describe("item spoiler", () => {
    it("renders", () => {
        render(<ItemSpoiler text="Prosperity 2" />);

        const itemSpoiler = screen.queryByText("Prosperity 2");

        expect(itemSpoiler).toBeInTheDocument();
    });
});

describe("character spoiler", () => {
    it("renders", () => {
        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoilery" };

        render(<CharacterSpoiler characterClass={summary} />);

        const characterSpoiler = screen.queryByText("Test Spoilery");

        expect(characterSpoiler).toBeInTheDocument();
    });
});
