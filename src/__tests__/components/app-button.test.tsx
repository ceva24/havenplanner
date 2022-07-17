import { render, screen } from "@testing-library/react";
import AppButton from "@/components/app-button";

describe("app button", () => {
    it("renders", () => {
        render(<AppButton text="Close" onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});
