import { render, screen } from "@testing-library/react";
import { Box, Button } from "@mui/material";
import FullScreenDialog from "@/components/core/full-screen-dialog";

describe("full screen dialog", () => {
    it("renders with a title", () => {
        render(
            <FullScreenDialog isOpen title="Test dialog" handleClose={jest.fn()}>
                <Button>Click me</Button>
            </FullScreenDialog>
        );

        const dialog = screen.queryByRole("dialog", { name: "Test dialog" });

        expect(dialog).toBeInTheDocument();
    });

    it("renders a subtitle", () => {
        render(
            <FullScreenDialog isOpen title="Test dialog" subtitle="Test subtitle" handleClose={jest.fn()}>
                <Button>Click me</Button>
            </FullScreenDialog>
        );

        const subtitle = screen.queryByText("Test subtitle");

        expect(subtitle).toBeInTheDocument();
    });

    it("renders the children", () => {
        render(
            <FullScreenDialog isOpen title="Test dialog" handleClose={jest.fn()}>
                <Button>Click me</Button>
            </FullScreenDialog>
        );

        const button = screen.queryByRole("button", { name: "Click me" });

        expect(button).toBeInTheDocument();
    });

    it("renders the close button", () => {
        render(
            <FullScreenDialog isOpen title="Test dialog" handleClose={jest.fn()}>
                <Button>Click me</Button>
            </FullScreenDialog>
        );

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });
});
