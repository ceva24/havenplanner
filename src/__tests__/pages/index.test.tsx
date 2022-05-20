import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
    it("renders a heading", () => {
        render(<Home characters={[]} />);

        const heading = screen.getByRole("heading", {
            name: "Gloomhaven Character Planner",
        });

        expect(heading).toBeInTheDocument();
    });
});
