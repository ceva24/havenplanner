import { render, screen } from "@testing-library/react";
import Button from "@/components/core/button";

describe("button", () => {
    it("renders", () => {
        render(<Button text="Close" onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});
