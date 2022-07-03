import { render, screen } from "@testing-library/react";
import StyledButton from "@/components/styled-button";

describe("styled button", () => {
    it("renders", () => {
        render(<StyledButton text="Close" onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});
