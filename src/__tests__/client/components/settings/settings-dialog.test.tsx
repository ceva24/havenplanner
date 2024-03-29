import { render, screen, within } from "@testing-library/react";
import SettingsDialog from "@/client/components/settings/settings-dialog";
import { TestSettingsProvider } from "@/test/test-settings-provider";

describe("settings dialog", () => {
    it("renders the close button", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const closeButton = screen.queryByRole("button", { name: "Close" });

        expect(closeButton).toBeInTheDocument();
    });

    it("renders the report an issue link", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const reportAnIssueLink = screen.queryByRole("link", { name: "Report an issue" });

        expect(reportAnIssueLink).toBeInTheDocument();
    });

    it("renders the spoil all switch", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const spoilAllSwitch = screen.queryByRole("checkbox", { name: "Spoil all" });

        expect(spoilAllSwitch).toBeInTheDocument();
    });

    it("renders the class spoilers", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const classSpoilersSection = screen.queryByRole("region", { name: "Class Spoilers" });

        expect(classSpoilersSection).toBeInTheDocument();
    });

    it("renders item spoilers", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const itemSpoilersSection = screen.queryByRole("region", { name: "Item Spoilers" });

        expect(itemSpoilersSection).toBeInTheDocument();
    });

    it("renders the prosperity slider", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const itemSpoilersSection = screen.getByRole("region", { name: "Item Spoilers" });

        const prosperitySlider = within(itemSpoilersSection).queryByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toBeInTheDocument();
    });

    it("renders the item groups", () => {
        render(<SettingsDialog isOpen onClose={jest.fn()} />, { wrapper: TestSettingsProvider });

        const itemSpoilersSection = screen.getByRole("region", { name: "Item Spoilers" });

        const itemGroup = within(itemSpoilersSection).queryByRole("checkbox", { name: "Random Item Designs" });

        expect(itemGroup).toBeInTheDocument();
    });
});
