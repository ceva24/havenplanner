import { render, screen } from "@testing-library/react";
import ProsperitySlider, { marks, updateProsperity } from "@/client/components/settings/prosperity-slider";
import { createTestItemGroup, createTestSettings } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

describe("prosperity slider", () => {
    it("renders", () => {
        render(<ProsperitySlider />, { wrapper: TestSettingsProvider });

        const prosperitySlider = screen.queryByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toBeInTheDocument();
    });

    it("has nine steps", () => {
        render(<ProsperitySlider />, { wrapper: TestSettingsProvider });

        const prosperitySlider = screen.getByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider.getAttribute("aria-valuemax")).toEqual("9");
    });

    it("defaults to prosperity level one", () => {
        render(<ProsperitySlider />, { wrapper: TestSettingsProvider });

        const prosperitySlider = screen.getByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toHaveValue("1");
    });
});

describe("marks", () => {
    it("returns numbers 1 to 9", () => {
        expect(marks()).toEqual([
            {
                label: 1,
                value: 1,
            },
            {
                label: 2,
                value: 2,
            },
            {
                label: 3,
                value: 3,
            },
            {
                label: 4,
                value: 4,
            },
            {
                label: 5,
                value: 5,
            },
            {
                label: 6,
                value: 6,
            },
            {
                label: 7,
                value: 7,
            },
            {
                label: 8,
                value: 8,
            },
            {
                label: 9,
                value: 9,
            },
        ]);
    });
});

describe("updateProsperity", () => {
    it("updates the prosperity level setting", () => {
        const settings: Settings = createTestSettings();

        const setSettings = jest.fn();

        updateProsperity(3, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { classes: [], items: { prosperity: 3, itemGroups: [] } },
        });
    });

    it("retains the active item groups", () => {
        const settings: Settings = createTestSettings();
        settings.spoilerSettings.items.itemGroups = [createTestItemGroup(1, "Random Item Designs")];

        const setSettings = jest.fn();

        updateProsperity(3, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: {
                classes: [],
                items: { prosperity: 3, itemGroups: settings.spoilerSettings.items.itemGroups },
            },
        });
    });
});
