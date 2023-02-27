import { render, screen } from "@testing-library/react";
import { ItemSpoiler } from "@/components/load/spoiler";

describe("item spoiler", () => {
    it("renders", () => {
        render(<ItemSpoiler text="Prosperity 2" />);

        const itemSpoiler = screen.queryByText("Prosperity 2");

        expect(itemSpoiler).toBeInTheDocument();
    });
});
