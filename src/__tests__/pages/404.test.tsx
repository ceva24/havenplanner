import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/pages/404";

describe("404 page", () => {
    it("renders the header", () => {
        render(<NotFoundPage />);

        const headerLink = screen.queryByRole("link", {
            name: "Gloomhaven Character Planner",
        });

        expect(headerLink).toBeInTheDocument();
    });

    it("renders the error message", () => {
        render(<NotFoundPage />);

        const message = screen.queryByText("Page not found");

        expect(message).toBeInTheDocument();
    });
});
