import { render, screen } from "@testing-library/react";
import { Card, ItemCard } from "@/components/cards";

describe("cards", () => {
    it("renders a card", () => {
        render(<Card src="/wordhaven/images/personal-quests/gloomhaven/gh-pq-510.png" altText="Test quest" />);

        const card = screen.queryByRole("img", { name: "Test quest" });

        expect(card).toBeVisible();
    });

    it("renders an item card", () => {
        render(
            <ItemCard
                src="/wordhaven/images/items/gloomhaven/1-14/gh-001-boots-of-striding.png"
                altText="Boots of Striding"
            />
        );

        const card = screen.queryByRole("img", { name: "Boots of Striding" });

        expect(card).toBeVisible();
    });
});
