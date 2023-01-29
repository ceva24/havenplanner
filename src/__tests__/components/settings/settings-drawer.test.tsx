import { render, screen } from "@testing-library/react";
import SettingsDrawer from "@/components/settings/settings-drawer";

describe("settings drawer", () => {
    it("renders the close button", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />);

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });

    it("renders the report an issue link", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />);

        const reportAnIssueLink = screen.queryByRole("link", { name: "Report an issue" });

        expect(reportAnIssueLink).toBeInTheDocument();
    });
});
