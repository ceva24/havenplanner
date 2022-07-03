import { render, screen } from "@testing-library/react";
import Card from "@/components/card";

describe("card", () => {
    it("renders", () => {
        render(<Card url="/wordhaven/images/personal-quests/gloomhaven/gh-pq-510.png" altText="Test quest" />);

        const card = screen.queryByRole("img", { name: "Test quest" });

        expect(card).toBeVisible();
    });
});
