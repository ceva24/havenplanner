import { render, screen } from "@testing-library/react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, TextButton } from "@/components/core/button";

describe("button", () => {
    it("renders", () => {
        render(<Button text="Close" onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});

describe("text button", () => {
    it("renders", () => {
        render(<TextButton text="Close" onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});

describe("icon button", () => {
    it("renders", () => {
        render(<IconButton label="Close" icon={<SearchIcon />} onClick={jest.fn()} />);

        const button = screen.queryByRole("button", { name: "Close" });

        expect(button).toBeInTheDocument();
    });
});
