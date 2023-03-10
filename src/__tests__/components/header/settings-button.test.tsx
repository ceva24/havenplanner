import { render, screen } from "@testing-library/react";
import SettingsButton, { updateCharacterAfterChangingSpoilerSettings } from "@/components/header/settings-button";
import {
    createTestSettings,
    createTestCharacter,
    createTestSettingsWithSpoilerSettings,
    createTestItem,
} from "@/test/create-test-fixtures";
import { TestSettingsProvider } from "@/test/test-settings-provider";

const setCharacter = jest.fn();

const settings: Settings = createTestSettings();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("settings button", () => {
    it("renders", () => {
        render(<SettingsButton character={createTestCharacter()} setCharacter={setCharacter} />, {
            wrapper: TestSettingsProvider,
        });

        const settingsButton = screen.queryByRole("button", { name: "Settings" });

        expect(settingsButton).toBeInTheDocument();
    });
});

describe("updateCharacterAfterChangingSpoilerSettings", () => {
    it("removes an item higher than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "9") }],
        });

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove an item equal to the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("does not remove an item lower than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Boots of Test", "1") }],
        });

        const prosperityTwoSettings = createTestSettingsWithSpoilerSettings(2, []);

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, prosperityTwoSettings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });

    it("removes items higher than the current prosperity level and does not remove items lower than the current prosperity level", () => {
        const character: Character = createTestCharacter({
            items: [
                { id: "1", item: createTestItem(1, "Boots of Test", "1") },
                { id: "2", item: createTestItem(2, "Boots of Super Test", "9") },
            ],
        });

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [{ id: "1", item: character.items[0].item }],
        });
    });

    it("removes items not in the active item groups", () => {
        const character: Character = createTestCharacter({
            items: [{ id: "1", item: createTestItem(1, "Secret Boots of Test", "Random Item Designs") }],
        });

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith({
            ...character,
            items: [],
        });
    });

    it("does not remove items in the active item groups", () => {
        const item = createTestItem(1, "Secret Boots of Test", "Random Item Designs");

        const character: Character = createTestCharacter({
            items: [{ id: "1", item }],
        });

        const settings: Settings = createTestSettingsWithSpoilerSettings(2, [{ id: 1, name: item.group }]);

        updateCharacterAfterChangingSpoilerSettings(character, setCharacter, settings);

        expect(setCharacter).toHaveBeenCalledTimes(1);
        expect(setCharacter).toHaveBeenCalledWith(character);
    });
});
