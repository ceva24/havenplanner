import { render, screen } from "@testing-library/react";
import SpoilAllSwitch, { spoilAll, unspoilAll } from "@/components/settings/spoil-all-switch";
import { TestSettingsProvider } from "@/test/test-settings-provider";
import { createTestSettings } from "@/test/create-test-fixtures";

describe("spoil all switch", () => {
    it("renders", () => {
        render(<SpoilAllSwitch />, { wrapper: TestSettingsProvider });

        const spoilAllSwitch = screen.queryByRole("checkbox", { name: "Spoil all" });

        expect(spoilAllSwitch).toBeInTheDocument();
    });
});

describe("spoilAll", () => {
    it("sets the spoiler settings to maximum", () => {
        const settings: Settings = createTestSettings();

        const setSettings = jest.fn();

        spoilAll(settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { items: { prosperity: 9, itemGroups: settings.gameData.itemGroups } },
        });
    });
});

describe("unspoilAll", () => {
    it("sets the spoiler settings to minimum", () => {
        const settings: Settings = createTestSettings();

        const setSettings = jest.fn();

        unspoilAll(settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { items: { prosperity: 1, itemGroups: [] } },
        });
    });
});
