import { render, screen } from "@testing-library/react";
import CharacterClasses, { toggleCharacterClass } from "@/client/components/settings/character-classes";
import { createTestSettings } from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const setSettings = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("character classes", () => {
    it("renders", () => {
        const settings: Settings = createTestSettings();
        settings.gameData.unlockableCharacterClasses = [{ id: 2, imageUrl: "", spoilerSafeName: "Test Spoiler" }];

        render(
            <TestSettingsProvider settings={settings}>
                <CharacterClasses />
            </TestSettingsProvider>
        );

        const classSwitch = screen.queryByRole("checkbox", { name: "Test Spoiler" });

        expect(classSwitch).toBeInTheDocument();
    });
});

describe("toggleCharacter", () => {
    it("unlocks a class that was locked", () => {
        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoiler" };

        const settings: Settings = createTestSettings();

        toggleCharacterClass(summary, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { ...settings.spoilerSettings, classes: [summary] },
        });
    });

    it("locks a class that was unlocked", () => {
        const summary: UnlockableCharacterClassSummary = { id: 2, imageUrl: "", spoilerSafeName: "Test Spoiler" };

        const settings: Settings = createTestSettings();
        settings.spoilerSettings.classes = [summary];

        toggleCharacterClass(summary, settings, setSettings);

        expect(setSettings).toHaveBeenCalledTimes(1);
        expect(setSettings).toHaveBeenCalledWith({
            ...settings,
            spoilerSettings: { ...settings.spoilerSettings, classes: [] },
        });
    });
});
