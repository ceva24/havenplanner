import { render, screen } from "@testing-library/react";
import Header from "@/components/header";

describe("Header", () => {
    it("renders", () => {
        render(<Header />);

        const heading = screen.queryByRole("heading", {
            name: "Gloomhaven Character Planner",
        });

        expect(heading).toBeInTheDocument();
    });
});
