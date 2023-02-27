import { render, screen, within } from "@testing-library/react";
import { TestAppSettingsProvider } from "@/testutils";
import SettingsDialog from "@/components/settings/settings-dialog";

describe("settings dialog", () => {
    it("renders the close button", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });

    it("renders the report an issue link", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const reportAnIssueLink = screen.queryByRole("link", { name: "Report an issue" });

        expect(reportAnIssueLink).toBeInTheDocument();
    });

    it("renders item spoilers", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const itemSpoilersSection = screen.queryByRole("region", { name: "Item Spoilers" });

        expect(itemSpoilersSection).toBeInTheDocument();
    });

    it("renders the prosperity slider", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const itemSpoilersSection = screen.getByRole("region", { name: "Item Spoilers" });

        const prosperitySlider = within(itemSpoilersSection).queryByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toBeInTheDocument();
    });

    it("renders the item groups", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestAppSettingsProvider });

        const itemSpoilersSection = screen.getByRole("region", { name: "Item Spoilers" });

        const itemGroup = within(itemSpoilersSection).queryByRole("checkbox", { name: "Random Item Designs" });

        expect(itemGroup).toBeInTheDocument();
    });
});
