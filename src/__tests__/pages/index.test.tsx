import { render, screen } from "@testing-library/react";
import App from "../../pages/index";

describe("Home", () => {
    it("renders a heading", () => {
        render(<App characterClasses={[]} />);

        const heading = screen.getByRole("heading", {
            name: "Gloomhaven Character Planner",
        });

        expect(heading).toBeInTheDocument();
    });
});
