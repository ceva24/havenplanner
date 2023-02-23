import { render, screen, within } from "@testing-library/react";
import SettingsDrawer from "@/components/settings/settings-drawer";
import { TestAppSettingsProvider } from "@/testutils";

describe("settings drawer", () => {
    it("renders the close button", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });

    it("renders the report an issue link", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const reportAnIssueLink = screen.queryByRole("link", { name: "Report an issue" });

        expect(reportAnIssueLink).toBeInTheDocument();
    });

    it("renders item spoilers", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const itemSpoilersSection = screen.queryByRole("region", { name: "Item Spoilers" });

        expect(itemSpoilersSection).toBeInTheDocument();
    });

    it("renders the prosperity slider", () => {
        render(<SettingsDrawer isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const itemSpoilersSection = screen.getByRole("region", { name: "Item Spoilers" });

        const prosperitySlider = within(itemSpoilersSection).queryByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toBeInTheDocument();
    });
});
