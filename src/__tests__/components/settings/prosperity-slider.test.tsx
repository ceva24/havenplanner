import { render, screen } from "@testing-library/react";
import ProsperitySlider, { marks, updateProsperity } from "@/components/settings/prosperity-slider";
import { defaultAppSettingsProvider } from "@/testutils";

describe("prosperity slider", () => {
    it("renders", () => {
        render(<ProsperitySlider />, { wrapper: defaultAppSettingsProvider });

        const prosperitySlider = screen.queryByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider).toBeInTheDocument();
    });

    it("has nine steps", () => {
        render(<ProsperitySlider />, { wrapper: defaultAppSettingsProvider });

        const prosperitySlider = screen.getByRole("slider", { name: "Prosperity" });

        expect(prosperitySlider.getAttribute("aria-valuemax")).toEqual("9");
    });

    it("defaults to prosperity level one", () => {
        render(<ProsperitySlider />, { wrapper: defaultAppSettingsProvider });

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
    it("updates the prosperity level app setting", () => {
        const appSettings: AppSettings = {
            hidePersonalQuest: false,
            selectedAbilityCardsTabIndex: 0,
            spoilerSettings: {
                prosperity: 1,
            },
        };

        const setAppSettings = jest.fn();

        updateProsperity(3, appSettings, setAppSettings);

        expect(setAppSettings).toHaveBeenCalledTimes(1);
        expect(setAppSettings).toHaveBeenCalledWith({
            ...appSettings,
            spoilerSettings: { prosperity: 3 },
        });
    });
});
