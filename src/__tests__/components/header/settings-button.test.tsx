import { render, screen } from "@testing-library/react";
import SettingsButton from "@/components/header/settings-button";

describe("settings button", () => {
    it("renders", () => {
        render(<SettingsButton />);

        const settingsButton = screen.queryByRole("button", { name: "Settings" });

        expect(settingsButton).toBeInTheDocument();
    });
});
