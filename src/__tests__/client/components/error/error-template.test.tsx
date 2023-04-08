import { render, screen } from "@testing-library/react";
import ErrorTemplate from "@/client/components/error/error-template";

describe("error template", () => {
    it("renders the header", () => {
        render(<ErrorTemplate message="Sorry, an error has occurred" />);

        const headerLink = screen.queryByRole("link", {
            name: "Gloomhaven Character Planner",
        });

        expect(headerLink).toBeInTheDocument();
    });

    it("renders the message", () => {
        render(<ErrorTemplate message="Sorry, an error has occurred" />);

        const message = screen.queryByText("Sorry, an error has occurred");

        expect(message).toBeInTheDocument();
    });
});
