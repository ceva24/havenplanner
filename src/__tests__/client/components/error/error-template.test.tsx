import { render, screen } from "@testing-library/react";
import ErrorTemplate from "@/client/components/error/error-template";

describe("error template", () => {
    it("renders the message", () => {
        render(<ErrorTemplate message="Sorry, an error has occurred" />);

        const message = screen.queryByText("Sorry, an error has occurred");

        expect(message).toBeInTheDocument();
    });
});
